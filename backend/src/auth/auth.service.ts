import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { PrismaService } from '../common/prisma/prisma.service.js';
import {
  ForgotPasswordDto,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  ResetPasswordDto,
} from './dto/auth.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private hashToken(rawToken: string): string {
    return crypto.createHash('sha256').update(rawToken).digest('hex');
  }

  private generateTokens(user: any, familyId?: string) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      vendorId: user.vendorId,
      status: user.status,
      name: user.name,
    };

    const rawRefreshToken = crypto.randomBytes(40).toString('hex');
    const tokenFamilyId = familyId || crypto.randomUUID();

    return {
      payload,
      rawRefreshToken,
      tokenFamilyId,
    };
  }

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();
    const exists = await this.prisma.user.findUnique({
      where: { email },
    });
    if (exists) {
      throw new ConflictException('Email already registered');
    }

    const roleString = (dto.role || 'BUYER').toUpperCase();
    const role = roleString === 'VENDOR' ? 'VENDOR' : 'BUYER';
    const status = role === 'VENDOR' ? 'PENDING' : null;

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name.trim(),
        email,
        passwordHash,
        role: role as any,
        status: status as any,
        storeName: dto.storeName?.trim() || null,
        storeCategory: dto.storeCategory?.trim() || null,
        storeDescription: dto.storeDescription?.trim() || null,
        country: dto.country?.trim() || null,
        city: dto.city?.trim() || null,
        businessEmail: dto.businessEmail?.trim().toLowerCase() || null,
      },
    });

    const { payload, rawRefreshToken, tokenFamilyId } =
      this.generateTokens(user);
    const accessToken = await this.jwt.signAsync(payload);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        tokenHash: this.hashToken(rawRefreshToken),
        userId: user.id,
        familyId: tokenFamilyId,
        expiresAt,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        adminId: user.id,
        adminName: user.name,
        action: 'LOGIN',
        resource: `User registered: ${user.email} (${user.role})`,
        status: 'Success',
      },
    });

    const { passwordHash: _, ...userInfo } = user;
    return {
      accessToken,
      refreshToken: rawRefreshToken,
      user: userInfo,
    };
  }

  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status === 'SUSPENDED') {
      throw new UnauthorizedException(
        'Account has been suspended. Please contact support.',
      );
    }

    const { payload, rawRefreshToken, tokenFamilyId } =
      this.generateTokens(user);
    const accessToken = await this.jwt.signAsync(payload);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        tokenHash: this.hashToken(rawRefreshToken),
        userId: user.id,
        familyId: tokenFamilyId,
        expiresAt,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        adminId: user.id,
        adminName: user.name,
        action: 'LOGIN',
        resource: `User login: ${user.email}`,
        status: 'Success',
      },
    });

    const { passwordHash: _, ...userInfo } = user;
    return {
      accessToken,
      refreshToken: rawRefreshToken,
      user: userInfo,
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    const tokenHash = this.hashToken(dto.refreshToken);
    const existingToken = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!existingToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Reuse detection
    if (existingToken.revokedAt) {
      // Token reuse compromised! Invalidate all tokens in family
      await this.prisma.refreshToken.updateMany({
        where: { familyId: existingToken.familyId },
        data: { revokedAt: new Date() },
      });
      throw new UnauthorizedException(
        'Token reuse detected. Session invalidated.',
      );
    }

    if (existingToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = existingToken.user;
    if (user.status === 'SUSPENDED') {
      throw new UnauthorizedException('Account has been suspended');
    }

    // Revoke old token
    await this.prisma.refreshToken.update({
      where: { id: existingToken.id },
      data: { revokedAt: new Date() },
    });

    // Generate new token in same family
    const { payload, rawRefreshToken, tokenFamilyId } = this.generateTokens(
      user,
      existingToken.familyId,
    );
    const accessToken = await this.jwt.signAsync(payload);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        tokenHash: this.hashToken(rawRefreshToken),
        userId: user.id,
        familyId: tokenFamilyId,
        expiresAt,
      },
    });

    const { passwordHash: _, ...userInfo } = user;
    return {
      accessToken,
      refreshToken: rawRefreshToken,
      user: userInfo,
    };
  }

  async logout(userId?: string, rawRefreshToken?: string) {
    if (rawRefreshToken) {
      const tokenHash = this.hashToken(rawRefreshToken);
      await this.prisma.refreshToken.updateMany({
        where: { tokenHash },
        data: { revokedAt: new Date() },
      });
    } else if (userId) {
      await this.prisma.refreshToken.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
    }
    return { message: 'Logged out successfully' };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) {
      const rawToken = crypto.randomBytes(32).toString('hex');
      const tokenHash = this.hashToken(rawToken);

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);

      await this.prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt,
        },
      });

      return {
        message: 'If the email exists, a password reset link has been sent.',
        resetToken: rawToken,
      };
    }

    return {
      message: 'If the email exists, a password reset link has been sent.',
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const tokenHash = this.hashToken(dto.token);
    const resetRecord = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (
      !resetRecord ||
      resetRecord.isUsed ||
      resetRecord.expiresAt < new Date()
    ) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, 12);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: resetRecord.userId },
        data: { passwordHash },
      }),
      this.prisma.passwordResetToken.update({
        where: { id: resetRecord.id },
        data: { isUsed: true },
      }),
      this.prisma.refreshToken.updateMany({
        where: { userId: resetRecord.userId },
        data: { revokedAt: new Date() },
      }),
    ]);

    return { message: 'Password reset successfully' };
  }
}

