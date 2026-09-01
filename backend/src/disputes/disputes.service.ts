import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
      }),
      this.prisma.dispute.count({ where }),
    ]);

    return {
      disputes,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const dispute = await this.prisma.dispute.findUnique({ where: { id } });
    if (!dispute) throw new NotFoundException('Dispute not found');
    return dispute;
  }

  async create(userId: string, userName: string, dto: CreateDisputeDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
      include: { items: true },
    });
    if (!order) throw new NotFoundException('Order not found');

    if (order.buyerId !== userId) {
      throw new BadRequestException('Can only dispute your own orders');
    }

    const existing = await this.prisma.dispute.findFirst({
      where: { orderId: dto.orderId, status: { not: 'RESOLVED' } },
    });
    if (existing) {
      throw new BadRequestException(
        'Open dispute already exists for this order',
      );
    }

    const vendorNames = [...new Set(order.items.map((i) => i.vendor))];

    const displayId = `DIS-${Math.random().toString(36).substring(2, 6).toUpperCase()}${Date.now().toString(36).substring(-4).toUpperCase()}`;

    return this.prisma.dispute.create({
      data: {
        displayId,
        orderId: dto.orderId,
        claimantId: userId,
        claimantName: userName,
        vendorName: vendorNames.join(', '),
        amount: dto.amount,
        reason: dto.reason,
        description: dto.description,
      },
    });
  }

  async resolve(id: string, dto: ResolveDisputeDto, adminUser: any) {
    const dispute = await this.prisma.dispute.findUnique({ where: { id } });
    if (!dispute) throw new NotFoundException('Dispute not found');

    if (dispute.status === 'RESOLVED') {
      throw new BadRequestException('ALREADY_RESOLVED');
    }

    const decision = dto.decision.toUpperCase();

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.dispute.update({
        where: { id },
        data: {
          status: 'RESOLVED',
          decision: decision as any,
          decisionNotes: dto.notes,
          resolvedBy: adminUser.name || adminUser.email,
          resolvedAt: new Date(),
        },
      });

      if (decision === 'BUYER' || decision === 'REFUND') {
        await tx.order.update({
          where: { id: dispute.orderId },
          data: { status: 'REFUNDED' },
        });

        const orderItems = await tx.orderItem.findMany({
          where: { orderId: dispute.orderId },
        });
        for (const item of orderItems) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          });
        }
      }

      await tx.auditLog.create({
        data: {
          adminId: adminUser.sub,
          adminName: adminUser.name || adminUser.email,
          action: 'RESOLVE_DISPUTE',
          resource: `Dispute ${dispute.displayId} in favor of ${dto.decision}`,
          status: 'Success',
        },
      });

      return updated;
    });
  }
}
