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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../../database/prisma/prisma.service");
const config_1 = require("../../config");
const app_messages_1 = require("../../common/AppMessages/app.messages");
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async login(dto, res) {
        const user = await this.prisma.findUserByPhone(dto.phone);
        if (!user)
            throw new common_1.UnauthorizedException(app_messages_1.AppMessages.auth.invalidCredentials);
        const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);
        if (!passwordMatch)
            throw new common_1.UnauthorizedException(app_messages_1.AppMessages.auth.invalidCredentials);
        if (!user.isActive)
            throw new common_1.ForbiddenException(app_messages_1.AppMessages.auth.accountDeactivated);
        if (user.isBanned)
            throw new common_1.ForbiddenException(app_messages_1.AppMessages.auth.accountBanned(user.banReason ?? ""));
        const payload = { sub: user.id, phone: user.phone, role: user.role };
        const accessToken = this.jwt.sign(payload, {
            secret: config_1.configs.jwt.secret,
            expiresIn: config_1.configs.jwt.expiresIn,
        });
        const refreshToken = this.jwt.sign(payload, {
            secret: config_1.configs.jwt.refreshSecret,
            expiresIn: config_1.configs.jwt.refreshExpiresIn,
        });
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                refreshToken,
                lastLoginAt: new Date(),
                ...(dto.deviceId && { deviceId: dto.deviceId }),
            },
        });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: config_1.configs.app.isProduction,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: config_1.configs.app.isProduction,
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return {
            accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                referralCode: user.referralCode,
                subscriptionType: user.subscriptionType,
                balance: user.balance,
                totalEarned: user.totalEarned,
                avatarUrl: user.avatarUrl,
            },
        };
    }
    async logout(userId, res) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { refreshToken: null },
        });
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return { message: app_messages_1.AppMessages.auth.logoutSuccess };
    }
    async refreshToken(token, res) {
        const user = await this.prisma.user.findFirst({
            where: { refreshToken: token },
        });
        if (!user || !user.refreshToken)
            throw new common_1.UnauthorizedException(app_messages_1.AppMessages.auth.tokenInvalid);
        if (!user.isActive || user.isBanned)
            throw new common_1.ForbiddenException(app_messages_1.AppMessages.auth.accountDeactivated);
        const payload = { sub: user.id, role: user.role };
        const newAccessToken = this.jwt.sign(payload, {
            secret: config_1.configs.jwt.secret,
            expiresIn: config_1.configs.jwt.expiresIn,
        });
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: config_1.configs.app.isProduction,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return { accessToken: newAccessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map