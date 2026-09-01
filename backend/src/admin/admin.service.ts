import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [
      totalRevenue,
      totalOrders,
      totalProducts,
      vendorsByStatus,
      orderStatusBreakdown,
    ] = await Promise.all([
      this.prisma.order.aggregate({ _sum: { total: true } }),
      this.prisma.order.count(),
      this.prisma.product.count(),
      this.prisma.user.groupBy({
        by: ['status'],
        where: { role: 'VENDOR' },
        _count: true,
      }),
      this.prisma.order.groupBy({
        by: ['status'],
        _count: true,
      }),
    ]);

    const statusCounts: Record<string, number> = {
      approved: 0,
      pending: 0,
      suspended: 0,
    };
    for (const s of vendorsByStatus) {
      if (s.status) statusCounts[s.status.toLowerCase()] = s._count;
    }

    const orderStatus: Record<string, number> = {};
    for (const s of orderStatusBreakdown) {
      orderStatus[s.status.toLowerCase()] = s._count;
    }

    const totalVendors = vendorsByStatus.reduce((acc, s) => acc + s._count, 0);
    const totalBuyers = await this.prisma.user.count({
      where: { role: 'BUYER' },
    });

    const recentOrders = await this.prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    });

    return {
      totalRevenue: totalRevenue._sum.total ?? 0,
      totalOrders,
      totalProducts,
      totalVendors,
      approvedVendors: statusCounts.approved,
      pendingVendors: statusCounts.pending,
      suspendedVendors: statusCounts.suspended,
      totalBuyers,
      orderStatusBreakdown: orderStatus,
      recentOrders,
    };
  }

  async getVendors(query: { search?: string; status?: string }) {
    const { search, status } = query;

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

  async getBuyers(query: { search?: string }) {
    const { search } = query;

    const where: any = { role: 'BUYER' };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const buyers = await this.prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        _count: { select: { orders: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const buyerStats = await this.prisma.order.groupBy({
      by: ['buyerId'],
      _sum: { total: true },
    });
    const spendMap = new Map(
      buyerStats.map((s) => [s.buyerId, s._sum.total ?? 0]),
    );

    return {
      buyers: buyers.map((b) => ({
        ...b,
        orderCount: b._count.orders,
        totalSpent: spendMap.get(b.id) ?? 0,
      })),
      summary: {
        totalBuyers: buyers.length,
        avgSpend:
          buyers.length > 0
            ? buyerStats.reduce((acc, s) => acc + (s._sum.total ?? 0), 0) /
              buyers.length
            : 0,
      },
    };
  }

  async getProducts(query: {
    search?: string;
    page?: number;
    limit?: number;
    sort?: string;
  }) {
    const { search, page = 1, limit = 20, sort = 'newest' } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { categoryName: { contains: search, mode: 'insensitive' } },
        { vendorName: { contains: search, mode: 'insensitive' } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    else if (sort === 'price_desc') orderBy = { price: 'desc' };
    else if (sort === 'rating') orderBy = { rating: 'desc' };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({ where, orderBy, skip, take: limit }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getOrders(query: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const { status, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status.toUpperCase();

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: { items: true },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      orders,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getDisputes(query: { status?: string; page?: number; limit?: number }) {
    const { status, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status.toUpperCase().replace(' ', '_');

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

  async getReviews(query: {
    page?: number;
    limit?: number;
    productId?: string;
    minRating?: number;
    maxRating?: number;
  }) {
    const { page = 1, limit = 20, productId, minRating, maxRating } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (productId) where.productId = productId;
    if (minRating !== undefined || maxRating !== undefined) {
      where.score = {};
      if (minRating !== undefined) where.score.gte = minRating;
      if (maxRating !== undefined) where.score.lte = maxRating;
    }

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: { product: { select: { id: true, name: true } } },
      }),
      this.prisma.review.count({ where }),
    ]);

    return {
      reviews,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async deleteReview(reviewId: string) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!review) throw new NotFoundException('Review not found');

    return this.prisma.$transaction(async (tx) => {
      await tx.review.delete({ where: { id: reviewId } });

      const agg = await tx.review.aggregate({
        where: { productId: review.productId },
        _avg: { score: true },
        _count: true,
      });

      await tx.product.update({
        where: { id: review.productId },
        data: {
          rating: agg._avg.score ?? 0,
          reviewsCount: agg._count,
        },
      });

      await tx.auditLog.create({
        data: {
          adminName: 'System',
          action: 'DELETE_REVIEW',
          resource: `Review ${reviewId}`,
          status: 'Success',
        },
      });

      return { message: 'Review deleted' };
    });
  }

  async getAuditLogs(query: {
    search?: string;
    action?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    const { search, action, sort = 'desc', page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (action) where.action = action;
    if (search) {
      where.OR = [
        { adminName: { contains: search, mode: 'insensitive' } },
        { resource: { contains: search, mode: 'insensitive' } },
      ];
    }

    const orderBy =
      sort === 'asc'
        ? { timestamp: 'asc' as const }
        : { timestamp: 'desc' as const };

    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({ where, orderBy, skip, take: limit }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      logs,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getPlatformSettings() {
    let settings = await this.prisma.platformSettings.findUnique({
      where: { id: 'platform' },
    });
    if (!settings) {
      settings = await this.prisma.platformSettings.create({
        data: {
          id: 'platform',
          platformName: 'Vendex Marketplace',
          supportEmail: 'support@vendex.com',
          commissionRate: 10,
          currency: 'USD',
          maintenanceMode: false,
        },
      });
    }
    return settings;
  }

  async updatePlatformSettings(dto: any, adminUser?: any) {
    const settings = await this.prisma.platformSettings.upsert({
      where: { id: 'platform' },
      update: dto,
      create: {
        id: 'platform',
        platformName: dto.platformName || 'Vendex Marketplace',
        supportEmail: dto.supportEmail || 'support@vendex.com',
        commissionRate: dto.commissionRate ?? 10,
        currency: dto.currency || 'USD',
        maintenanceMode: dto.maintenanceMode ?? false,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        adminId: adminUser?.sub || adminUser?.id,
        adminName: adminUser?.name || adminUser?.email || 'Admin',
        action: 'SETTINGS_UPDATE',
        resource: 'Platform Settings Updated',
        status: 'Success',
      },
    });

    return settings;
  }

  async getBanners() {
    const banners = await this.prisma.banner.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { banners };
  }

  async createBanner(dto: any, adminUser?: any) {
    const banner = await this.prisma.banner.create({
      data: {
        title: dto.title,
        placement: dto.placement || 'HOME_HERO_CAROUSEL',
        url: dto.url,
        image: dto.image,
        active: dto.active ?? true,
        startDate: dto.startDate ? new Date(dto.startDate) : null,
        endDate: dto.endDate ? new Date(dto.endDate) : null,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        adminId: adminUser?.sub || adminUser?.id,
        adminName: adminUser?.name || adminUser?.email || 'Admin',
        action: 'SETTINGS_UPDATE',
        resource: `Banner created: ${banner.title}`,
        status: 'Success',
      },
    });

    return banner;
  }

  async updateBanner(id: string, dto: any, adminUser?: any) {
    const banner = await this.prisma.banner.update({
      where: { id },
      data: {
        ...(dto.title ? { title: dto.title } : {}),
        ...(dto.placement ? { placement: dto.placement } : {}),
        ...(dto.url !== undefined ? { url: dto.url } : {}),
        ...(dto.image !== undefined ? { image: dto.image } : {}),
        ...(dto.active !== undefined ? { active: dto.active } : {}),
        ...(dto.startDate !== undefined
          ? { startDate: dto.startDate ? new Date(dto.startDate) : null }
          : {}),
        ...(dto.endDate !== undefined
          ? { endDate: dto.endDate ? new Date(dto.endDate) : null }
          : {}),
      },
    });

    await this.prisma.auditLog.create({
      data: {
        adminId: adminUser?.sub || adminUser?.id,
        adminName: adminUser?.name || adminUser?.email || 'Admin',
        action: 'SETTINGS_UPDATE',
        resource: `Banner updated: ${banner.title}`,
        status: 'Success',
      },
    });

    return banner;
  }

  async deleteBanner(id: string, adminUser?: any) {
    const banner = await this.prisma.banner.findUnique({ where: { id } });
    if (!banner) throw new NotFoundException('Banner not found');

    await this.prisma.banner.delete({ where: { id } });

    await this.prisma.auditLog.create({
      data: {
        adminId: adminUser?.sub || adminUser?.id,
        adminName: adminUser?.name || adminUser?.email || 'Admin',
        action: 'SETTINGS_UPDATE',
        resource: `Banner deleted: ${banner.title}`,
        status: 'Success',
      },
    });

    return { message: 'Banner deleted' };
  }

  async getRoles() {
    const roles = await this.prisma.adminRole.findMany({
      include: {
        assignments: {
          include: { admin: { select: { id: true, name: true, email: true } } },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
    return { roles };
  }

  async createRole(dto: any, adminUser?: any) {
    const role = await this.prisma.adminRole.create({
      data: {
        name: dto.name,
        icon: dto.icon || 'shield_person',
        description: dto.description,
        isActive: dto.isActive ?? true,
        permissions: dto.permissions || {},
      },
    });

    await this.prisma.auditLog.create({
      data: {
        adminId: adminUser?.sub || adminUser?.id,
        adminName: adminUser?.name || adminUser?.email || 'Admin',
        action: 'SETTINGS_UPDATE',
        resource: `Admin role created: ${role.name}`,
        status: 'Success',
      },
    });

    return role;
  }

  async updateRole(id: string, dto: any, adminUser?: any) {
    const role = await this.prisma.adminRole.update({
      where: { id },
      data: {
        ...(dto.name ? { name: dto.name } : {}),
        ...(dto.icon ? { icon: dto.icon } : {}),
        ...(dto.description !== undefined
          ? { description: dto.description }
          : {}),
        ...(dto.isActive !== undefined ? { isActive: dto.isActive } : {}),
        ...(dto.permissions ? { permissions: dto.permissions } : {}),
      },
    });

    await this.prisma.auditLog.create({
      data: {
        adminId: adminUser?.sub || adminUser?.id,
        adminName: adminUser?.name || adminUser?.email || 'Admin',
        action: 'SETTINGS_UPDATE',
        resource: `Admin role updated: ${role.name}`,
        status: 'Success',
      },
    });

    return role;
  }

  async deleteRole(id: string, adminUser?: any) {
    const role = await this.prisma.adminRole.findUnique({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');

    await this.prisma.adminRole.delete({ where: { id } });

    await this.prisma.auditLog.create({
      data: {
        adminId: adminUser?.sub || adminUser?.id,
        adminName: adminUser?.name || adminUser?.email || 'Admin',
        action: 'SETTINGS_UPDATE',
        resource: `Admin role deleted: ${role.name}`,
        status: 'Success',
      },
    });

    return { message: 'Role deleted' };
  }
}

