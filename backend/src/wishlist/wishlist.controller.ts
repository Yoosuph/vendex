import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { WishlistService } from "./wishlist.service.js";
import { AddWishlistDto } from "./dto/wishlist.dto.js";
import { CurrentUser } from "../common/decorators/current-user.decorator.js";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard.js";

@Controller("wishlist")
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  getWishlist(@CurrentUser() user: any) {
    return this.wishlistService.getWishlist(user.sub);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addItem(@CurrentUser() user: any, @Body() dto: AddWishlistDto) {
    return this.wishlistService.addItem(user.sub, dto.productId);
  }

  @Delete(":productId")
  removeItem(@CurrentUser() user: any, @Param("productId") productId: string) {
    return this.wishlistService.removeItem(user.sub, productId);
  }
}
