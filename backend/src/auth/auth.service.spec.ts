import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { AuthService } from './auth.service.js';

describe('AuthService Bug Fixes & Security Verification', () => {
  let authService: AuthService;
  let prisma: any;
  let jwt: any;

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      refreshToken: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
      },
      auditLog: {
        create: jest.fn(),
      },
      $transaction: jest.fn((cb) => (typeof cb === 'function' ? cb(prisma) : Promise.all(cb))),
    };

    jwt = {
      signAsync: jest.fn().mockResolvedValue('mock-access-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('Role Escalation Prevention on Register', () => {
    it('should never allow registering as ADMIN and force role to BUYER or VENDOR', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockImplementation(({ data }: any) => ({
        id: 'u1',
        email: data.email,
        name: data.name,
        role: data.role,
        status: data.status,
      }));

      // Attacker attempts to register with role = "ADMIN"
      const result = await authService.register({
        name: 'Attacker',
        email: 'attacker@test.com',
        password: 'password123',
        role: 'ADMIN' as any,
      });

      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            role: 'BUYER', // Escalation to ADMIN blocked!
          }),
        }),
      );
      expect(result.accessToken).toBe('mock-access-token');
      expect(result.refreshToken).toBeDefined();
    });

    it('should register vendor with PENDING status', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockImplementation(({ data }: any) => ({
        id: 'u2',
        email: data.email,
        name: data.name,
        role: data.role,
        status: data.status,
      }));

      await authService.register({
        name: 'New Vendor',
        email: 'vendor@test.com',
        password: 'password123',
        role: 'VENDOR' as any,
        storeName: 'Vendor Store',
      });

      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            role: 'VENDOR',
            status: 'PENDING',
            storeName: 'Vendor Store',
          }),
        }),
      );
    });
  });

  describe('Suspended Account Rejection on Login', () => {
    it('should throw UnauthorizedException if user account is SUSPENDED', async () => {
      const passwordHash = await bcrypt.hash('password123', 10);
      prisma.user.findUnique.mockResolvedValue({
        id: 'u3',
        email: 'banned@test.com',
        passwordHash,
        status: 'SUSPENDED',
      });

      await expect(
        authService.login({
          email: 'banned@test.com',
          password: 'password123',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('Refresh Token Rotation & Reuse Detection', () => {
    it('should invalidate family on revoked token reuse', async () => {
      prisma.refreshToken.findUnique.mockResolvedValue({
        id: 'rt-old',
        familyId: 'fam-1',
        revokedAt: new Date(Date.now() - 10000), // already revoked!
        expiresAt: new Date(Date.now() + 100000),
        user: { id: 'u1', status: 'APPROVED' },
      });

      await expect(
        authService.refreshToken({ refreshToken: 'stolen-revoked-token' }),
      ).rejects.toThrow(UnauthorizedException);

      expect(prisma.refreshToken.updateMany).toHaveBeenCalledWith({
        where: { familyId: 'fam-1' },
        data: { revokedAt: expect.any(Date) },
      });
    });
  });
});
