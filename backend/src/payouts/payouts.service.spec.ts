import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { PayoutsService } from './payouts.service.js';

describe('PayoutsService Balance & Overdraft Verification', () => {
  let payoutsService: PayoutsService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue({ name: 'Vendor Owner' }),
      },
      orderItem: {
        findMany: jest.fn(),
      },
      vendorPayout: {
        findMany: jest.fn(),
        create: jest.fn(),
      },
      payoutMethod: {
        findFirst: jest.fn(),
      },
      platformSettings: {
        findUnique: jest.fn(),
      },
      auditLog: {
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayoutsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    payoutsService = module.get<PayoutsService>(PayoutsService);
  });

  describe('requestPayout & Balance Enforcement', () => {
    it('should block withdrawal exceeding available balance', async () => {
      // Delivered order with $100 earned
      prisma.orderItem.findMany.mockResolvedValue([
        { price: 50, quantity: 2 },
      ]);
      // Prior completed payout of $60 -> Available = $40
      prisma.vendorPayout.findMany.mockResolvedValue([
        { amount: 60 },
      ]);
      prisma.payoutMethod.findFirst.mockResolvedValue({
        id: 'pm-1',
        vendorId: 'vendor-A',
      });

      // Attempting to withdraw $50 when only $40 is available
      await expect(
        payoutsService.requestPayout('u1', 'vendor-A', {
          amount: 50,
          methodId: 'pm-1',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create payout request if amount is within available balance', async () => {
      prisma.orderItem.findMany.mockResolvedValue([
        { price: 100, quantity: 1 },
      ]);
      prisma.vendorPayout.findMany.mockResolvedValue([]);
      prisma.payoutMethod.findFirst.mockResolvedValue({
        id: 'pm-1',
        vendorId: 'vendor-A',
      });
      prisma.platformSettings.findUnique.mockResolvedValue({
        commissionRate: 10,
      });
      prisma.vendorPayout.create.mockImplementation(({ data }: any) => ({
        id: 'p-1',
        ...data,
        status: 'PENDING',
      }));

      const result = await payoutsService.requestPayout('u1', 'vendor-A', {
        amount: 50,
        methodId: 'pm-1',
      });

      expect(result.amount).toBe(50);
      expect(result.commissionAmount).toBe(5); // 10% commission
      expect(result.netAmount).toBe(45);
      expect(result.status).toBe('PENDING');
    });
  });
});

