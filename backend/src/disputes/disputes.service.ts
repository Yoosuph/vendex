import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { CreateDisputeDto, ResolveDisputeDto } from './dto/dispute.dto.js';

@Injectable()
export class DisputesService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    userId: string,
    userRole: string,
    userVendorId: string | null,
    query: { status?: string; page?: number; limit?: number },
  ) {
    const { status, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (userRole === 'BUYER') {
      where.claimantId = userId;
    } else if (userRole === 'VENDOR') {
      where.order = { items: { some: { vendorId: userVendorId } } };
    }

    if (status) {
      where.status = status.toUpperCase().replace(' ', '_');
    }

    const [disputes, total] = await Promise.all([
      this.prisma.dispute.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          order: {
            include: { items: true },
          },
        },
      }),
      this.prisma.dispute.count({ where }),
    ]);

    return {
      disputes,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string, user: any) {
    const dispute = await this.prisma.dispute.findFirst({
      where: { OR: [{ id }, { displayId: id }] },
      include: {
        order: {
          include: { items: true },
        },
      },
    });
    if (!dispute) throw new NotFoundException('Dispute not found');

    if (user.role === 'BUYER' && dispute.claimantId !== user.sub) {
      throw new ForbiddenException('FORBIDDEN');
    }

    if (
      user.role === 'VENDOR' &&
      (!user.vendorId ||
        !dispute.order.items.some((i) => i.vendorId === user.vendorId))
    ) {
      throw new ForbiddenException('FORBIDDEN');
    }

    return dispute;
  }

  async create(userId: string, userName: string, dto: CreateDisputeDto) {
    const order = await this.prisma.order.findFirst({
      where: { OR: [{ id: dto.orderId }, { displayId: dto.orderId }] },
      include: { items: true },
    });
    if (!order) throw new NotFoundException('Order not found');

    if (order.buyerId !== userId) {
      throw new BadRequestException('Can only dispute your own orders');
    }

    const existing = await this.prisma.dispute.findFirst({
      where: { orderId: order.id, status: { not: 'RESOLVED' } },
    });
    if (existing) {
      throw new BadRequestException(
        'Open dispute already exists for this order',
      );
    }

    if (dto.amount > order.total) {
      throw new BadRequestException(
        `Dispute amount cannot exceed order total ($${order.total})`,
      );
    }

    const vendorNames = [...new Set(order.items.map((i) => i.vendor).filter(Boolean))];

    const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
    const timeSuffix = Date.now().toString(36).slice(-4).toUpperCase();
    const displayId = `DIS-${randomSuffix}${timeSuffix}`;

    return this.prisma.dispute.create({
      data: {
        displayId,
        orderId: order.id,
        claimantId: userId,
        claimantName: userName,
        vendorName: vendorNames.join(', ') || 'Marketplace Vendor',
        amount: dto.amount,
        reason: dto.reason,
        description: dto.description,
      },
    });
  }

  async resolve(id: string, dto: ResolveDisputeDto, adminUser: any) {
    const dispute = await this.prisma.dispute.findFirst({
      where: { OR: [{ id }, { displayId: id }] },
      include: { order: { include: { items: true } } },
    });
    if (!dispute) throw new NotFoundException('Dispute not found');

    if (dispute.status === 'RESOLVED') {
      throw new BadRequestException('ALREADY_RESOLVED');
    }

    const decision = dto.decision.toUpperCase();

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.dispute.update({
        where: { id: dispute.id },
        data: {
          status: 'RESOLVED',
          decision: decision as any,
          decisionNotes: dto.notes,
          resolvedBy: adminUser.name || adminUser.email || 'Admin',
          resolvedAt: new Date(),
        },
      });

      if (decision === 'BUYER' || decision === 'REFUND') {
        await tx.order.update({
          where: { id: dispute.orderId },
          data: { status: 'REFUNDED' },
        });

        for (const item of dispute.order.items) {
          await tx.product.updateMany({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          });
        }
      }

      await tx.auditLog.create({
        data: {
          adminId: adminUser.sub || adminUser.id,
          adminName: adminUser.name || adminUser.email || 'Admin',
          action: 'RESOLVE_DISPUTE',
          resource: `Dispute ${dispute.displayId} resolved (${dto.decision})`,
          status: 'Success',
        },
      });

      return updated;
    });
  }
}

