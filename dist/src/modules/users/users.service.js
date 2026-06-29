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
const app_messages_1 = require("../../common/AppMessages/app.messages");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const referral_service_1 = require("../referral/referral.service");
let UsersService = class UsersService {
    constructor(prisma, referralService) {
        this.prisma = prisma;
        this.referralService = referralService;
    }
    async generateReferralCode() {
        const random = Math.floor(100000 + Math.random() * 900000).toString();
        const code = `TN-${random}`;
        const existing = await this.prisma.user.findFirst({
            where: { referralCode: code },
        });
        if (existing)
            return this.generateReferralCode();
        return code;
    }
    async findAllUsers() {
        return this.prisma.user.findMany({
            where: { role: roles_decorator_1.Role.USER },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                isActive: true,
                isBanned: true,
                subscriptionType: true,
                balance: true,
                totalEarned: true,
                totalWithdrawn: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
    async findUserById(id) {
        return this.prisma.findUserByIdOrThrow(id);
    }
    async findUserByPhone(phone) {
        return this.prisma.findUserByPhone(phone);
    }
    async createUser(dto) {
        if (await this.prisma.userExistsByPhone(dto.phone))
            throw new common_1.ConflictException(app_messages_1.AppMessages.user.phoneExists);
        if (dto.email && (await this.prisma.userExistsByEmail(dto.email)))
            throw new common_1.ConflictException(app_messages_1.AppMessages.user.emailExists);
        if (dto.deviceId) {
            const count = await this.prisma.userCountByDeviceId(dto.deviceId);
            if (count >= 2)
                throw new common_1.BadRequestException(app_messages_1.AppMessages.user.deviceLimit);
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const referralCode = await this.generateReferralCode();
        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                phone: dto.phone,
                passwordHash,
                referralCode,
                ...(dto.email && { email: dto.email }),
                ...(dto.deviceId && { deviceId: dto.deviceId }),
            },
            select: {
                id: true,
                name: true,
                email: true,
                referralCode: true,
                phone: true,
                role: true,
                subscriptionType: true,
                balance: true,
                createdAt: true,
            },
        });
        if (dto.referralCode) {
            try {
                await this.referralService.applyReferral(user.id, dto.referralCode);
            }
            catch (e) {
            }
        }
        return user;
    }
    async saveFcmToken(userId, fcmToken) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { fcmToken },
            select: { id: true },
        });
    }
    async updateUser(id, dto) {
        await this.prisma.findUserByIdOrThrow(id);
        const data = {};
        if (dto.name)
            data.name = dto.name;
        if (dto.email)
            data.email = dto.email;
        if (dto.phone)
            data.phone = dto.phone;
        if (dto.password)
            data.passwordHash = await bcrypt.hash(dto.password, 10);
        if (dto.avatarUrl)
            data.avatarUrl = dto.avatarUrl;
        return this.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                subscriptionType: true,
                avatarUrl: true,
                updatedAt: true,
            },
        });
    }
    async changePassword(id, currentPassword, newPassword) {
        if (currentPassword === newPassword) {
            throw new common_1.BadRequestException(app_messages_1.AppMessages.user.passwordSameAsOld);
        }
        const user = await this.prisma.findUserByIdOrThrow(id);
        const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isMatch)
            throw new common_1.BadRequestException(app_messages_1.AppMessages.user.incorrectPassword);
        await this.prisma.user.update({
            where: { id },
            data: { passwordHash: await bcrypt.hash(newPassword, 10) },
        });
    }
    async banUser(id, reason, adminId) {
        await this.prisma.findUserByIdOrThrow(id);
        return this.prisma.user.update({
            where: { id },
            data: {
                isBanned: true,
                banReason: reason,
                bannedAt: new Date(),
                bannedBy: adminId,
            },
            select: { id: true, isBanned: true, banReason: true },
        });
    }
    async unbanUser(id) {
        await this.prisma.findUserByIdOrThrow(id);
        return this.prisma.user.update({
            where: { id },
            data: {
                isBanned: false,
                banReason: null,
                bannedAt: null,
                bannedBy: null,
            },
            select: { id: true, isBanned: true },
        });
    }
    async getUserStats(id) {
        const user = await this.prisma.findUserByIdOrThrow(id);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayRecord = await this.prisma.dailyAdLimit.findUnique({
            where: { userId_date: { userId: id, date: today } },
        });
        return {
            balance: user.balance,
            totalEarned: user.totalEarned,
            totalWithdrawn: user.totalWithdrawn,
            subscriptionType: user.subscriptionType,
            todayWatchCount: todayRecord?.watchCount ?? 0,
            todayEarned: todayRecord?.earned ?? 0,
        };
    }
    async deleteUser(id) {
        await this.prisma.findUserByIdOrThrow(id);
        await this.prisma.user.delete({ where: { id } });
        return { message: app_messages_1.AppMessages.user.deleted };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        referral_service_1.ReferralService])
], UsersService);
//# sourceMappingURL=users.service.js.map