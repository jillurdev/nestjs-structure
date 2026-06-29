import {
	Injectable,
	OnModuleInit,
	OnModuleDestroy,
	NotFoundException,
} from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { AppMessages } from "@/common/AppMessages/app.messages";

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor() {
		const adapter = new PrismaPg({
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

	// ─── User Helpers ─────────────────────────────────────────────

	async findUserByIdOrThrow(id: string) {
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
		if (!user) throw new NotFoundException(AppMessages.user.notFound);
		return user;
	}

	async findUserFieldsOrThrow<T extends Record<string, boolean>>(
		id: string,
		select: T,
	) {
		const user = await this.user.findUnique({ where: { id }, select });
		if (!user) throw new NotFoundException(AppMessages.user.notFound);
		return user;
	}

	async findUserByPhoneOrThrow(phone: string) {
		const user = await this.user.findUnique({ where: { phone } });
		if (!user) throw new NotFoundException(AppMessages.user.notFound);
		return user;
	}

	async findUserByPhone(phone: string) {
		return this.user.findUnique({ where: { phone } });
	}

	async findUserByEmail(email: string) {
		return this.user.findUnique({ where: { email } });
	}

	async userExistsByPhone(phone: string) {
		const count = await this.user.count({ where: { phone } });
		return count > 0;
	}

	async userExistsByEmail(email: string) {
		const count = await this.user.count({ where: { email } });
		return count > 0;
	}

	async userCountByDeviceId(deviceId: string) {
		return this.user.count({ where: { deviceId } });
	}
}
