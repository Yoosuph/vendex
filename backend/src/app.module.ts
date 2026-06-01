import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { PrismaModule } from "./common/prisma/prisma.module.js";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard.js";
import { RolesGuard } from "./common/guards/roles.guard.js";
import { JwtStrategy } from "./common/strategies/jwt.strategy.js";
import { UsersModule } from "./users/users.module.js";
import { ProductsModule } from "./products/products.module.js";
import { CategoriesModule } from "./categories/categories.module.js";
import { CartModule } from "./cart/cart.module.js";
import { OrdersModule } from "./orders/orders.module.js";
import { VendorsModule } from "./vendors/vendors.module.js";
import { PayoutsModule } from "./payouts/payouts.module.js";
import { WishlistModule } from "./wishlist/wishlist.module.js";
import { DisputesModule } from "./disputes/disputes.module.js";
import { AdminModule } from "./admin/admin.module.js";
import { ReviewsModule } from "./reviews/reviews.module.js";
import { AuditModule } from "./audit/audit.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET || "dev-access-secret",
      signOptions: { expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN as any) || "15m" },
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CartModule,
    OrdersModule,
    VendorsModule,
    PayoutsModule,
    WishlistModule,
    DisputesModule,
    AdminModule,
    ReviewsModule,
    AuditModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
