import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private pool: Pool;

  constructor() {
    const rawUrl =
      process.env.DATABASE_URL_UNPOOLED ||
      process.env.DATABASE_URL ||
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.POSTGRES_PRISMA_URL ||
      process.env.POSTGRES_URL ||
      '';

    // Strip channel_binding=require if present for pure node-postgres compatibility
    const connectionString = rawUrl
      .replace(/([?&])channel_binding=require(&?)/g, '$1')
      .replace(/[?&]$/, '');

    const pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });
    this.pool = pool;
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Connected to PostgreSQL via PrismaPg adapter');
    } catch (err) {
      this.logger.error('Error connecting to database in onModuleInit', err);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}
