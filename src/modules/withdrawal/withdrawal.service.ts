import {
	Injectable,
	NotFoundException,
	BadRequestException,
	ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "@/database/prisma/prisma.service";
import { CreateWithdrawalDto } from "./dto/withdrawal.dto";
import {
	SubscriptionType,
	WithdrawalStatus,
	TransactionType,
	TransactionStatus,
	NotificationType,
} from "@prisma/client";
import { configs } from "@/config";
import { NotificationService } from "../notification/notification.service";
import { AppMessages } from "@/common/AppMessages/app.messages";

@Injectable()
export class WithdrawalService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly notificationService: NotificationService,
	) {}

	// ─── User: Request withdrawal ─────────────────────────────────
	async requestWithdrawal(userId: string, dto: CreateWithdrawalDto) {
		const user = await this.prisma.findUserFieldsOrThrow(userId, {
			id: true,
			balance: true,
			subscriptionType: true,
			isActive: true,
			isBanned: true,
		});

		if (!user.isActive || user.isBanned)
			throw new ForbiddenException("Account is not active");

		const isPremium = user.subscriptionType === SubscriptionType.PREMIUM;
		const minWithdrawal = isPremium
			? configs.reward.minWithdrawalPremium
			: configs.reward.minWithdrawalBasic;

		const currentBalance = Number(user.balance);

		// Minimum withdrawal check
		if (dto.amount < minWithdrawal) {
			throw new BadRequestException(
				`Minimum withdrawal amount is ৳${minWithdrawal}`,
			);
		}

		// Balance check
		if (dto.amount > currentBalance) {
			throw new BadRequestException("Insufficient balance");
		}

		// Check pending withdrawal
		const pendingWithdrawal = await this.prisma.withdrawal.findFirst({
			where: { userId, status: WithdrawalStatus.PENDING },
		});

		if (pendingWithdrawal) {
			throw new BadRequestException(
				"You already have a pending withdrawal request",
			);
		}

		const newBalance = currentBalance - dto.amount;

		const withdrawal = await this.prisma.$transaction(async tx => {
			// 1. Create withdrawal
			const withdrawal = await tx.withdrawal.create({
				data: {
					userId,
					amount: dto.amount,
					method: dto.method,
					accountNumber: dto.accountNumber,
					accountName: dto.accountName,
					status: WithdrawalStatus.PENDING,
				},
			});

			// 2. Deduct balance
			await tx.user.update({
				where: { id: userId },
				data: { balance: newBalance },
			});

			// 3. Transaction record — referenceId = withdrawal.id
			await tx.transaction.create({
				data: {
					userId,
					type: TransactionType.WITHDRAWAL,
					status: TransactionStatus.PENDING,
					amount: dto.amount,
					balanceBefore: currentBalance,
					balanceAfter: newBalance,
					description: `Withdrawal via ${dto.method} to ${dto.accountNumber}`,
					referenceId: withdrawal.id,
				},
			});

			return withdrawal;
		});

		return withdrawal;
	}

	// ─── User: Withdrawal history ─────────────────────────────────
	async getUserWithdrawals(userId: string, page = 1, limit = 10) {
		const skip = (page - 1) * limit;

		const [withdrawals, total] = await this.prisma.$transaction([
			this.prisma.withdrawal.findMany({
				where: { userId },
				orderBy: { requestedAt: "desc" },
				skip,
				take: limit,
			}),
			this.prisma.withdrawal.count({ where: { userId } }),
		]);

		return {
			withdrawals,
			meta: { page, limit, total },
		};
	}

	// ─── Admin: Get all withdrawals ───────────────────────────────
	async getAllWithdrawals(status?: WithdrawalStatus, page = 1, limit = 20) {
		const skip = (page - 1) * limit;

		const where = status ? { status } : {};

		const [withdrawals, total] = await this.prisma.$transaction([
			this.prisma.withdrawal.findMany({
				where,
				orderBy: { requestedAt: "desc" },
				skip,
				take: limit,
				include: {
					user: {
						select: {
							id: true,
							name: true,
							phone: true,
							subscriptionType: true,
						},
					},
				},
			}),
			this.prisma.withdrawal.count({ where }),
		]);

		return {
			withdrawals,
			meta: { page, limit, total },
		};
	}

	// ─── Admin: Approve withdrawal ────────────────────────────────
	async approveWithdrawal(id: string, adminId: string, note?: string) {
		const withdrawal = await this.prisma.withdrawal.findUnique({
			where: { id },
			include: { user: true },
		});

		if (!withdrawal) throw new NotFoundException("Withdrawal not found");

		if (withdrawal.status !== WithdrawalStatus.PENDING) {
			throw new BadRequestException("Withdrawal is not pending");
		}

		await this.prisma.$transaction([
			// 1. Update withdrawal status
			this.prisma.withdrawal.update({
				where: { id },
				data: {
					status: WithdrawalStatus.APPROVED,
					adminNote: note,
					processedBy: adminId,
					processedAt: new Date(),
				},
			}),

			// 2. Update user totalWithdrawn
			this.prisma.user.update({
				where: { id: withdrawal.userId },
				data: {
					totalWithdrawn: { increment: Number(withdrawal.amount) },
				},
			}),

			// 3. Update transaction status
			this.prisma.transaction.updateMany({
				where: { referenceId: id },
				data: { status: TransactionStatus.COMPLETED },
			}),
		]);

		// FCM + DB notification
		await this.notificationService.createAndSend(
			withdrawal.userId,
			NotificationType.WITHDRAWAL_APPROVED,
			"উত্তোলন অনুমোদিত হয়েছে ✅",
			`আপনার ৳${withdrawal.amount} উত্তোলন অনুমোদিত হয়েছে।`,
			{ type: "WITHDRAWAL_APPROVED", withdrawalId: id },
		);

		return { message: AppMessages.withdrawal.approved };
	}

	// ─── Admin: Reject withdrawal ─────────────────────────────────
	async rejectWithdrawal(id: string, adminId: string, note: string) {
		const withdrawal = await this.prisma.withdrawal.findUnique({
			where: { id },
			include: { user: true },
		});

		if (!withdrawal) throw new NotFoundException("Withdrawal not found");

		if (withdrawal.status !== WithdrawalStatus.PENDING) {
			throw new BadRequestException("Withdrawal is not pending");
		}

		const currentBalance = Number(withdrawal.user.balance);
		const refundedBalance = currentBalance + Number(withdrawal.amount);

		await this.prisma.$transaction([
			// 1. Update withdrawal status
			this.prisma.withdrawal.update({
				where: { id },
				data: {
					status: WithdrawalStatus.REJECTED,
					adminNote: note,
					processedBy: adminId,
					processedAt: new Date(),
				},
			}),

			// 2. Refund balance
			this.prisma.user.update({
				where: { id: withdrawal.userId },
				data: { balance: refundedBalance },
			}),

			// 3. Record refund transaction
			this.prisma.transaction.create({
				data: {
					userId: withdrawal.userId,
					type: TransactionType.REFUND,
					status: TransactionStatus.COMPLETED,
					amount: Number(withdrawal.amount),
					balanceBefore: currentBalance,
					balanceAfter: refundedBalance,
					description: `Withdrawal rejected: ${note}`,
					referenceId: id,
				},
			}),

			// 4. Update pending transaction
			this.prisma.transaction.updateMany({
				where: {
					userId: withdrawal.userId,
					type: TransactionType.WITHDRAWAL,
					status: TransactionStatus.PENDING,
					amount: withdrawal.amount,
				},
				data: { status: TransactionStatus.FAILED },
			}),
		]);
	
		await this.notificationService.createAndSend(
			withdrawal.userId,
			NotificationType.WITHDRAWAL_REJECTED,
			"উত্তোলন বাতিল হয়েছে ❌",
			`আপনার ৳${withdrawal.amount} উত্তোলন বাতিল হয়েছে। কারণ: ${note}`,
			{ type: "WITHDRAWAL_REJECTED", withdrawalId: id },
		);

		return { message: AppMessages.withdrawal.rejected };
	}

	// ─── User: Wallet summary ─────────────────────────────────────
	async getWalletSummary(userId: string) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				balance: true,
				totalEarned: true,
				totalWithdrawn: true,
				subscriptionType: true,
			},
		});

		if (!user) throw new NotFoundException("User not found");

		const isPremium = user.subscriptionType === SubscriptionType.PREMIUM;

		// Recent transactions
		const recentTransactions = await this.prisma.transaction.findMany({
			where: { userId },
			orderBy: { createdAt: "desc" },
			take: 10,
		});

		return {
			balance: user.balance,
			totalEarned: user.totalEarned,
			totalWithdrawn: user.totalWithdrawn,
			minWithdrawal: isPremium
				? configs.reward.minWithdrawalPremium
				: configs.reward.minWithdrawalBasic,
			recentTransactions,
		};
	}
}
