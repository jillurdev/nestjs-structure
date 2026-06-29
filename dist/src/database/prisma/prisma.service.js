"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const app_messages_1 = require("../../common/AppMessages/app.messages");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        const adapter = new adapter_pg_1.PrismaPg({
            connectionString: process.env.DATABASE_URL,
        });
        super({ adapter });
    }
    async onModuleInit() {
        console.log("🔥 Prisma connecting...");
        await this.$connect();
        console.log("✅ Prisma connected");
    }
    async onModuleDestroy() {
        await this.$disconnect();
        console.log("🔌 Prisma disconnected");
    }
    async findUserByIdOrThrow(id) {
        const user = await this.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                isActive: true,
                isBanned: true,
                referralCode: true,
                banReason: true,
                subscriptionType: true,
                passwordHash: true,
                balance: true,
                totalEarned: true,
                totalWithdrawn: true,
                avatarUrl: true,
                deviceId: true,
                createdAt: true,
                lastLoginAt: true,
            },
        });
        if (!user)
            throw new common_1.NotFoundException(app_messages_1.AppMessages.user.notFound);
        return user;
    }
    async findUserFieldsOrThrow(id, select) {
        const user = await this.user.findUnique({ where: { id }, select });
        if (!user)
            throw new common_1.NotFoundException(app_messages_1.AppMessages.user.notFound);
        return user;
    }
    async findUserByPhoneOrThrow(phone) {
        const user = await this.user.findUnique({ where: { phone } });
        if (!user)
            throw new common_1.NotFoundException(app_messages_1.AppMessages.user.notFound);
        return user;
    }
    async findUserByPhone(phone) {
        return this.user.findUnique({ where: { phone } });
    }
    async findUserByEmail(email) {
        return this.user.findUnique({ where: { email } });
    }
    async userExistsByPhone(phone) {
        const count = await this.user.count({ where: { phone } });
        return count > 0;
    }
    async userExistsByEmail(email) {
        const count = await this.user.count({ where: { email } });
        return count > 0;
    }
    async userCountByDeviceId(deviceId) {
        return this.user.count({ where: { deviceId } });
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map