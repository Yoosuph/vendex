import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service.js';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { JwtAuthGuard, RolesGuard } from '../common/guards/index.js';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('products/:productId/reviews')
  findByProduct(
    @Param('productId') productId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
  ) {
    return this.reviewsService.findByProduct(productId, {
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
      sort,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('buyer', 'admin')
  @Post('products/:productId/reviews')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('productId') productId: string,
    @CurrentUser() user: any,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewsService.create(productId, user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reviews/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() dto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(id, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('reviews/:id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.reviewsService.remove(id, user.sub, user.role);
  }
}
