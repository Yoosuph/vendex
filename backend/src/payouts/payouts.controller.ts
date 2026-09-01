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
} from '@nestjs/common';
import { PayoutsService } from './payouts.service.js';
import {
  RequestPayoutDto,
  ProcessPayoutDto,
  CreatePayoutMethodDto,
  UpdatePayoutMethodDto,
} from './dto/payout.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { JwtAuthGuard, RolesGuard } from '../common/guards/index.js';

@Controller('payouts')
@UseGuards(JwtAuthGuard)
export class PayoutsController {
  constructor(private readonly payoutsService: PayoutsService) {}

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.payoutsService.findAll(user.sub, user.role, user.vendorId);
  }

  @UseGuards(RolesGuard)
  @Roles('vendor')
  @Post('request')
  @HttpCode(HttpStatus.CREATED)
  requestPayout(@CurrentUser() user: any, @Body() dto: RequestPayoutDto) {
    return this.payoutsService.requestPayout(user.sub, user.vendorId, dto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id/process')
  @HttpCode(HttpStatus.OK)
  processPayout(@Param('id') id: string, @Body() dto: ProcessPayoutDto) {
    return this.payoutsService.processPayout(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles('vendor')
  @Get('methods')
  getMethods(@CurrentUser() user: any) {
    return this.payoutsService.getMethods(user.sub, user.vendorId);
  }

  @UseGuards(RolesGuard)
  @Roles('vendor')
  @Post('methods')
  @HttpCode(HttpStatus.CREATED)
  addMethod(@CurrentUser() user: any, @Body() dto: CreatePayoutMethodDto) {
    return this.payoutsService.addMethod(user.sub, user.vendorId, dto);
  }

  @UseGuards(RolesGuard)
  @Roles('vendor')
  @Patch('methods/:id')
  @HttpCode(HttpStatus.OK)
  updateMethod(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdatePayoutMethodDto,
  ) {
    return this.payoutsService.updateMethod(user.sub, user.vendorId, id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles('vendor')
  @Delete('methods/:id')
  deleteMethod(@CurrentUser() user: any, @Param('id') id: string) {
    return this.payoutsService.deleteMethod(user.sub, user.vendorId, id);
  }
}
