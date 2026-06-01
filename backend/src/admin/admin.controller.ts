import {
  Controller,
  Get,
  Delete,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { AdminService } from "./admin.service.js";
import { Roles } from "../common/decorators/roles.decorator.js";
import { JwtAuthGuard, RolesGuard } from "../common/guards/index.js";

@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("stats")
  getStats() {
    return this.adminService.getStats();
  }

  @Get("vendors")
  getVendors(
    @Query("search") search?: string,
    @Query("status") status?: string,
  ) {
    return this.adminService.getVendors({ search, status });
  }

  @Get("buyers")
  getBuyers(@Query("search") search?: string) {
    return this.adminService.getBuyers({ search });
  }

  @Get("products")
  getProducts(
    @Query("search") search?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("sort") sort?: string,
  ) {
    return this.adminService.getProducts({
      search,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
      sort,
    });
  }

  @Get("orders")
  getOrders(
    @Query("status") status?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ) {
    return this.adminService.getOrders({
      status,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  @Get("disputes")
  getDisputes(
    @Query("status") status?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ) {
    return this.adminService.getDisputes({
      status,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  @Get("reviews")
  getReviews(
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("productId") productId?: string,
    @Query("minRating") minRating?: string,
    @Query("maxRating") maxRating?: string,
  ) {
    return this.adminService.getReviews({
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
      productId,
      minRating: minRating ? parseInt(minRating, 10) : undefined,
      maxRating: maxRating ? parseInt(maxRating, 10) : undefined,
    });
  }

  @Delete("reviews/:reviewId")
  @HttpCode(HttpStatus.OK)
  deleteReview(@Param("reviewId") reviewId: string) {
    return this.adminService.deleteReview(reviewId);
  }

  @Get("audit-logs")
  getAuditLogs(
    @Query("search") search?: string,
    @Query("action") action?: string,
    @Query("sort") sort?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ) {
    return this.adminService.getAuditLogs({
      search,
      action,
      sort,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }
}
