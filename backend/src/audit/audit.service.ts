import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    page?: number;
    limit?: number;
    action?: string;
    search?: string;
    sort?: string;
  }) {
    const { page = 1, limit = 20, action, search, sort = 'desc' } = query;
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

    const [logs, total, stats] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.auditLog.count({ where }),
      this.getStats(),
    ]);

    return {
      logs,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
      stats,
    };
  }

  private async getStats() {
    const totalActions = await this.prisma.auditLog.count();

    const actionGroups = await this.prisma.auditLog.groupBy({
      by: ['action'],
    });

    const topAdmin = await this.prisma.auditLog.groupBy({
      by: ['adminName'],
      _count: true,
      orderBy: { _count: { adminName: 'desc' } },
      take: 1,
    });

    return {
      totalActions,
      uniqueActionTypes: actionGroups.length,
      topAdmin: topAdmin[0]
        ? [topAdmin[0].adminName, topAdmin[0]._count]
        : null,
    };
  }
}
