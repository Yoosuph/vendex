import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { UpdateVendorDto } from './dto/vendor.dto.js';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    status?: string;
    search?: string;
    featured?: string;
  }) {
    const { status, search } = query;

    const where: any = { role: 'VENDOR' };
    if (status && status !== 'all') {
      where.status = status.toUpperCase();
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { vendorId: { contains: search, mode: 'insensitive' } },
        { storeName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const vendors = await this.prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        vendorId: true,
        status: true,
        storeName: true,
        storeDescription: true,
        storeCategory: true,
        country: true,
        city: true,
        createdAt: true,
        _count: { select: { products: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      vendors: vendors.map((v) => ({
        ...v,
        productCount: v._count.products,
      })),
    };
  }

  async findOne(vendorId: string) {
    const vendor = await this.prisma.user.findFirst({
      where: { vendorId, role: 'VENDOR' },
      select: {
        id: true,
        name: true,
        vendorId: true,
        storeName: true,
        storeDescription: true,
        storeCategory: true,
        country: true,
        city: true,
        businessEmail: true,
        createdAt: true,
        _count: { select: { products: true } },
      },
    });
    if (!vendor) throw new NotFoundException('Vendor not found');

    return {
      ...vendor,
      productCount: vendor._count.products,
    };
  }

  async getVendorProducts(
    vendorId: string,
    query: { page?: number; limit?: number; sort?: string },
  ) {
    const { page = 1, limit = 20, sort = 'newest' } = query;
    const skip = (page - 1) * limit;

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    else if (sort === 'price_desc') orderBy = { price: 'desc' };
    else if (sort === 'rating') orderBy = { rating: 'desc' };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where: { vendorId, isActive: true },
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where: { vendorId, isActive: true } }),
    ]);

    return {
      products,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async updateProfile(vendorId: string, userId: string, dto: UpdateVendorDto) {
    const vendor = await this.prisma.user.findFirst({
      where: { vendorId, role: 'VENDOR' },
    });
    if (!vendor) throw new NotFoundException('Vendor not found');
    if (vendor.id !== userId) throw new ForbiddenException('FORBIDDEN');

    return this.prisma.user.update({
      where: { id: vendor.id },
      data: dto,
      select: {
        id: true,
        name: true,
        vendorId: true,
        storeName: true,
        storeDescription: true,
        country: true,
        city: true,
        businessEmail: true,
      },
    });
  }

  async approve(vendorUserId: string, adminUser: any) {
    const vendor = await this.prisma.user.findUnique({
      where: { id: vendorUserId },
    });
    if (!vendor) throw new NotFoundException('Vendor not found');
    if (vendor.role !== 'VENDOR') throw new BadRequestException('Not a vendor');
    if (vendor.status === 'APPROVED') {
      throw new BadRequestException('Vendor already approved');
    }

    const vendorId = `v_${Math.random().toString(36).substring(2, 10)}`;

    const updated = await this.prisma.$transaction(async (tx) => {
      const u = await tx.user.update({
        where: { id: vendorUserId },
        data: { status: 'APPROVED', vendorId },
      });

      await tx.auditLog.create({
        data: {
          adminId: adminUser.sub,
          adminName: adminUser.name || adminUser.email,
          action: 'APPROVE_VENDOR',
          resource: `Vendor ${vendor.name} (${vendorId})`,
          status: 'Success',
        },
      });

      return u;
    });

    return { message: 'Vendor approved', vendorId: updated.vendorId };
  }

  async suspend(vendorUserId: string, adminUser: any) {
    const vendor = await this.prisma.user.findUnique({
      where: { id: vendorUserId },
    });
    if (!vendor) throw new NotFoundException('Vendor not found');

    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: vendorUserId },
        data: { status: 'SUSPENDED' },
      });

      await tx.auditLog.create({
        data: {
          adminId: adminUser.sub,
          adminName: adminUser.name || adminUser.email,
          action: 'SUSPEND_USER',
          resource: `Vendor ${vendor.name}`,
          status: 'Success',
        },
      });
    });

    return { message: 'Vendor suspended' };
  }

  async unsuspend(vendorUserId: string, adminUser: any) {
    const vendor = await this.prisma.user.findUnique({
      where: { id: vendorUserId },
    });
    if (!vendor) throw new NotFoundException('Vendor not found');

    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: vendorUserId },
        data: { status: 'APPROVED' },
      });

      await tx.auditLog.create({
        data: {
          adminId: adminUser.sub,
          adminName: adminUser.name || adminUser.email,
          action: 'UNSUSPEND_USER',
          resource: `Vendor ${vendor.name}`,
          status: 'Success',
        },
      });
    });

    return { message: 'Vendor reinstated' };
  }

  async getDashboard(vendorId: string) {
    const vendor = await this.prisma.user.findFirst({
      where: { vendorId, role: 'VENDOR' },
    });
    if (!vendor) throw new NotFoundException('Vendor not found');

    const [
      totalProducts,
      activeProducts,
      lowStockProducts,
      ordersWithVendorItems,
      revenueAgg,
      recentOrders,
      reviewsAgg,
    ] = await Promise.all([
      this.prisma.product.count({ where: { vendorId } }),
      this.prisma.product.count({ where: { vendorId, isActive: true } }),
      this.prisma.product.count({
        where: { vendorId, stock: { lte: 5 }, isActive: true },
      }),
      this.prisma.orderItem.findMany({
        where: { vendorId },
        select: { orderId: true, price: true, quantity: true },
      }),
      this.prisma.orderItem.aggregate({
        where: { vendorId },
        _sum: { price: true },
      }),
      this.prisma.order.findMany({
        where: { items: { some: { vendorId } } },
        take: 4,
        orderBy: { createdAt: 'desc' },
        include: { items: true },
      }),
      this.prisma.review.aggregate({
        where: { product: { vendorId } },
        _avg: { score: true },
        _count: true,
      }),
    ]);

    const uniqueOrderIds = [
      ...new Set(ordersWithVendorItems.map((i) => i.orderId)),
    ];
    const totalOrders = uniqueOrderIds.length;
    const totalRevenue = revenueAgg._sum.price ?? 0;

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      activeProducts,
      lowStockProducts,
      storeRating: reviewsAgg._avg.score ?? 0,
      reviewsCount: reviewsAgg._count,
      recentOrders,
    };
  }
}
