import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { VendorsService } from './vendors.service.js';
import { UpdateVendorDto } from './dto/vendor.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { JwtAuthGuard, RolesGuard } from '../common/guards/index.js';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Public()
  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('featured') featured?: string,
  ) {
    return this.vendorsService.findAll({ status, search, featured });
  }

  @Public()
  @Get(':vendorId')
  findOne(@Param('vendorId') vendorId: string) {
    return this.vendorsService.findOne(vendorId);
  }

  @Public()
  @Get(':vendorId/products')
  getVendorProducts(
    @Param('vendorId') vendorId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
  ) {
    return this.vendorsService.getVendorProducts(vendorId, {
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
      sort,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('vendor')
  @Patch(':vendorId')
  @HttpCode(HttpStatus.OK)
  updateProfile(
    @Param('vendorId') vendorId: string,
    @CurrentUser() user: any,
    @Body() dto: UpdateVendorDto,
  ) {
    return this.vendorsService.updateProfile(vendorId, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':vendorId/approve')
  @HttpCode(HttpStatus.OK)
  approve(@Param('vendorId') vendorUserId: string, @CurrentUser() user: any) {
    return this.vendorsService.approve(vendorUserId, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':vendorId/suspend')
  @HttpCode(HttpStatus.OK)
  suspend(@Param('vendorId') vendorUserId: string, @CurrentUser() user: any) {
    return this.vendorsService.suspend(vendorUserId, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':vendorId/unsuspend')
  @HttpCode(HttpStatus.OK)
  unsuspend(@Param('vendorId') vendorUserId: string, @CurrentUser() user: any) {
    return this.vendorsService.unsuspend(vendorUserId, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('vendor')
  @Get('me/dashboard')
  getDashboard(@CurrentUser() user: any) {
    return this.vendorsService.getDashboard(user.vendorId);
  }
}
