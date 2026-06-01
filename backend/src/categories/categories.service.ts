import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service.js";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto.js";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: {
        _count: { select: { products: true } },
      },
      orderBy: { name: "asc" },
    });
    return {
      categories: categories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        icon: c.icon,
        parentId: c.parentId,
        productCount: c._count.products,
      })),
    };
  }

  async create(dto: CreateCategoryDto) {
    const slug =
      dto.slug ||
      dto.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    return this.prisma.category.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
        icon: dto.icon,
        parentId: dto.parentId,
      },
    });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const data: any = { ...dto };
    if (dto.name && !dto.slug) {
      data.slug = dto.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: string) {
    const affectedProducts = await this.prisma.product.count({
      where: { categoryId: id },
    });

    await this.prisma.category.delete({ where: { id } });
    return { message: "Category deleted", affectedProducts };
  }
}
