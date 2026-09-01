import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { ProductsService } from './products.service.js';

describe('ProductsService Bug Fixes Verification', () => {
  let productsService: ProductsService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      product: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('updateStock IDOR check', () => {
    it('should throw ForbiddenException if a vendor tries to update another vendor stock', async () => {
      prisma.product.findUnique.mockResolvedValue({
        id: 'prod-1',
        vendorId: 'vendor-A',
        stock: 10,
      });

      // Vendor B attempts to update Vendor A's product stock
      const user = { id: 'u2', role: 'VENDOR', vendorId: 'vendor-B' };

      await expect(
        productsService.updateStock('prod-1', 50, user),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should allow stock update if user is the product vendor', async () => {
      prisma.product.findUnique.mockResolvedValue({
        id: 'prod-1',
        vendorId: 'vendor-A',
        stock: 10,
      });
      prisma.product.update.mockResolvedValue({
        id: 'prod-1',
        vendorId: 'vendor-A',
        stock: 50,
      });

      const user = { id: 'u1', role: 'VENDOR', vendorId: 'vendor-A' };
      const result = await productsService.updateStock('prod-1', { stock: 50 }, user);

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 'prod-1' },
        data: { stock: 50 },
      });
      expect(result.stock).toBe(50);
    });
  });

  describe('remove Soft Delete', () => {
    it('should perform soft deletion (isActive: false) instead of hard delete', async () => {
      prisma.product.findUnique.mockResolvedValue({
        id: 'prod-1',
        vendorId: 'vendor-A',
        isActive: true,
      });
      prisma.product.update.mockResolvedValue({
        id: 'prod-1',
        isActive: false,
      });

      const user = { id: 'u1', role: 'VENDOR', vendorId: 'vendor-A' };
      const res = await productsService.remove('prod-1', user);

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 'prod-1' },
        data: { isActive: false },
      });
      expect(res.message).toContain('deleted');
    });
  });
});
