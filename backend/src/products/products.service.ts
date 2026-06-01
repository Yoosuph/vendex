import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service.js";
import { CreateProductDto, UpdateProductDto, UpdateStockDto } from "./dto/product.dto.js";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    q?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    page?: number;
    limit?: number;
    ids?: string;
    vendorId?: string;
  }) {
    const {
      q,
      category,
      brand,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 20,
      ids,
      vendorId,
    } = query;

    const where: any = { isActive: true };

    if (ids) {
      where.id = { in: ids.split(",") };
    }
    if (vendorId) {
      where.vendorId = vendorId;
    }
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { brand: { contains: q, mode: "insensitive" } },
        { vendorName: { contains: q, mode: "insensitive" } },
      ];
    }
    if (category) {
      where.categoryName = category;
    }
    if (brand) {
      where.brand = { in: brand.split(",") };
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price_asc") orderBy = { price: "asc" };
    else if (sort === "price_desc") orderBy = { price: "desc" };
    else if (sort === "rating") orderBy = { rating: "desc" };
    else if (sort === "trending") orderBy = { reviewsCount: "desc" };

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    const brands = await this.prisma.product.findMany({
      where: { isActive: true },
      select: { brand: true },
      distinct: ["brand"],
    });

    const priceAgg = await this.prisma.product.aggregate({
      where: { isActive: true },
      _min: { price: true },
      _max: { price: true },
    });

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      filters: {
        categories: await this.getCategoryNames(),
        brands: brands.map((b) => b.brand).filter(Boolean),
        priceRange: {
          min: priceAgg._min.price ?? 0,
          max: priceAgg._max.price ?? 0,
        },
      },
    };
  }

  private async getCategoryNames() {
    const cats = await this.prisma.category.findMany({
      select: { name: true },
    });
    return cats.map((c) => c.name);
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        reviews: {
          take: 10,
          orderBy: { createdAt: "desc" },
        },
      },
    });
    if (!product) return null;
    return product;
  }

  async getBrands() {
    const brands = await this.prisma.product.findMany({
      where: { isActive: true },
      select: { brand: true },
      distinct: ["brand"],
    });
    return { brands: brands.map((b) => b.brand).filter(Boolean) };
  }

  async getRelated(id: string, limit = 4) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) return { products: [] };

    const products = await this.prisma.product.findMany({
      where: {
        isActive: true,
        id: { not: id },
        OR: [
          { categoryId: product.categoryId },
          { vendorId: product.vendorId },
        ],
      },
      take: limit,
      orderBy: { rating: "desc" },
    });
    return { products };
  }

  async create(dto: CreateProductDto, user: any) {
    const vendorId = user.vendorId;
    const vendorName = user.storeName || user.name;

    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });
    if (!category) {
      throw new Error("Category not found");
    }

    return this.prisma.product.create({
      data: {
        name: dto.name,
        vendorId,
        vendorName,
        categoryId: dto.categoryId,
        categoryName: category.name,
        brand: dto.brand,
        price: dto.price,
        stock: dto.stock,
        description: dto.description,
        image: dto.image,
        images: dto.images || [],
      },
    });
  }

  async update(id: string, dto: UpdateProductDto, user: any) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error("Product not found");

    if (user.role !== "ADMIN" && product.vendorId !== user.vendorId) {
      throw new ForbiddenException("You can only edit your own products");
    }

    const data: any = { ...dto };
    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });
      if (category) {
        data.categoryName = category.name;
      }
    }

    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: string, user: any) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error("Product not found");

    if (user.role !== "ADMIN" && product.vendorId !== user.vendorId) {
      throw new ForbiddenException("You can only delete your own products");
    }

    await this.prisma.product.delete({ where: { id } });
    return { message: "Product deleted" };
  }

  async updateStock(id: string, dto: UpdateStockDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error("Product not found");

    return this.prisma.product.update({
      where: { id },
      data: { stock: dto.stock },
    });
  }
}
