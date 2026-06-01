import {
  Controller,
  Get,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuditService } from "./audit.service.js";
import { Roles } from "../common/decorators/roles.decorator.js";
import { JwtAuthGuard, RolesGuard } from "../common/guards/index.js";

@Controller("audit-logs")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("admin")
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  findAll(
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("action") action?: string,
    @Query("search") search?: string,
    @Query("sort") sort?: string,
  ) {
    return this.auditService.findAll({
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
      action,
      search,
      sort,
    });
  }
}
