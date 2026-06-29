import { PrismaClient, Role, SubscriptionType } from "@prisma/client";
import * as bcrypt from "bcryptjs";  

export async function seedOwner(prisma: PrismaClient) {
	console.log("🔍 Checking existing owner...");
	const existing = await prisma.user.findFirst({
		where: { role: Role.OWNER },
	});
	if (existing) {
		console.log("⏭️  Owner already exists — skipping");
		return existing;
	}

	const phone = process.env.OWNER_PHONE || "01700000000";
	const password = process.env.OWNER_PASSWORD || "owner123456";
	const passwordHash = await bcrypt.hash(password, 10);

	const owner = await prisma.user.create({
		data: {
			name: process.env.OWNER_NAME || "Jillur Rahman",
			phone,
			email: process.env.OWNER_EMAIL || "owner@takanibo.com",
			referralCode:"TN-000000",
			passwordHash,
			role: Role.OWNER,
			subscriptionType: SubscriptionType.PREMIUM,
			isActive: true,
		},
	});

	console.log(`✅ Owner created: ${owner.phone}`);
	return owner;
}
