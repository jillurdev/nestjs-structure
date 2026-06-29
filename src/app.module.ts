import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { AppController } from "./app.controller";

import { PrismaModule } from "./database/prisma/prisma.module";

import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { WithdrawalModule } from "./modules/withdrawal/withdrawal.module";
import { NotificationModule } from "./modules/notification/notification.module";
import { AdminModule } from "./modules/admin/admin.module";
import { OwnerModule } from "./modules/owner/owner.module";
import { MailModule } from "./shared/mail/mail.module";

// Guards
import { JwtAuthGuard } from "./modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "./common/guards";

// Filters & Interceptors
import { GlobalExceptionFilter } from "./common/filters";
import { ResponseInterceptor } from "./common/interceptors";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
		}),

		CacheModule.register({
			isGlobal: true,
			ttl: 60 * 5, // 5 minutes (seconds)
		}),

		ThrottlerModule.forRoot([
			{
				name: "default",
				ttl: 60,
				limit: 100,
			},
			{
				name: "login",
				ttl: 60,
				limit: 5,
			},
		]),

		PrismaModule,

		// Shared
		// MailModule,

		// Feature Modules
		AuthModule,
		UsersModule,
		WithdrawalModule,
		NotificationModule,
		AdminModule,
		OwnerModule,
	],

	controllers: [AppController],

	providers: [
		// Global Rate Limit
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},

		// JWT Authentication
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},

		// Roles Authorization
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},

		// Global Response Format
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor,
		},

		// Global Exception Handler
		{
			provide: APP_FILTER,
			useClass: GlobalExceptionFilter,
		},
	],
})
export class AppModule {}
