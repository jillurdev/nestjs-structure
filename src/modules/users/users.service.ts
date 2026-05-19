import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from '@/shared/mail/mail.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  async findAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,
      },
    });
  }

  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createUser(dto: CreateUserDto) {

    const existingEmail = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingEmail) throw new ConflictException('Email already in use');

    const existingPhone = await this.prisma.user.findFirst({
      where: { phone: dto.phone },
    });

    if (existingPhone)
      throw new ConflictException('Phone number already in use');

    const password = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    return user;
  }

  // async createUser(dto: CreateUserDto) {
  //   console.log('🚀 ~ UsersService ~ createUser ~ dto:', dto);

  //   const existing = await this.prisma.user.findUnique({
  //     where: { email: dto.email },
  //   });
  //   if (existing) throw new ConflictException('Email already in use');

  //   const password = await bcrypt.hash(dto.password, 10);

  //   const otp = Math.floor(100000 + Math.random() * 900000).toString();
  //   const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  //   const user = await this.prisma.user.create({
  //     data: {
  //       name: dto.name,
  //       email: dto.email,
  //       phone: dto.phone,
  //       password,
  //       emailVerifyToken: otp,
  //       emailVerifyExpiry: otpExpiry,
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //       email: true,
  //       role: true,
  //       status: true,
  //       createdAt: true,
  //     },
  //   });

  //   await this.mail.sendVerificationEmail(dto.email, dto.name, otp);

  //   return {
  //     ...user,
  //     message: 'Verification code sent to your email',
  //   };
  // }

  async verifyEmail(dto: VerifyEmailDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new NotFoundException('User not found');
    if (user.status === 'ACTIVE')
      throw new ConflictException('Email already verified');

    if (!user.emailVerifyToken || user.emailVerifyToken !== dto.otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (!user.emailVerifyExpiry || user.emailVerifyExpiry < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    await this.prisma.user.update({
      where: { email: dto.email },
      data: {
        status: 'ACTIVE',
        emailVerifyToken: null,
        emailVerifyExpiry: null,
      },
    });

    return { message: 'Email verified successfully' };
  }

  async resendOtp(dto: ResendOtpDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new NotFoundException('User not found');
    if (user.status === 'ACTIVE')
      throw new ConflictException('Email already verified');

    if (user.emailVerifyExpiry) {
      const cooldown = new Date(
        user.emailVerifyExpiry.getTime() - 13 * 60 * 1000,
      );
      if (new Date() < cooldown) {
        throw new BadRequestException(
          'Please wait 2 minutes before requesting a new OTP',
        );
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.user.update({
      where: { email: dto.email },
      data: {
        emailVerifyToken: otp,
        emailVerifyExpiry: otpExpiry,
      },
    });

    await this.mail.sendVerificationEmail(dto.email, user.name, otp);

    return { message: 'OTP resent successfully' };
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    await this.findUserById(id);

    const data: any = {};
    if (dto.name) data.name = dto.name;
    if (dto.email) data.email = dto.email;
    if (dto.phone) data.phone = dto.phone;
    if (dto.password) data.password = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        updatedAt: true,
      },
    });
  }

  async deleteUser(id: string) {
    await this.findUserById(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }
}
