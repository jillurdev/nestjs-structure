import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/database/prisma/prisma.service";
import { WithdrawalStatus, Role, NotificationType } from "@prisma/client";
import { NotificationService } from "../notification/notification.service";

@Injectable()
export class AdminService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly notificationService: NotificationService,
	) {}

	// ─── Dashboard Stats ──────────────────────────────────────────
	async getDashboardStats() {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const [
			totalUsers,
			activeUsers,
			premiumUsers,
			totalWithdrawals,
			pendingWithdrawals,
			todayRegistrations,
			todayAdWatches,
			todayEarnings,
			totalAdsWatched,
		] = await this.prisma.$transaction([
			this.prisma.user.count({ where: { role: Role.USER } }),
			this.prisma.user.count({ where: { role: Role.USER, isActive: true } }),
			this.prisma.user.count({ where: { subscriptionType: "PREMIUM" } }),
			this.prisma.withdrawal.count(),
			this.prisma.withdrawal.count({
				where: { status: WithdrawalStatus.PENDING },
			}),
			this.prisma.user.count({ where: { createdAt: { gte: today } } }),
			this.prisma.adWatch.count({ where: { watchedAt: { gte: today } } }),
			this.prisma.dailyAdLimit.aggregate({
				where: { date: today },
				_sum: { earned: true },
			}),
			this.prisma.adWatch.count(),
		]);

		const totalPaidOut = await this.prisma.withdrawal.aggregate({
			where: { status: WithdrawalStatus.APPROVED },
			_sum: { amount: true },
		});

		const totalBalance = await this.prisma.user.aggregate({
			_sum: { balance: true },
		});

		return {
			users: {
				total: totalUsers,
				active: activeUsers,
				premium: premiumUsers,
				todayNew: todayRegistrations,
			},
			ads: {
				totalWatched: totalAdsWatched,
				todayWatched: todayAdWatches,
				todayEarnings: todayEarnings._sum.earned ?? 0,
			},
			withdrawals: {
				total: totalWithdrawals,
				pending: pendingWithdrawals,
				totalPaidOut: totalPaidOut._sum.amount ?? 0,
			},
			balance: {
				totalUserBalance: totalBalance._sum.balance ?? 0,
			},
		};
	}

	// ─── Revenue Records (read-only) ──────────────────────────────
	async getRevenueRecords(days = 30) {
		const from = new Date();
		from.setDate(from.getDate() - days);

		return this.prisma.revenueRecord.findMany({
			where: { date: { gte: from } },
			orderBy: { date: "desc" },
		});
	}

	// ─── App Settings (read-only) ─────────────────────────────────
	async getSettings() {
		return this.prisma.appSetting.findMany({
			orderBy: { key: "asc" },
		});
	}

	// ─── Give Bonus ───────────────────────────────────────────────
	async giveBonus(
		userId: string,
		amount: number,
		reason: string,
		adminId: string,
	) {
		const user = await this.prisma.findUserFieldsOrThrow(userId, {
			balance: true,
			name: true,
		});

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
					createdBy: adminId,
				},
			}),
			this.prisma.user.update({
				where: { id: userId },
				data: {
					balance: newBalance,
					totalEarned: { increment: amount },
				},
			}),
			this.prisma.transaction.create({
				data: {
					userId,
					type: "BONUS",
					status: "COMPLETED",
					amount,
					balanceBefore: currentBalance,
					balanceAfter: newBalance,
					description: `Bonus: ${reason}`,
				},
			}),
		]);

		// DB notification + FCM
		await this.notificationService.createAndSend(
			userId,
			NotificationType.BONUS,
			"বোনাস পেয়েছেন! 🎉",
			`আপনার অ্যাকাউন্টে ৳${amount} বোনাস যোগ হয়েছে। কারণ: ${reason}`,
			{ type: "BONUS" },
		);

		return { userName: user.name };
	}
}
