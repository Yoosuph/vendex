import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';
import {
  CreatePayoutMethodDto,
  RequestPayoutDto,
  UpdatePayoutMethodDto,
} from './dto/payout.dto.js';

@Injectable()
export class PayoutsService {
  constructor(private prisma: PrismaService) {}

  private async getVendorBalance(vendorId: string): Promise<number> {
    const orderItems = await this.prisma.orderItem.findMany({
      where: {
        vendorId,
        order: {
          status: { notIn: ['CANCELLED', 'REFUNDED'] },
        },
      },
      select: { price: true, quantity: true },
    });

    const totalEarned = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const payouts = await this.prisma.vendorPayout.findMany({
      where: {
        vendorId,
        status: { in: ['PENDING', 'PROCESSING', 'COMPLETED'] },
      },
      select: { amount: true },
    });

    const totalWithdrawn = payouts.reduce((acc, p) => acc + p.amount, 0);
    return Math.max(0, parseFloat((totalEarned - totalWithdrawn).toFixed(2)));
  }

  async findAll(userId: string, userRole: string, userVendorId: string | null) {
    if (userRole === 'ADMIN') {
      const payouts = await this.prisma.vendorPayout.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return { payouts };
    }

    const effectiveVendorId = userVendorId || userId;
    const [payouts, availableBalance] = await Promise.all([
      this.prisma.vendorPayout.findMany({
        where: {
          OR: [
            { vendorId: effectiveVendorId },
            ...(userVendorId ? [{ vendorId: userVendorId }] : []),
          ],
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.getVendorBalance(effectiveVendorId),
    ]);

    return { payouts, availableBalance };
  }

  private async getVendorBalanceTx(tx: any, vendorId: string): Promise<number> {
    const orderItems = await tx.orderItem.findMany({
      where: {
        vendorId,
        order: {
          status: { notIn: ['CANCELLED', 'REFUNDED'] },
        },
      },
      select: { price: true, quantity: true },
    });

    const totalEarned = orderItems.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0,
    );

    const payouts = await tx.vendorPayout.findMany({
      where: {
        vendorId,
        status: { in: ['PENDING', 'PROCESSING', 'COMPLETED'] },
      },
      select: { amount: true },
    });

    const totalWithdrawn = payouts.reduce((acc: number, p: any) => acc + p.amount, 0);
    return Math.max(0, parseFloat((totalEarned - totalWithdrawn).toFixed(2)));
  }

  async requestPayout(
    userId: string,
    userVendorId: string | null,
    dto: RequestPayoutDto,
  ) {
    const effectiveVendorId = userVendorId || userId;
    if (dto.amount <= 0) {
      throw new BadRequestException('Amount must be greater than 0');
    }

    return await this.prisma.$transaction(async (tx) => {
      const method = await tx.payoutMethod.findFirst({
        where: {
          id: dto.methodId,
          OR: [
            { vendorId: effectiveVendorId },
            ...(userVendorId ? [{ vendorId: userVendorId }] : []),
          ],
        },
      });
      if (!method) throw new NotFoundException('Payout method not found');

      const availableBalance = await this.getVendorBalanceTx(tx, effectiveVendorId);
      if (dto.amount > availableBalance) {
        throw new BadRequestException(
          `Requested amount ($${dto.amount.toFixed(2)}) exceeds available balance ($${availableBalance.toFixed(2)})`,
        );
      }

      // Get platform commission rate
      const platformSettings = await tx.platformSettings.findUnique({
        where: { id: 'platform' },
      });
      const commissionRate = platformSettings?.commissionRate ?? 10;
      const commissionAmount = parseFloat(
        (dto.amount * (commissionRate / 100)).toFixed(2),
      );
      const netAmount = parseFloat((dto.amount - commissionAmount).toFixed(2));

      const payout = await tx.vendorPayout.create({
        data: {
          vendorId: userVendorId || effectiveVendorId,
          amount: dto.amount,
          commissionRate,
          commissionAmount,
          netAmount,
          status: 'PENDING',
        },
      });

      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { name: true },
      });

      await tx.auditLog.create({
        data: {
          adminId: userId,
          adminName: user?.name || 'Vendor',
          action: 'WITHDRAWAL_REQUESTED',
          resource: `Payout $${dto.amount} (${payout.id}) for vendor ${effectiveVendorId}`,
          status: 'Success',
        },
      });

      return payout;
    });
  }

