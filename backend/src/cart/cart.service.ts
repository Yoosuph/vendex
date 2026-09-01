import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { AddCartItemDto, UpdateCartItemDto } from './dto/cart.dto.js';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    const items = await this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: 'asc' },
    });

    let subtotal = 0;
    const issues: string[] = [];
    let valid = true;

    const cartItems = items.map((item) => {
      const product = item.product;
      const outOfStock = product.stock < item.quantity || !product.isActive;
      const priceChanged = false;

      if (outOfStock) {
        issues.push(
          !product.isActive
            ? `${product.name} is no longer available`
            : `${product.name} is out of stock (only ${product.stock} available)`,
        );
        valid = false;
      }

      subtotal += product.price * item.quantity;

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        vendor: product.vendorName,
        vendorId: product.vendorId,
        image: product.image,
        availableStock: product.stock,
        priceChanged,
        outOfStock,
      };
    });

    return { items: cartItems, subtotal, valid, issues };
  }

  async addItem(userId: string, dto: AddCartItemDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product || !product.isActive) {
      throw new NotFoundException('Product not found or unavailable');
    }

    if (dto.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    return this.prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId: dto.productId } },
      update: {
        quantity: { increment: dto.quantity },
      },
      create: {
        userId,
        productId: dto.productId,
        quantity: dto.quantity,
      },
    });
  }

  async updateItem(userId: string, productId: string, dto: UpdateCartItemDto) {
    if (dto.quantity <= 0) {
      return this.removeItem(userId, productId);
    }

    const item = await this.prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
      include: { product: true },
    });
    if (!item) throw new NotFoundException('Cart item not found');

    if (item.product && item.product.stock < dto.quantity) {
      throw new BadRequestException(
        `Requested quantity exceeds available stock (${item.product.stock})`,
      );
    }

    return this.prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity: dto.quantity },
    });
  }

  async removeItem(userId: string, productId: string) {
    const item = await this.prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    if (!item) throw new NotFoundException('Cart item not found');

    await this.prisma.cartItem.delete({ where: { id: item.id } });
    return { message: 'Item removed from cart' };
  }

  async clearCart(userId: string) {
    await this.prisma.cartItem.deleteMany({ where: { userId } });
    return { message: 'Cart cleared' };
  }
}

