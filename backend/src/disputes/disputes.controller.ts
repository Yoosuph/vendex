import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DisputesService } from './disputes.service.js';
import { CreateDisputeDto, ResolveDisputeDto } from './dto/dispute.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { JwtAuthGuard, RolesGuard } from '../common/guards/index.js';

@Controller('disputes')
@UseGuards(JwtAuthGuard)
export class DisputesController {
  constructor(private readonly disputesService: DisputesService) {}

  @Get()
  findAll(
    @CurrentUser() user: any,
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.disputesService.findAll(user.sub, user.role, user.vendorId, {
      status,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.disputesService.findOne(id, user);
  }

  @UseGuards(RolesGuard)
  @Roles('buyer')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@CurrentUser() user: any, @Body() dto: CreateDisputeDto) {
    return this.disputesService.create(user.sub, user.name, dto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id/resolve')
  @HttpCode(HttpStatus.OK)
  resolve(
    @Param('id') id: string,
    @Body() dto: ResolveDisputeDto,
    @CurrentUser() user: any,
  ) {
    return this.disputesService.resolve(id, dto, user);
  }
}
