-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('BUYER', 'VENDOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "VendorStatus" AS ENUM ('PENDING', 'APPROVED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "DisputeStatus" AS ENUM ('OPEN', 'UNDER_REVIEW', 'RESOLVED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "DisputeDecision" AS ENUM ('BUYER', 'VENDOR', 'REFUND', 'DISMISSED');

-- CreateEnum
CREATE TYPE "BannerPlacement" AS ENUM ('HOME_HERO_CAROUSEL', 'CATEGORY_SIDEBAR', 'FOOTER_PROMO', 'MOBILE_APP_SPLASH');

-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('ADD_PRODUCT', 'DELETE_PRODUCT', 'UPDATE_PRODUCT', 'UPDATE_STOCK', 'ADD_REVIEW', 'DELETE_REVIEW', 'APPROVE_VENDOR', 'SUSPEND_USER', 'UNSUSPEND_USER', 'RESOLVE_DISPUTE', 'ORDER_PLACED', 'ORDER_STATUS_CHANGE', 'WITHDRAWAL_REQUESTED', 'LOGIN', 'LOGOUT', 'PROFILE_UPDATE', 'SETTINGS_UPDATE', 'COMMISSION_UPDATE', 'ROLE_UPDATE', 'BANNER_CREATED', 'BANNER_UPDATED', 'BANNER_DELETED', 'CATEGORY_CREATED', 'CATEGORY_UPDATED', 'CATEGORY_DELETED');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'GBP', 'JPY', 'CAD');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED', 'FREE_SHIPPING');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'BUYER',
    "avatar" TEXT,
    "vendorId" TEXT,
    "status" "VendorStatus",
    "storeName" TEXT,
    "storeCategory" TEXT,
    "storeDescription" TEXT,
    "country" TEXT,
    "city" TEXT,
    "address" TEXT,
    "businessEmail" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "vendorName" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "brand" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewsCount" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,
    "images" TEXT[],
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT,
    "reviewer" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "displayId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PROCESSING',
    "total" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "shippingCost" DOUBLE PRECISION NOT NULL DEFAULT 15.0,
    "tax" DOUBLE PRECISION NOT NULL,
    "taxRate" DOUBLE PRECISION NOT NULL DEFAULT 0.08,
    "shippingDetails" JSONB NOT NULL,
    "paymentMethod" JSONB,
    "trackingNumber" TEXT,
    "carrier" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "vendorId" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispute" (
    "id" TEXT NOT NULL,
    "displayId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "claimantId" TEXT NOT NULL,
    "claimantName" TEXT NOT NULL,
    "vendorName" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,
    "description" TEXT,
    "status" "DisputeStatus" NOT NULL DEFAULT 'OPEN',
    "decision" "DisputeDecision",
    "decisionNotes" TEXT,
    "resolvedBy" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dispute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" TEXT,
    "adminName" TEXT NOT NULL,
    "action" "AuditAction" NOT NULL,
    "resource" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Success',
    "ipAddress" TEXT,
    "metadata" JSONB,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banner" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "placement" "BannerPlacement" NOT NULL DEFAULT 'HOME_HERO_CAROUSEL',
    "url" TEXT,
    "image" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminRole" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'shield_person',
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "permissions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminRoleAssignment" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "AdminRoleAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformSettings" (
    "id" TEXT NOT NULL DEFAULT 'platform',
    "platformName" TEXT NOT NULL DEFAULT 'Vendex',
    "supportEmail" TEXT NOT NULL DEFAULT 'support@vendex.com',
    "commissionRate" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "currency" "Currency" NOT NULL DEFAULT 'USD',
    "maintenanceMode" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommissionSettings" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommissionSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorPayout" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "commissionRate" DOUBLE PRECISION NOT NULL,
    "commissionAmount" DOUBLE PRECISION NOT NULL,
    "netAmount" DOUBLE PRECISION NOT NULL,
    "status" "PayoutStatus" NOT NULL DEFAULT 'PENDING',
    "periodStart" TIMESTAMP(3),
    "periodEnd" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorPayout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayoutMethod" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "accountHolderName" TEXT,
    "maskedAccount" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PayoutMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Withdrawal" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "fee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "netAmount" DOUBLE PRECISION NOT NULL,
    "payoutMethodId" TEXT NOT NULL,
    "status" "PayoutStatus" NOT NULL DEFAULT 'PROCESSING',
    "estimatedDelivery" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Withdrawal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "data" JSONB,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "DiscountType" NOT NULL DEFAULT 'PERCENTAGE',
    "value" DOUBLE PRECISION NOT NULL,
    "minPurchase" DOUBLE PRECISION,
    "maxUses" INTEGER,
    "maxUsesPerUser" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "vendorId" TEXT,
    "productIds" TEXT[],
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_vendorId_key" ON "User"("vendorId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_vendorId_idx" ON "User"("vendorId");

-- CreateIndex
CREATE INDEX "User_status_idx" ON "User"("status");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON "RefreshToken"("tokenHash");

-- CreateIndex
CREATE INDEX "RefreshToken_tokenHash_idx" ON "RefreshToken"("tokenHash");

-- CreateIndex
CREATE INDEX "RefreshToken_familyId_idx" ON "RefreshToken"("familyId");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_expiresAt_idx" ON "RefreshToken"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_parentId_idx" ON "Category"("parentId");

-- CreateIndex
CREATE INDEX "Category_slug_idx" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product"("name");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_vendorId_idx" ON "Product"("vendorId");

-- CreateIndex
CREATE INDEX "Product_price_idx" ON "Product"("price");

-- CreateIndex
CREATE INDEX "Product_rating_idx" ON "Product"("rating");

-- CreateIndex
CREATE INDEX "Product_isActive_idx" ON "Product"("isActive");

-- CreateIndex
CREATE INDEX "Review_productId_idx" ON "Review"("productId");

-- CreateIndex
CREATE INDEX "Review_score_idx" ON "Review"("score");

-- CreateIndex
CREATE UNIQUE INDEX "Review_productId_userId_key" ON "Review"("productId", "userId");

-- CreateIndex
CREATE INDEX "CartItem_userId_idx" ON "CartItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_userId_productId_key" ON "CartItem"("userId", "productId");

-- CreateIndex
CREATE INDEX "WishlistItem_userId_idx" ON "WishlistItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItem_userId_productId_key" ON "WishlistItem"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_displayId_key" ON "Order"("displayId");

-- CreateIndex
CREATE INDEX "Order_buyerId_idx" ON "Order"("buyerId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- CreateIndex
CREATE INDEX "Order_displayId_idx" ON "Order"("displayId");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_vendorId_idx" ON "OrderItem"("vendorId");

-- CreateIndex
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Dispute_displayId_key" ON "Dispute"("displayId");

-- CreateIndex
CREATE INDEX "Dispute_status_idx" ON "Dispute"("status");

-- CreateIndex
CREATE INDEX "Dispute_orderId_idx" ON "Dispute"("orderId");

-- CreateIndex
CREATE INDEX "Dispute_claimantId_idx" ON "Dispute"("claimantId");

-- CreateIndex
CREATE INDEX "AuditLog_timestamp_idx" ON "AuditLog"("timestamp");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_adminId_idx" ON "AuditLog"("adminId");

-- CreateIndex
CREATE INDEX "AuditLog_adminName_idx" ON "AuditLog"("adminName");

-- CreateIndex
CREATE INDEX "Banner_active_idx" ON "Banner"("active");

-- CreateIndex
CREATE INDEX "Banner_placement_idx" ON "Banner"("placement");

-- CreateIndex
CREATE UNIQUE INDEX "AdminRole_name_key" ON "AdminRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AdminRoleAssignment_adminId_roleId_key" ON "AdminRoleAssignment"("adminId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "CommissionSettings_categoryId_key" ON "CommissionSettings"("categoryId");

-- CreateIndex
CREATE INDEX "VendorPayout_vendorId_idx" ON "VendorPayout"("vendorId");

-- CreateIndex
CREATE INDEX "VendorPayout_status_idx" ON "VendorPayout"("status");

-- CreateIndex
CREATE INDEX "PayoutMethod_vendorId_idx" ON "PayoutMethod"("vendorId");

-- CreateIndex
CREATE INDEX "Withdrawal_vendorId_idx" ON "Withdrawal"("vendorId");

-- CreateIndex
CREATE INDEX "Withdrawal_status_idx" ON "Withdrawal"("status");

-- CreateIndex
CREATE INDEX "Notification_userId_isRead_idx" ON "Notification"("userId", "isRead");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "PasswordResetToken"("tokenHash");

-- CreateIndex
CREATE INDEX "PasswordResetToken_tokenHash_idx" ON "PasswordResetToken"("tokenHash");

-- CreateIndex
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");

-- CreateIndex
CREATE INDEX "Coupon_code_idx" ON "Coupon"("code");

-- CreateIndex
CREATE INDEX "Coupon_isActive_idx" ON "Coupon"("isActive");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "User"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_claimantId_fkey" FOREIGN KEY ("claimantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminRoleAssignment" ADD CONSTRAINT "AdminRoleAssignment_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminRoleAssignment" ADD CONSTRAINT "AdminRoleAssignment_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "AdminRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionSettings" ADD CONSTRAINT "CommissionSettings_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorPayout" ADD CONSTRAINT "VendorPayout_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "User"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayoutMethod" ADD CONSTRAINT "PayoutMethod_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "User"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Withdrawal" ADD CONSTRAINT "Withdrawal_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "User"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Withdrawal" ADD CONSTRAINT "Withdrawal_payoutMethodId_fkey" FOREIGN KEY ("payoutMethodId") REFERENCES "PayoutMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

