import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { UpdateProfileDto } from "./dto/update-profile.dto.js";
import { ChangePasswordDto } from "./dto/change-password.dto.js";
import { CurrentUser } from "../common/decorators/current-user.decorator.js";
import { Public } from "../common/decorators/public.decorator.js";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard.js";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  getMe(@CurrentUser() user: any) {
    return this.usersService.getProfile(user.sub);
  }

  @Patch("me")
  @HttpCode(HttpStatus.OK)
  updateMe(@CurrentUser() user: any, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(user.sub, dto);
  }

  @Patch("me/password")
  @HttpCode(HttpStatus.OK)
  changePassword(@CurrentUser() user: any, @Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(user.sub, dto);
  }

  @Public()
  @Get(":id")
  getPublicProfile(@Param("id") id: string) {
    return this.usersService.getPublicProfile(id);
  }
}
