"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const mail_service_1 = require("../../shared/mail/mail.service");
let UsersService = class UsersService {
    constructor(prisma, mail) {
        this.prisma = prisma;
        this.mail = mail;
    }
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
    async findUserById(id) {
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
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async createUser(dto) {
        const existingEmail = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingEmail)
            throw new common_1.ConflictException('Email already in use');
        const existingPhone = await this.prisma.user.findFirst({
            where: { phone: dto.phone },
        });
        if (existingPhone)
            throw new common_1.ConflictException('Phone number already in use');
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
    async verifyEmail(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.status === 'ACTIVE')
            throw new common_1.ConflictException('Email already verified');
        if (!user.emailVerifyToken || user.emailVerifyToken !== dto.otp) {
            throw new common_1.BadRequestException('Invalid OTP');
        }
        if (!user.emailVerifyExpiry || user.emailVerifyExpiry < new Date()) {
            throw new common_1.BadRequestException('OTP expired');
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
    async resendOtp(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.status === 'ACTIVE')
            throw new common_1.ConflictException('Email already verified');
        if (user.emailVerifyExpiry) {
            const cooldown = new Date(user.emailVerifyExpiry.getTime() - 13 * 60 * 1000);
            if (new Date() < cooldown) {
                throw new common_1.BadRequestException('Please wait 2 minutes before requesting a new OTP');
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
    async updateUser(id, dto) {
        await this.findUserById(id);
        const data = {};
        if (dto.name)
            data.name = dto.name;
        if (dto.email)
            data.email = dto.email;
        if (dto.phone)
            data.phone = dto.phone;
        if (dto.password)
            data.password = await bcrypt.hash(dto.password, 10);
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
    async deleteUser(id) {
        await this.findUserById(id);
        await this.prisma.user.delete({ where: { id } });
        return { message: 'User deleted successfully' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService])
], UsersService);
//# sourceMappingURL=users.service.js.map