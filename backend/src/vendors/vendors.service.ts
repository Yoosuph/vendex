import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as crypto from 'crypto';
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
      where: {
        OR: [{ id: userId }, { vendorId: vendorId || undefined }],
        role: 'VENDOR',
      },
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
    const vendor = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: vendorUserId }, { vendorId: vendorUserId }],
      },
    });
    if (!vendor) throw new NotFoundException('Vendor not found');
    if (vendor.role !== 'VENDOR') throw new BadRequestException('Not a vendor');
    if (vendor.status === 'APPROVED' && vendor.vendorId) {
      throw new BadRequestException('Vendor already approved');
    }

    const vendorId =
      vendor.vendorId ||
      `v_${vendor.storeName ? vendor.storeName.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 8) + '_' : ''}${crypto.randomBytes(3).toString('hex')}`;

    const updated = await this.prisma.$transaction(async (tx) => {
      const u = await tx.user.update({
        where: { id: vendor.id },
        data: { status: 'APPROVED', vendorId },
      });

      await tx.auditLog.create({
        data: {
          adminId: adminUser.sub || adminUser.id,
          adminName: adminUser.name || adminUser.email || 'Admin',
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
    const vendor = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: vendorUserId }, { vendorId: vendorUserId }],
      },
    });
    if (!vendor) throw new NotFoundException('Vendor not found');

    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: vendor.id },
        data: { status: 'SUSPENDED' },
      });

      await tx.auditLog.create({
        data: {
          adminId: adminUser.sub || adminUser.id,
          adminName: adminUser.name || adminUser.email || 'Admin',
          action: 'SUSPEND_USER',
          resource: `Vendor ${vendor.name}`,
          status: 'Success',
        },
      });
    });

    return { message: 'Vendor suspended' };
  }

  async unsuspend(vendorUserId: string, adminUser: any) {
    const vendor = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: vendorUserId }, { vendorId: vendorUserId }],
      },
    });
    if (!vendor) throw new NotFoundException('Vendor not found');

    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: vendor.id },
        data: { status: 'APPROVED' },
      });

      await tx.auditLog.create({
        data: {
          adminId: adminUser.sub || adminUser.id,
          adminName: adminUser.name || adminUser.email || 'Admin',
          action: 'UNSUSPEND_USER',
          resource: `Vendor ${vendor.name}`,
          status: 'Success',
        },
      });
    });

    return { message: 'Vendor reinstated' };
  }

  async getDashboard(vendorIdOrUserId: string) {
    const vendor = await this.prisma.user.findFirst({
      where: {
        OR: [{ vendorId: vendorIdOrUserId }, { id: vendorIdOrUserId }],
        role: 'VENDOR',
      },
    });
    if (!vendor) throw new NotFoundException('Vendor not found');

    const effectiveVendorId = vendor.vendorId || vendor.id;

    const [
      totalProducts,
      activeProducts,
      lowStockProducts,
      orderItemsWithOrder,
      recentOrders,
      reviewsAgg,
    ] = await Promise.all([
      this.prisma.product.count({ where: { vendorId: effectiveVendorId } }),
      this.prisma.product.count({
        where: { vendorId: effectiveVendorId, isActive: true },
      }),
      this.prisma.product.count({
        where: { vendorId: effectiveVendorId, stock: { lte: 5 }, isActive: true },
      }),
      this.prisma.orderItem.findMany({
        where: {
          vendorId: effectiveVendorId,
          order: {
            status: { notIn: ['CANCELLED', 'REFUNDED'] },
          },
        },
        select: { orderId: true, price: true, quantity: true },
      }),
      this.prisma.order.findMany({
        where: { items: { some: { vendorId: effectiveVendorId } } },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            where: { vendorId: effectiveVendorId },
          },
        },
      }),
      this.prisma.review.aggregate({
        where: { product: { vendorId: effectiveVendorId } },
        _avg: { score: true },
        _count: true,
      }),
    ]);

    const uniqueOrderIds = [
      ...new Set(orderItemsWithOrder.map((i) => i.orderId)),
    ];
    const totalOrders = uniqueOrderIds.length;
    const totalRevenue = orderItemsWithOrder.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return {
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      totalOrders,
      totalProducts,
      activeProducts,
      lowStockProducts,
      storeRating: reviewsAgg._avg.score
        ? parseFloat(reviewsAgg._avg.score.toFixed(1))
        : 5.0,
      reviewsCount: reviewsAgg._count,
      recentOrders,
    };
  }
}

