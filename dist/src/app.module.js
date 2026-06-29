"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cache_manager_1 = require("@nestjs/cache-manager");
const prisma_module_1 = require("./database/prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const app_controller_1 = require("./app.controller");
const core_1 = require("@nestjs/core");
const guards_1 = require("./common/guards");
const ads_module_1 = require("./modules/ads/ads.module");
const withdrawal_module_1 = require("./modules/withdrawal/withdrawal.module");
const jwt_auth_guard_1 = require("./modules/auth/guards/jwt-auth.guard");
const subscription_module_1 = require("./modules/subscription/subscription.module");
const notification_module_1 = require("./modules/notification/notification.module");
const admin_module_1 = require("./modules/admin/admin.module");
const owner_module_1 = require("./modules/owner/owner.module");
const blog_module_1 = require("./modules/blog/blog.module");
const throttler_1 = require("@nestjs/throttler");
const topup_module_1 = require("./modules/topup/topup.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        imports: [
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: "short",
                    ttl: 1000,
                    limit: 5,
                },
                {
                    name: "long",
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                ttl: 60 * 5 * 1000,
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            ads_module_1.AdsModule,
            topup_module_1.TopupModule,
            withdrawal_module_1.WithdrawalModule,
            subscription_module_1.SubscriptionModule,
            notification_module_1.NotificationModule,
            admin_module_1.AdminModule,
            owner_module_1.OwnerModule,
            blog_module_1.BlogModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.RolesGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map