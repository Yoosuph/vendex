import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { CartService } from "./cart.service.js";
import { AddCartItemDto, UpdateCartItemDto } from "./dto/cart.dto.js";
import { CurrentUser } from "../common/decorators/current-user.decorator.js";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard.js";

@Controller("cart")
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@CurrentUser() user: any) {
    return this.cartService.getCart(user.sub);
  }

  @Post("items")
  @HttpCode(HttpStatus.CREATED)
  addItem(@CurrentUser() user: any, @Body() dto: AddCartItemDto) {
    return this.cartService.addItem(user.sub, dto);
  }

  @Patch("items/:productId")
  @HttpCode(HttpStatus.OK)
  updateItem(
    @CurrentUser() user: any,
    @Param("productId") productId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(user.sub, productId, dto);
  }

  @Delete("items/:productId")
  removeItem(
    @CurrentUser() user: any,
    @Param("productId") productId: string,
  ) {
    return this.cartService.removeItem(user.sub, productId);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  clearCart(@CurrentUser() user: any) {
    return this.cartService.clearCart(user.sub);
  }
}
