import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto.js';

const CHECKOUT_CONFIG = {
  taxRate: 0.08,
  shippingFlat: 15.0,
};

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async checkout(userId: string, dto: CreateOrderDto) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('EMPTY_CART');
    }

    // Consolidate quantities for duplicate items
    const quantityMap = new Map<string, number>();
    for (const item of dto.items) {
      quantityMap.set(
        item.id,
        (quantityMap.get(item.id) || 0) + (item.quantity || 1),
      );
    }

    const productIds = Array.from(quantityMap.keys());
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    const stockIssues: any[] = [];
    for (const [productId, requestedQty] of quantityMap.entries()) {
      const product = productMap.get(productId);
      if (!product || !product.isActive) {
        stockIssues.push({
          id: productId,
          name: product?.name || 'Unavailable Item',
          available: 0,
          requested: requestedQty,
        });
      } else if (product.stock < requestedQty) {
        stockIssues.push({
          id: productId,
          name: product.name,
          available: product.stock,
          requested: requestedQty,
        });
      }
    }

    if (stockIssues.length > 0) {
      throw new BadRequestException({
        error: 'STOCK_ERROR',
        issues: stockIssues,
      });
    }

    let subtotal = 0;
    const orderItemsData: any[] = [];
    for (const [productId, requestedQty] of quantityMap.entries()) {
      const product = productMap.get(productId)!;
      subtotal += product.price * requestedQty;
      orderItemsData.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: requestedQty,
        vendorId: product.vendorId,
        vendor: product.vendorName,
        image: product.image,
      });
    }

    const tax = parseFloat((subtotal * CHECKOUT_CONFIG.taxRate).toFixed(2));
    const total = parseFloat(
      (subtotal + tax + CHECKOUT_CONFIG.shippingFlat).toFixed(2),
    );

    const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
    const timeSuffix = Date.now().toString(36).slice(-4).toUpperCase();
    const displayId = `VX-${randomSuffix}${timeSuffix}`;

    const order = await this.prisma.$transaction(async (tx) => {
      for (const [productId, requestedQty] of quantityMap.entries()) {
        const updated = await tx.product.updateMany({
          where: {
            id: productId,
            stock: { gte: requestedQty },
          },
          data: { stock: { decrement: requestedQty } },
        });
        if (updated.count === 0) {
          throw new BadRequestException('STOCK_CONTENTION');
        }
      }

      const createdOrder = await tx.order.create({
        data: {
          displayId,
          buyerId: userId,
          status: 'PROCESSING',
          total,
          subtotal,
          shippingCost: CHECKOUT_CONFIG.shippingFlat,
          tax,
          taxRate: CHECKOUT_CONFIG.taxRate,
          shippingDetails: dto.shippingDetails as any,
          paymentMethod: dto.paymentMethod
            ? ({
                cardName: dto.paymentMethod.cardName,
                cardNumber: dto.paymentMethod.cardNumber
                  ? `****${dto.paymentMethod.cardNumber.slice(-4)}`
                  : undefined,
                expDate: dto.paymentMethod.expDate,
              } as any)
            : undefined,
          items: {
            create: orderItemsData,
          },
        },
        include: { items: true },
      });

      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { name: true },
      });

      await tx.auditLog.create({
        data: {
          adminId: userId,
          adminName: user?.name || 'Customer',
          action: 'ORDER_PLACED',
          resource: `Order ${displayId}`,
          status: 'Success',
        },
      });

      return createdOrder;
    });

    await this.prisma.cartItem.deleteMany({ where: { userId } });

    return { order, message: 'Order placed successfully' };
  }

  async findAll(
    userId: string,
    userRole: string,
    userVendorId: string | null,
    query: { status?: string; page?: number; limit?: number; sort?: string },
  ) {
    const { status, page = 1, limit = 20, sort = 'newest' } = query;

    const where: any = {};

    if (userRole === 'BUYER') {
      where.buyerId = userId;
    } else if (userRole === 'VENDOR') {
      where.items = { some: { vendorId: userVendorId } };
    }

    if (status) {
      where.status = status.toUpperCase();
    }

    const orderBy =
      sort === 'oldest'
        ? { createdAt: 'asc' as const }
        : { createdAt: 'desc' as const };
    const skip = (page - 1) * limit;

    const [rawOrders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: { items: true },
      }),
      this.prisma.order.count({ where }),
    ]);

    // For vendors, isolate items to only their own products
    const orders = rawOrders.map((o) => {
      if (userRole === 'VENDOR' && userVendorId) {
        return {
          ...o,
          items: o.items.filter((i) => i.vendorId === userVendorId),
        };
      }
      return o;
    });

    return {
      orders,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(
    id: string,
    userId: string,
    userRole: string,
    userVendorId: string | null,
  ) {
    const order = await this.prisma.order.findFirst({
      where: { OR: [{ id }, { displayId: id }] },
      include: { items: true },
    });
    if (!order) throw new NotFoundException('Order not found');

    if (userRole === 'BUYER' && order.buyerId !== userId) {
      throw new ForbiddenException('FORBIDDEN');
    }

    if (
      userRole === 'VENDOR' &&
      (!userVendorId || !order.items.some((i) => i.vendorId === userVendorId))
    ) {
      throw new ForbiddenException('FORBIDDEN');
    }

    if (userRole === 'VENDOR' && userVendorId) {
      return {
        ...order,
        items: order.items.filter((i) => i.vendorId === userVendorId),
      };
    }

    return order;
  }

  async updateStatus(
    id: string,
    dto: UpdateOrderStatusDto,
    user?: any,
  ) {
    const order = await this.prisma.order.findFirst({
      where: { OR: [{ id }, { displayId: id }] },
      include: { items: true },
    });
    if (!order) throw new NotFoundException('Order not found');

    const newStatus = dto.status.toUpperCase() as any;
    const previousStatus = order.status;

    const updated = await this.prisma.$transaction(async (tx) => {
      // Restock inventory if cancelling or refunding an active order
      if (
        (newStatus === 'CANCELLED' || newStatus === 'REFUNDED') &&
        previousStatus !== 'CANCELLED' &&
        previousStatus !== 'REFUNDED'
      ) {
        for (const item of order.items) {
          await tx.product.updateMany({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          });
        }
      }

      const res = await tx.order.update({
        where: { id: order.id },
        data: { status: newStatus },
        include: { items: true },
      });

      await tx.auditLog.create({
        data: {
          adminId: user?.sub || user?.id,
          adminName: user?.name || 'Admin',
          action: 'ORDER_STATUS_CHANGE',
          resource: `Order ${order.displayId} (${previousStatus} → ${newStatus})`,
          status: 'Success',
        },
      });

      return res;
    });

    return updated;
  }
}