  async processPayout(id: string, dto: { status: string }, adminUser?: any) {
    const validStatuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'];
    const newStatus = dto.status.toUpperCase();
    if (!validStatuses.includes(newStatus)) {
      throw new BadRequestException(
        `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      );
    }

    const payout = await this.prisma.vendorPayout.findUnique({ where: { id } });
    if (!payout) throw new NotFoundException('Payout not found');

    const updated = await this.prisma.vendorPayout.update({
      where: { id },
      data: {
        status: newStatus as any,
        ...(newStatus === 'COMPLETED' ? { paidAt: new Date() } : {}),
      },
    });

    await this.prisma.auditLog.create({
      data: {
        adminId: adminUser?.sub || adminUser?.id,
        adminName: adminUser?.name || adminUser?.email || 'Admin',
        action: 'SETTINGS_UPDATE',
        resource: `Payout ${id} status updated to ${newStatus}`,
        status: 'Success',
      },
    });

    return updated;
  }

  async getMethods(userId: string, userVendorId: string | null) {
    const effectiveVendorId = userVendorId || userId;
    const methods = await this.prisma.payoutMethod.findMany({
      where: {
        OR: [
          { vendorId: effectiveVendorId },
          ...(userVendorId ? [{ vendorId: userVendorId }] : []),
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
    return { methods };
  }

  async addMethod(
    userId: string,
    userVendorId: string | null,
    dto: CreatePayoutMethodDto,
  ) {
    const effectiveVendorId = userVendorId || userId;

    if (dto.isDefault) {
      await this.prisma.payoutMethod.updateMany({
        where: {
          OR: [
            { vendorId: effectiveVendorId },
            ...(userVendorId ? [{ vendorId: userVendorId }] : []),
          ],
          isDefault: true,
        },
        data: { isDefault: false },
      });
    }

    return this.prisma.payoutMethod.create({
      data: {
        vendorId: userVendorId || effectiveVendorId,
        type: dto.type,
        label: dto.label,
        accountHolderName: dto.accountHolderName,
        maskedAccount: dto.maskedAccount,
        isDefault: dto.isDefault ?? false,
        country: dto.country,
      },
    });
  }

  async updateMethod(
    userId: string,
    userVendorId: string | null,
    methodId: string,
    dto: UpdatePayoutMethodDto,
  ) {
    const effectiveVendorId = userVendorId || userId;

    const method = await this.prisma.payoutMethod.findFirst({
      where: {
        id: methodId,
        OR: [
          { vendorId: effectiveVendorId },
          ...(userVendorId ? [{ vendorId: userVendorId }] : []),
        ],
      },
    });
    if (!method) throw new NotFoundException('Payout method not found');

    if (dto.isDefault) {
      await this.prisma.payoutMethod.updateMany({
        where: {
          OR: [
            { vendorId: effectiveVendorId },
            ...(userVendorId ? [{ vendorId: userVendorId }] : []),
          ],
          isDefault: true,
          id: { not: methodId },
        },
        data: { isDefault: false },
      });
    }

    return this.prisma.payoutMethod.update({
      where: { id: methodId },
      data: dto,
    });
  }

  async deleteMethod(
    userId: string,
    userVendorId: string | null,
    methodId: string,
  ) {
    const effectiveVendorId = userVendorId || userId;

    const method = await this.prisma.payoutMethod.findFirst({
      where: {
        id: methodId,
        OR: [
          { vendorId: effectiveVendorId },
          ...(userVendorId ? [{ vendorId: userVendorId }] : []),
        ],
      },
    });
    if (!method) throw new NotFoundException('Payout method not found');

    await this.prisma.payoutMethod.delete({ where: { id: methodId } });
    return { message: 'Payout method deleted' };
  }
}

