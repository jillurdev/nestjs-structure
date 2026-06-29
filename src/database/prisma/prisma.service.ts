import {
	Injectable,
	NotFoundException,
	OnModuleDestroy,
	OnModuleInit,
} from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Prisma, User, Account, Admin } from "@prisma/client";
import { AppMessages } from "@/common/AppMessages/app.messages";
import { configs } from "@/config";

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor() {
		super({
			adapter: new PrismaPg({
				connectionString: configs.database.url,
			}),
		});
	}

	async onModuleInit() {
		await this.$connect();
		console.log("✅ Prisma connected");
	}

	async onModuleDestroy() {
		await this.$disconnect();
		console.log("🔌 Prisma disconnected");
	}

	// ============================================================
	// USER HELPERS
	// ============================================================

	async findUserByIdOrThrow(
		id: string,
		args?: Omit<Prisma.UserFindUniqueArgs, "where">,
	) {
		const user = await this.user.findUnique({
			where: { id },
			...args,
		});

		if (!user) throw new NotFoundException(AppMessages.user.notFound);

		return user;
	}

	async findUserByEmailOrPhone(identifier: string) {
		return this.user.findFirst({
			where: {
				OR: [
					{
						email: identifier.toLowerCase(),
					},
					{
						phone: identifier,
					},
				],
			},
		});
	}
	async findUserByHandle(handle: string) {
		return this.user.findUnique({
			where: { handle },
		});
	}

	async findUserByEmail(email: string) {
		return this.user.findUnique({
			where: { email },
		});
	}

	async findUserByPhone(phone: string) {
		return this.user.findUnique({
			where: { phone },
		});
	}

	async userExistsById(id: string) {
		return (
			(await this.user.count({
				where: { id },
			})) > 0
		);
	}

	async userExistsByHandle(handle: string) {
		return (
			(await this.user.count({
				where: { handle },
			})) > 0
		);
	}

	async userExistsByEmail(email: string) {
		return (
			(await this.user.count({
				where: { email },
			})) > 0
		);
	}

	async userExistsByPhone(phone: string) {
		return (
			(await this.user.count({
				where: { phone },
			})) > 0
		);
	}

	// ============================================================
	// ACCOUNT HELPERS
	// ============================================================

	async findAccountByIdOrThrow(
		id: string,
		args?: Omit<Prisma.AccountFindUniqueArgs, "where">,
	) {
		const account = await this.account.findUnique({
			where: { id },
			...args,
		});

		if (!account) throw new NotFoundException(AppMessages.account.notFound);

		return account;
	}

	async findMainAccountByUserId(userId: string) {
		return this.account.findFirst({
			where: {
				userId,
				accountType: "MAIN",
			},
		});
	}

	async findSavingsAccountByUserId(userId: string) {
		return this.account.findFirst({
			where: {
				userId,
				accountType: "SAVINGS",
			},
		});
	}

	// ============================================================
	// ADMIN HELPERS
	// ============================================================

	async findAdminByIdOrThrow(id: string) {
		const admin = await this.admin.findUnique({
			where: { id },
		});

		if (!admin) throw new NotFoundException(AppMessages.admin.notFound);

		return admin;
	}

	async adminExistsByEmail(email: string) {
		return (
			(await this.admin.count({
				where: { email },
			})) > 0
		);
	}

	// ============================================================
	// DEVICE TOKEN HELPERS
	// ============================================================

	async findDeviceToken(token: string) {
		return this.deviceToken.findUnique({
			where: {
				token,
			},
		});
	}

	// ============================================================
	// KYC
	// ============================================================

	async findLatestKyc(userId: string) {
		return this.kycRecord.findFirst({
			where: { userId },
			orderBy: {
				createdAt: "desc",
			},
		});
	}

	// ============================================================
	// CARD
	// ============================================================

	async findCardByIdOrThrow(id: string) {
		const card = await this.card.findUnique({
			where: { id },
		});

		if (!card) throw new NotFoundException(AppMessages.card.notFound);

		return card;
	}

	// ============================================================
	// TRANSACTION
	// ============================================================

	async findTransactionByIdOrThrow(id: string) {
		const transaction = await this.transaction.findUnique({
			where: { id },
		});

		if (!transaction)
			throw new NotFoundException(AppMessages.transaction.notFound);

		return transaction;
	}

	async transactionReferenceExists(reference: string) {
		return (
			(await this.transaction.count({
				where: { reference },
			})) > 0
		);
	}
}
