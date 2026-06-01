import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service.js";
import { CreateOrderDto, UpdateOrderStatusDto } from "./dto/order.dto.js";

const CHECKOUT_CONFIG = {
  taxRate: 0.08,
  shippingFlat: 15.0,
};

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async checkout(userId: string, dto: CreateOrderDto) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException("EMPTY_CART");
    }

    const productIds = dto.items.map((i) => i.id);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    const stockIssues: any[] = [];
    for (const item of dto.items) {
      const product = productMap.get(item.id);
      if (!product) {
        stockIssues.push({
          id: item.id,
          name: "Unknown",
          available: 0,
          requested: item.quantity,
        });
      } else if (product.stock < item.quantity) {
        stockIssues.push({
          id: item.id,
          name: product.name,
          available: product.stock,
          requested: item.quantity,
        });
      }
    }

    if (stockIssues.length > 0) {
      throw new BadRequestException({
        error: "STOCK_ERROR",
        issues: stockIssues,
      });
    }

    let subtotal = 0;
    const orderItemsData: any[] = [];
    for (const item of dto.items) {
      const product = productMap.get(item.id)!;
      subtotal += product.price * item.quantity;
      orderItemsData.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        vendorId: product.vendorId,
        vendor: product.vendorName,
        image: product.image,
      });
    }

    const tax = parseFloat((subtotal * CHECKOUT_CONFIG.taxRate).toFixed(2));
    const total = parseFloat(
      (subtotal + tax + CHECKOUT_CONFIG.shippingFlat).toFixed(2),
    );

    const displayId = `VX-${Math.random().toString(36).substring(2, 6).toUpperCase()}${Date.now().toString(36).substring(-4).toUpperCase()}`;

    const order = await this.prisma.$transaction(async (tx) => {
      for (const item of dto.items) {
        const product = productMap.get(item.id)!;
        const updated = await tx.product.updateMany({
          where: {
            id: item.id,
            stock: { gte: item.quantity },
          },
          data: { stock: { decrement: item.quantity } },
        });
        if (updated.count === 0) {
          throw new BadRequestException("STOCK_CONTENTION");
        }
      }

      const createdOrder = await tx.order.create({
        data: {
          displayId,
          buyerId: userId,
          status: "PROCESSING",
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

      await tx.auditLog.create({
        data: {
          adminName: "System",
          action: "ORDER_PLACED",
          resource: `Order ${displayId}`,
          status: "Success",
        },
      });

      return createdOrder;
    });

    await this.prisma.cartItem.deleteMany({ where: { userId } });

    return { order, message: "Order placed successfully" };
  }

  async findAll(
    userId: string,
    userRole: string,
    userVendorId: string | null,
    query: { status?: string; page?: number; limit?: number; sort?: string },
  ) {
    const { status, page = 1, limit = 20, sort = "newest" } = query;

    const where: any = {};

    if (userRole === "BUYER") {
      where.buyerId = userId;
    } else if (userRole === "VENDOR") {
      where.items = { some: { vendorId: userVendorId } };
    }

    if (status) {
      where.status = status.toUpperCase();
    }

    const orderBy =
      sort === "oldest" ? { createdAt: "asc" as const } : { createdAt: "desc" as const };
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        orderBy,
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

  async findOne(id: string, userId: string, userRole: string, userVendorId: string | null) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!order) throw new NotFoundException("Order not found");

    if (userRole === "BUYER" && order.buyerId !== userId) {
      throw new ForbiddenException("FORBIDDEN");
    }

    return order;
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException("Order not found");

    const updated = await this.prisma.order.update({
      where: { id },
      data: { status: dto.status.toUpperCase() as any },
      include: { items: true },
    });

    await this.prisma.auditLog.create({
      data: {
        adminName: "System",
        action: "ORDER_STATUS_CHANGE",
        resource: `Order ${order.displayId} → ${dto.status}`,
        status: "Success",
      },
    });

    return updated;
  }
}
