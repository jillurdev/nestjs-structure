import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { PrismaModule } from "./database/prisma/prisma.module";
import { MailModule } from "./shared/mail/mail.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { AppController } from "./app.controller";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./common/guards";
import { WithdrawalModule } from "./modules/withdrawal/withdrawal.module";
import { JwtAuthGuard } from "./modules/auth/guards/jwt-auth.guard";
import { NotificationModule } from "./modules/notification/notification.module";
import { AdminModule } from "./modules/admin/admin.module";
import { OwnerModule } from "./modules/owner/owner.module";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";

@Module({
	controllers: [AppController],
	imports: [
		ThrottlerModule.forRoot([
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
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		CacheModule.register({
			isGlobal: true,
			ttl: 60 * 5 * 1000,
		}),
		PrismaModule,
		// MailModule,
		AuthModule,
		UsersModule,
		WithdrawalModule,
		NotificationModule,
		AdminModule,
		OwnerModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
