import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service.js";
import { CreateReviewDto, UpdateReviewDto } from "./dto/review.dto.js";

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async findByProduct(
    productId: string,
    query: { page?: number; limit?: number; sort?: string },
  ) {
    const { page = 1, limit = 20, sort = "newest" } = query;
    const skip = (page - 1) * limit;

    let orderBy: any = { createdAt: "desc" };
    if (sort === "highest") orderBy = { score: "desc" };
    else if (sort === "lowest") orderBy = { score: "asc" };

    const [reviews, total, ratingAgg, distribution] = await Promise.all([
      this.prisma.review.findMany({
        where: { productId },
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.review.count({ where: { productId } }),
      this.prisma.review.aggregate({
        where: { productId },
        _avg: { score: true },
      }),
      this.prisma.review.groupBy({
        by: ["score"],
        where: { productId },
        _count: true,
      }),
    ]);

    const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const d of distribution) {
      ratingDistribution[d.score] = d._count;
    }

    return {
      reviews,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
      ratingDistribution,
      averageRating: ratingAgg._avg.score ?? 0,
    };
  }

  async create(
    productId: string,
    userId: string,
    dto: CreateReviewDto,
  ) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException("Product not found");

    const existing = await this.prisma.review.findUnique({
      where: { productId_userId: { productId, userId } },
    });
    if (existing) {
      throw new BadRequestException("ALREADY_REVIEWED");
    }

    const review = await this.prisma.$transaction(async (tx) => {
      const r = await tx.review.create({
        data: {
          productId,
          userId,
          reviewer: dto.reviewer,
          score: dto.score,
          comment: dto.comment,
        },
      });

      const agg = await tx.review.aggregate({
        where: { productId },
        _avg: { score: true },
        _count: true,
      });

      await tx.product.update({
        where: { id: productId },
        data: {
          rating: agg._avg.score ?? 0,
          reviewsCount: agg._count,
        },
      });

      await tx.auditLog.create({
        data: {
          adminName: dto.reviewer,
          action: "ADD_REVIEW",
          resource: `Review on ${product.name}`,
          status: "Success",
        },
      });

      return r;
    });

    return review;
  }

  async update(reviewId: string, userId: string, dto: UpdateReviewDto) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!review) throw new NotFoundException("Review not found");
    if (review.userId !== userId) {
      throw new ForbiddenException("You can only edit your own reviews");
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.review.update({
        where: { id: reviewId },
        data: dto,
      });

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

      return updated;
    });
  }

  async remove(reviewId: string, userId: string, userRole: string) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!review) throw new NotFoundException("Review not found");

    if (userRole !== "ADMIN" && review.userId !== userId) {
      throw new ForbiddenException("You can only delete your own reviews");
    }

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
          adminName: "System",
          action: "DELETE_REVIEW",
          resource: `Review ${reviewId}`,
          status: "Success",
        },
      });

      return { message: "Review deleted" };
    });
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    sort?: string;
    productId?: string;
    minRating?: number;
    maxRating?: number;
  }) {
    const {
      page = 1,
      limit = 20,
      productId,
      minRating,
      maxRating,
    } = query;
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
        orderBy: { createdAt: "desc" },
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
}
