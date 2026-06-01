import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service.js";
import {
  RequestPayoutDto,
  CreatePayoutMethodDto,
  UpdatePayoutMethodDto,
} from "./dto/payout.dto.js";

@Injectable()
export class PayoutsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, userRole: string, userVendorId: string | null) {
    if (userRole === "ADMIN") {
      const payouts = await this.prisma.vendorPayout.findMany({
        orderBy: { createdAt: "desc" },
      });
      return { payouts };
    }

    const payouts = await this.prisma.vendorPayout.findMany({
      where: { vendorId: userVendorId! },
      orderBy: { createdAt: "desc" },
    });
    return { payouts };
  }

  async requestPayout(userId: string, userVendorId: string | null, dto: RequestPayoutDto) {
    if (!userVendorId) throw new BadRequestException("Not a vendor");

    const method = await this.prisma.payoutMethod.findFirst({
      where: { id: dto.methodId, vendorId: userVendorId },
    });
    if (!method) throw new NotFoundException("Payout method not found");

    const commissionRate = 10;
    const commissionAmount = dto.amount * (commissionRate / 100);
    const netAmount = dto.amount - commissionAmount;

    const payout = await this.prisma.vendorPayout.create({
      data: {
        vendorId: userVendorId,
        amount: dto.amount,
        commissionRate,
        commissionAmount,
        netAmount,
        status: "PENDING",
      },
    });

    await this.prisma.auditLog.create({
      data: {
        adminName: "System",
        action: "WITHDRAWAL_REQUESTED",
        resource: `Payout ${payout.id} for vendor ${userVendorId}`,
        status: "Success",
      },
    });

    return payout;
  }

  async processPayout(id: string, dto: { status: string }) {
    const payout = await this.prisma.vendorPayout.findUnique({ where: { id } });
    if (!payout) throw new NotFoundException("Payout not found");

    return this.prisma.vendorPayout.update({
      where: { id },
      data: {
        status: dto.status.toUpperCase() as any,
        ...(dto.status.toUpperCase() === "COMPLETED" ? { paidAt: new Date() } : {}),
      },
    });
  }

  async getMethods(userId: string, userVendorId: string | null) {
    if (!userVendorId) throw new BadRequestException("Not a vendor");

    const methods = await this.prisma.payoutMethod.findMany({
      where: { vendorId: userVendorId },
      orderBy: { createdAt: "desc" },
    });
    return { methods };
  }

  async addMethod(userId: string, userVendorId: string | null, dto: CreatePayoutMethodDto) {
    if (!userVendorId) throw new BadRequestException("Not a vendor");

    if (dto.isDefault) {
      await this.prisma.payoutMethod.updateMany({
        where: { vendorId: userVendorId, isDefault: true },
        data: { isDefault: false },
      });
    }

    return this.prisma.payoutMethod.create({
      data: {
        vendorId: userVendorId,
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
    if (!userVendorId) throw new BadRequestException("Not a vendor");

    const method = await this.prisma.payoutMethod.findFirst({
      where: { id: methodId, vendorId: userVendorId },
    });
    if (!method) throw new NotFoundException("Payout method not found");

    if (dto.isDefault) {
      await this.prisma.payoutMethod.updateMany({
        where: { vendorId: userVendorId, isDefault: true, id: { not: methodId } },
        data: { isDefault: false },
      });
    }

    return this.prisma.payoutMethod.update({
      where: { id: methodId },
      data: dto,
    });
  }

  async deleteMethod(userId: string, userVendorId: string | null, methodId: string) {
    if (!userVendorId) throw new BadRequestException("Not a vendor");

    const method = await this.prisma.payoutMethod.findFirst({
      where: { id: methodId, vendorId: userVendorId },
    });
    if (!method) throw new NotFoundException("Payout method not found");

    await this.prisma.payoutMethod.delete({ where: { id: methodId } });
    return { message: "Payout method deleted" };
  }
}
