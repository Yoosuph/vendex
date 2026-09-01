import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { JwtAuthGuard, RolesGuard } from '../common/guards/index.js';
import { AdminService } from './admin.service.js';


@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getStats() {
    return this.adminService.getStats();
  }

  @Get('vendors')
  getVendors(
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.adminService.getVendors({ search, status });
  }

  @Get('buyers')
  getBuyers(@Query('search') search?: string) {
    return this.adminService.getBuyers({ search });
  }

  @Get('products')
  getProducts(
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
  ) {
    return this.adminService.getProducts({
      search,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
      sort,
    });
  }

  @Get('orders')
  getOrders(
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getOrders({
      status,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  @Get('disputes')
  getDisputes(
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getDisputes({
      status,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  @Get('reviews')
  getReviews(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('productId') productId?: string,
    @Query('minRating') minRating?: string,
    @Query('maxRating') maxRating?: string,
  ) {
    return this.adminService.getReviews({
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
      productId,
      minRating: minRating ? parseInt(minRating, 10) : undefined,
      maxRating: maxRating ? parseInt(maxRating, 10) : undefined,
    });
  }

  @Delete('reviews/:reviewId')
  @HttpCode(HttpStatus.OK)
  deleteReview(@Param('reviewId') reviewId: string) {
    return this.adminService.deleteReview(reviewId);
  }

  @Get('audit-logs')
  getAuditLogs(
    @Query('search') search?: string,
    @Query('action') action?: string,
    @Query('sort') sort?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getAuditLogs({
      search,
      action,
      sort,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  @Get('settings')
  getSettings() {
    return this.adminService.getPlatformSettings();
  }

  @Patch('settings')
  updateSettings(@Body() dto: any, @CurrentUser() user: any) {
    return this.adminService.updatePlatformSettings(dto, user);
  }

  @Get('banners')
  getBanners() {
    return this.adminService.getBanners();
  }

  @Post('banners')
  @HttpCode(HttpStatus.CREATED)
  createBanner(@Body() dto: any, @CurrentUser() user: any) {
    return this.adminService.createBanner(dto, user);
  }

  @Patch('banners/:id')
  updateBanner(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() user: any,
  ) {
    return this.adminService.updateBanner(id, dto, user);
  }

  @Delete('banners/:id')
  deleteBanner(@Param('id') id: string, @CurrentUser() user: any) {
    return this.adminService.deleteBanner(id, user);
  }

  @Get('roles')
  getRoles() {
    return this.adminService.getRoles();
  }

  @Post('roles')
  @HttpCode(HttpStatus.CREATED)
  createRole(@Body() dto: any, @CurrentUser() user: any) {
    return this.adminService.createRole(dto, user);
  }

  @Patch('roles/:id')
  updateRole(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() user: any,
  ) {
    return this.adminService.updateRole(id, dto, user);
  }

  @Delete('roles/:id')
  deleteRole(@Param('id') id: string, @CurrentUser() user: any) {
    return this.adminService.deleteRole(id, user);
  }
}

