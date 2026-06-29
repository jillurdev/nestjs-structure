import {
	Injectable,
	NotFoundException,
	ConflictException,
	Inject,
} from "@nestjs/common";
import { PrismaService } from "@/database/prisma/prisma.service";
import { Role, SubscriptionType, WithdrawalStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { AppMessages } from "@/common/AppMessages/app.messages";

@Injectable()
export class OwnerService {
	constructor(
		private readonly prisma: PrismaService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	// ─── Full Dashboard Overview ──────────────────────────────────
	async getOverview() {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const thisMonth = new Date();
		thisMonth.setDate(1);
		thisMonth.setHours(0, 0, 0, 0);

		const [
			totalUsers,
			activeUsers,
			bannedUsers,
			premiumUsers,
			basicUsers,
			totalAdmins,
			pendingWithdrawals,
			approvedWithdrawals,
			totalAdsWatched,
			todayAdsWatched,
			todayRegistrations,
			monthRegistrations,
		] = await this.prisma.$transaction([
			this.prisma.user.count({ where: { role: Role.USER } }),
			this.prisma.user.count({
				where: { role: Role.USER, isActive: true, isBanned: false },
			}),
			this.prisma.user.count({ where: { role: Role.USER, isBanned: true } }),
			this.prisma.user.count({
				where: { role: Role.USER, subscriptionType: SubscriptionType.PREMIUM },
			}),
			this.prisma.user.count({
				where: { role: Role.USER, subscriptionType: SubscriptionType.BASIC },
			}),
			this.prisma.user.count({ where: { role: Role.ADMIN } }),
			this.prisma.withdrawal.count({
				where: { status: WithdrawalStatus.PENDING },
			}),
			this.prisma.withdrawal.count({
				where: { status: WithdrawalStatus.APPROVED },
			}),
			this.prisma.adWatch.count(),
			this.prisma.adWatch.count({ where: { watchedAt: { gte: today } } }),
			this.prisma.user.count({ where: { createdAt: { gte: today } } }),
			this.prisma.user.count({ where: { createdAt: { gte: thisMonth } } }),
		]);

		const [totalPaidOut, totalUserBalance, todayEarnings, monthEarnings] =
			await Promise.all([
				this.prisma.withdrawal.aggregate({
					where: { status: WithdrawalStatus.APPROVED },
					_sum: { amount: true },
				}),
				this.prisma.user.aggregate({
					where: { role: Role.USER },
					_sum: { balance: true, totalEarned: true },
				}),
				this.prisma.dailyAdLimit.aggregate({
					where: { date: today },
					_sum: { earned: true },
				}),
				this.prisma.dailyAdLimit.aggregate({
					where: { date: { gte: thisMonth } },
					_sum: { earned: true },
				}),
			]);

		return {
			users: {
				total: totalUsers,
				active: activeUsers,
				banned: bannedUsers,
				premium: premiumUsers,
				basic: basicUsers,
				admins: totalAdmins,
				todayNew: todayRegistrations,
				monthNew: monthRegistrations,
			},
			ads: {
				totalWatched: totalAdsWatched,
				todayWatched: todayAdsWatched,
				todayEarnings: todayEarnings._sum.earned ?? 0,
				monthEarnings: monthEarnings._sum.earned ?? 0,
			},
			finance: {
				totalPaidOut: totalPaidOut._sum.amount ?? 0,
				totalUserBalance: totalUserBalance._sum.balance ?? 0,
				totalEarned: totalUserBalance._sum.totalEarned ?? 0,
				pendingWithdrawals,
				approvedWithdrawals,
			},
		};
	}

	// ─── Admin Management ─────────────────────────────────────────
	async createAdmin(data: {
		name: string;
		phone: string;
		password: string;
		email?: string;
	}) {
		const existingPhone = await this.prisma.findUserByPhone(data.phone);
		if (existingPhone)
			throw new ConflictException(AppMessages.admin.phoneExists);

		const passwordHash = await bcrypt.hash(data.password, 10);

		return this.prisma.user.create({
			data: {
				name: data.name,
				phone: data.phone,
				email: data.email,
				passwordHash,
				role: Role.ADMIN,
				isActive: true,
			},
			select: {
				id: true,
				name: true,
				phone: true,
				email: true,
				role: true,
				createdAt: true,
			},
		});
	}

	async getAdmins() {
		return this.prisma.user.findMany({
			where: { role: Role.ADMIN },
			select: {
				id: true,
				name: true,
				phone: true,
				email: true,
				isActive: true,
				createdAt: true,
				lastLoginAt: true,
			},
			orderBy: { createdAt: "desc" },
		});
	}

	async toggleAdminStatus(adminId: string) {
		const admin = await this.prisma.user.findUnique({
			where: { id: adminId, role: Role.ADMIN },
		});
		if (!admin) throw new NotFoundException(AppMessages.admin.notFound);

		return this.prisma.user.update({
			where: { id: adminId },
			data: { isActive: !admin.isActive },
			select: { id: true, isActive: true },
		});
	}

	async deleteAdmin(adminId: string) {
		const admin = await this.prisma.user.findUnique({
			where: { id: adminId, role: Role.ADMIN },
		});
		if (!admin) throw new NotFoundException(AppMessages.admin.notFound);

		await this.prisma.user.delete({ where: { id: adminId } });
	}

	// ─── App Settings ─────────────────────────────────────────────
	async getSettings() {
		const settings = await this.prisma.appSetting.findMany({
			orderBy: { key: "asc" },
		});
		return settings.reduce(
			(acc, s) => ({ ...acc, [s.key]: s.value }),
			{} as Record<string, string>,
		);
	}

	async updateSetting(key: string, value: string, ownerId: string) {
		const result = await this.prisma.appSetting.upsert({
			where: { key },
			update: { value, updatedBy: ownerId },
			create: { key, value, updatedBy: ownerId },
		});
		await this.cacheManager.del("app_settings");
		return result;
	}

	async updateMultipleSettings(
		settings: Record<string, string>,
		ownerId: string,
	) {
		const updates = Object.entries(settings).map(([key, value]) =>
			this.prisma.appSetting.upsert({
				where: { key },
				update: { value, updatedBy: ownerId },
				create: { key, value, updatedBy: ownerId },
			}),
		);
		await this.prisma.$transaction(updates);
		await this.cacheManager.del("app_settings");
	}

	// ─── Revenue Tracking ─────────────────────────────────────────
	async getRevenueRecords(days = 30) {
		const from = new Date();
		from.setDate(from.getDate() - days);
		return this.prisma.revenueRecord.findMany({
			where: { date: { gte: from } },
			orderBy: { date: "desc" },
		});
	}

	async upsertRevenueRecord(
		date: Date,
		data: {
			admobRevenue?: number;
			adsenseRevenue?: number;
			unityRevenue?: number;
			otherRevenue?: number;
			totalPaidOut?: number;
		},
	) {
		const totalRevenue =
			(data.admobRevenue ?? 0) +
			(data.adsenseRevenue ?? 0) +
			(data.unityRevenue ?? 0) +
			(data.otherRevenue ?? 0);
		const profit = totalRevenue - (data.totalPaidOut ?? 0);

		return this.prisma.revenueRecord.upsert({
			where: { date },
			update: { ...data, totalRevenue, profit, updatedAt: new Date() },
			create: { date, ...data, totalRevenue, profit },
		});
	}

	// ─── Give Bonus ───────────────────────────────────────────────
	async giveBonus(
		userId: string,
		amount: number,
		reason: string,
		ownerId: string,
	) {
		const user = await this.prisma.findUserByIdOrThrow(userId);

		const currentBalance = Number(user.balance);
		const newBalance = currentBalance + amount;

		await this.prisma.$transaction([
			this.prisma.bonus.create({
				data: {
					userId,
					amount,
					reason,
					isApplied: true,
					appliedAt: new Date(),
					createdBy: ownerId,
				},
			}),
			this.prisma.user.update({
				where: { id: userId },
				data: { balance: newBalance, totalEarned: { increment: amount } },
			}),
			this.prisma.transaction.create({
				data: {
					userId,
					type: "BONUS",
					status: "COMPLETED",
					amount,
					balanceBefore: currentBalance,
					balanceAfter: newBalance,
					description: `Owner bonus: ${reason}`,
				},
			}),
			this.prisma.notification.create({
				data: {
					userId,
					type: "BONUS",
					title: "বোনাস পেয়েছেন! 🎉",
					body: `আপনি ৳${amount} বোনাস পেয়েছেন। কারণ: ${reason}`,
				},
			}),
		]);

		return { userName: user.name };
	}

	// ─── Maintenance Mode ─────────────────────────────────────────
	async setMaintenanceMode(enabled: boolean, ownerId: string) {
		await this.prisma.appSetting.upsert({
			where: { key: "maintenance_mode" },
			update: { value: enabled.toString(), updatedBy: ownerId },
			create: {
				key: "maintenance_mode",
				value: enabled.toString(),
				updatedBy: ownerId,
			},
		});
		return { maintenanceMode: enabled };
	}

	// ─── Force Update ─────────────────────────────────────────────
	async setForceUpdate(enabled: boolean, version: string, ownerId: string) {
		await this.prisma.$transaction([
			this.prisma.appSetting.upsert({
				where: { key: "force_update" },
				update: { value: enabled.toString(), updatedBy: ownerId },
				create: {
					key: "force_update",
					value: enabled.toString(),
					updatedBy: ownerId,
				},
			}),
			this.prisma.appSetting.upsert({
				where: { key: "app_version" },
				update: { value: version, updatedBy: ownerId },
				create: { key: "app_version", value: version, updatedBy: ownerId },
			}),
		]);
		return { forceUpdate: enabled, version };
	}
}
