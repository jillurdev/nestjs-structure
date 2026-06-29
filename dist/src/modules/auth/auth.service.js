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
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../../config");
const client_1 = require("@prisma/client");
const app_messages_1 = require("../../common/AppMessages/app.messages");
const device_util_1 = require("../../common/utils/device.util");
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async generateTokens(payload) {
        const accessToken = await this.jwt.signAsync(payload, {
            secret: config_1.configs.jwt.secret,
            expiresIn: config_1.configs.jwt.expiresIn,
        });
        const refreshToken = await this.jwt.signAsync(payload, {
            secret: config_1.configs.jwt.refreshSecret,
            expiresIn: config_1.configs.jwt.refreshExpiresIn,
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    setAuthCookies(res, accessToken, refreshToken) {
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: config_1.configs.app.isProduction,
            sameSite: "lax",
            maxAge: 1000 * 60 * 15,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: config_1.configs.app.isProduction,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });
    }
    async generateUniqueHandle(fullName) {
        const base = fullName
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "")
            .substring(0, 20);
        let handle = base || "user";
        while (await this.prisma.userExistsByHandle(handle)) {
            handle = `${base}${crypto.randomInt(1000, 9999)}`;
        }
        return handle;
    }
    async generateVirtualAccountNumber() {
        let accountNumber;
        do {
            accountNumber = `VB${crypto.randomInt(1000000000, 9999999999)}`;
        } while (await this.prisma.account.findUnique({
            where: {
                virtualAccountNumber: accountNumber,
            },
        }));
        return accountNumber;
    }
    validateUserStatus(user) {
        switch (user.status) {
            case client_1.UserStatus.ACTIVE:
            case client_1.UserStatus.PENDING_VERIFICATION:
                return;
            case client_1.UserStatus.SUSPENDED:
                throw new common_1.ForbiddenException(user.statusReason ?? "Your account has been suspended.");
            case client_1.UserStatus.BANNED:
                throw new common_1.ForbiddenException(user.statusReason ?? "Your account has been banned.");
            case client_1.UserStatus.CLOSED:
                throw new common_1.ForbiddenException("Your account has been closed.");
        }
    }
    getClientIp(req) {
        return (req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ??
            req.socket.remoteAddress ??
            "");
    }
    getUserAgent(req) {
        return req.headers["user-agent"] ?? "";
    }
    async register(dto, req, res) {
        if (await this.prisma.userExistsByEmail(dto.email)) {
            throw new common_1.ConflictException(app_messages_1.AppMessages.user.emailExists);
        }
        if (await this.prisma.userExistsByPhone(dto.phone)) {
            throw new common_1.ConflictException(app_messages_1.AppMessages.user.phoneExists);
        }
        const handle = await this.generateUniqueHandle(dto.fullName);
        const passwordHash = await bcrypt.hash(dto.password, 12);
        const virtualAccountNumber = await this.generateVirtualAccountNumber();
        const result = await this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    handle,
                    fullName: dto.fullName.trim(),
                    email: dto.email.trim().toLowerCase(),
                    phone: dto.phone,
                    passwordHash,
                    dateOfBirth: new Date(dto.dateOfBirth),
                },
            });
            const account = await tx.account.create({
                data: {
                    userId: user.id,
                    virtualAccountNumber,
                    accountType: client_1.AccountType.MAIN,
                    currency: "USD",
                },
            });
            await tx.privacySettings.create({
                data: {
                    userId: user.id,
                },
            });
            await tx.vybeWishSettings.create({
                data: {
                    userId: user.id,
                },
            });
            return {
                user,
                account,
            };
        });
        return {
            message: app_messages_1.AppMessages.auth.accountPendingVerification,
        };
    }
    async login(dto, req, res) {
        const user = await this.prisma.findUserByEmailOrPhone(dto.identifier);
        if (!user) {
            throw new common_1.UnauthorizedException(app_messages_1.AppMessages.auth.invalidCredentials);
        }
        const passwordMatched = await bcrypt.compare(dto.password, user.passwordHash);
        if (!passwordMatched) {
            throw new common_1.UnauthorizedException(app_messages_1.AppMessages.auth.invalidCredentials);
        }
        this.validateUserStatus({
            status: user.status,
            statusReason: user.statusReason,
        });
        const refreshTokenId = crypto.randomUUID();
        const payload = {
            sub: user.id,
            phone: user.phone,
            sid: refreshTokenId,
        };
        const { accessToken, refreshToken } = await this.generateTokens(payload);
        const refreshTokenHash = await bcrypt.hash(refreshToken, 12);
        const ua = req.headers["user-agent"];
        const userAgent = this.getUserAgent(req);
        await this.prisma.$transaction([
            this.prisma.session.create({
                data: {
                    userId: user.id,
                    refreshTokenId,
                    refreshTokenHash,
                    deviceId: dto.deviceId,
                    platform: (0, device_util_1.getPlatform)(userAgent),
                    deviceName: (0, device_util_1.getDeviceName)(userAgent),
                    ipAddress: this.getClientIp(req),
                    userAgent,
                    loginMethod: client_1.LoginMethod.PASSWORD,
                    lastUsedAt: new Date(),
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                },
            }),
            this.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    lastLoginAt: new Date(),
                    lastIpAddress: this.getClientIp(req),
                },
            }),
            this.prisma.session.deleteMany({
                where: {
                    expiresAt: {
                        lt: new Date(),
                    },
                },
            }),
        ]);
        this.setAuthCookies(res, accessToken, refreshToken);
        return {
            message: app_messages_1.AppMessages.auth.loginSuccess,
            data: {
                accessToken,
                user: {
                    id: user.id,
                    handle: user.handle,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    avatarUrl: user.avatarUrl,
                    status: user.status,
                    isVerified: user.isVerified,
                    kycTier: user.kyc_tier,
                },
            },
        };
    }
    async refreshToken(req, res) {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            throw new common_1.UnauthorizedException(app_messages_1.AppMessages.auth.invalidToken);
        }
        let payload;
        try {
            payload = await this.jwt.verifyAsync(refreshToken, {
                secret: config_1.configs.jwt.refreshSecret,
            });
        }
        catch {
            throw new common_1.UnauthorizedException(app_messages_1.AppMessages.auth.invalidToken);
        }
        const session = await this.prisma.session.findUnique({
            where: {
                refreshTokenId: payload.sid,
            },
            include: {
                user: true,
            },
        });
        if (!session) {
            throw new common_1.UnauthorizedException(app_messages_1.AppMessages.auth.invalidToken);
        }
        if (session.expiresAt < new Date()) {
            await this.prisma.session.delete({
                where: {
                    id: session.id,
                },
            });
            throw new common_1.UnauthorizedException(app_messages_1.AppMessages.auth.invalidToken);
        }
        const matched = await bcrypt.compare(refreshToken, session.refreshTokenHash);
        if (!matched) {
            await this.prisma.session.delete({
                where: {
                    id: session.id,
                },
            });
            throw new common_1.UnauthorizedException(app_messages_1.AppMessages.auth.invalidToken);
        }
        this.validateUserStatus({
            status: session.user.status,
            statusReason: session.user.statusReason,
        });
        const newRefreshTokenId = crypto.randomUUID();
        const newPayload = {
            sub: session.user.id,
            phone: session.user.phone,
            sid: newRefreshTokenId,
        };
        const { accessToken, refreshToken: newRefreshToken } = await this.generateTokens(newPayload);
        await this.prisma.session.update({
            where: {
                id: session.id,
            },
            data: {
                refreshTokenId: newRefreshTokenId,
                refreshTokenHash: await bcrypt.hash(newRefreshToken, 12),
                lastUsedAt: new Date(),
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
        });
        this.setAuthCookies(res, accessToken, newRefreshToken);
        return {
            message: app_messages_1.AppMessages.auth.tokenRefreshed,
            data: {
                accessToken,
            },
        };
    }
    async logout(req, res) {
        const refreshToken = req.cookies?.refreshToken;
        if (refreshToken) {
            try {
                const payload = await this.jwt.verifyAsync(refreshToken, {
                    secret: config_1.configs.jwt.refreshSecret,
                });
                await this.prisma.session.updateMany({
                    where: {
                        refreshTokenId: payload.sid,
                        revokedAt: null,
                    },
                    data: {
                        revokedAt: new Date(),
                    },
                });
            }
            catch {
            }
        }
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: config_1.configs.app.isProduction,
            sameSite: "lax",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: config_1.configs.app.isProduction,
            sameSite: "lax",
        });
        return {
            message: app_messages_1.AppMessages.auth.logoutSuccess,
        };
    }
    async logoutAllDevices(userId, res) {
        await this.prisma.session.updateMany({
            where: {
                userId,
                revokedAt: null,
            },
            data: {
                revokedAt: new Date(),
            },
        });
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: config_1.configs.app.isProduction,
            sameSite: "lax",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: config_1.configs.app.isProduction,
            sameSite: "lax",
        });
        return {
            message: app_messages_1.AppMessages.auth.logoutSuccess,
        };
    }
    async me(userId) {
        const user = await this.prisma.findUserByIdOrThrow(userId);
        const account = await this.prisma.account.findFirst({
            where: {
                userId,
                accountType: client_1.AccountType.MAIN,
            },
        });
        return {
            id: user.id,
            handle: user.handle,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            avatarUrl: user.avatarUrl,
            bio: user.bio,
            status: user.status,
            isVerified: user.isVerified,
            kycTier: user.kyc_tier,
            vybeScore: user.vybeScore,
            createdAt: user.createdAt,
            account: account
                ? {
                    id: account.id,
                    virtualAccountNumber: account.virtualAccountNumber,
                    balance: account.balance,
                    currency: account.currency,
                    accountType: account.accountType,
                }
                : null,
        };
    }
    async changePassword(userId, dto, res) {
        const user = await this.prisma.findUserByIdOrThrow(userId);
        const passwordMatched = await bcrypt.compare(dto.currentPassword, user.passwordHash);
        if (!passwordMatched) {
            throw new common_1.BadRequestException(app_messages_1.AppMessages.user.incorrectPassword);
        }
        if (dto.currentPassword === dto.newPassword) {
            throw new common_1.BadRequestException(app_messages_1.AppMessages.user.passwordSameAsOld);
        }
        const passwordHash = await bcrypt.hash(dto.newPassword, 12);
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    passwordHash,
                },
            }),
            this.prisma.session.updateMany({
                where: {
                    userId,
                    revokedAt: null,
                },
                data: {
                    revokedAt: new Date(),
                    revokedReason: "PASSWORD_CHANGED",
                },
            }),
        ]);
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: config_1.configs.app.isProduction,
            sameSite: "lax",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: config_1.configs.app.isProduction,
            sameSite: "lax",
        });
        return {
            message: app_messages_1.AppMessages.user.passwordChanged,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map