import { PrismaClient, SubscriptionType } from "@prisma/client";

export async function seedPlans(prisma: PrismaClient) {
    const existing = await prisma.subscriptionPlan.count();
		if (existing > 0) {
			console.log("⏭️  Plans already exist — skipping");
			return;
		}
	const plans = [
		{
			name: "Basic",
			type: SubscriptionType.BASIC,
			price: 0,
			durationDays: 0,
			dailyAdLimit: 5,
			rewardPerAd: 0.5,
			minWithdrawal: 100,
			features: [
				"প্রতিদিন ৫টি বিজ্ঞাপন",
				"প্রতি বিজ্ঞাপনে ৳০.৫০",
				"সর্বনিম্ন উইথড্র ৳১০০",
				"bKash ও Nagad সাপোর্ট",
			],
		},
		{
			name: "Premium",
			type: SubscriptionType.PREMIUM,
			price: 99,
			durationDays: 30,
			dailyAdLimit: 50,
			rewardPerAd: 1.0,
			minWithdrawal: 50,
			features: [
				"প্রতিদিন ৫০টি বিজ্ঞাপন",
				"প্রতি বিজ্ঞাপনে ৳১.০০",
				"সর্বনিম্ন উইথড্র ৳৫০",
				"অগ্রাধিকার সাপোর্ট",
				"সব ধরনের বিজ্ঞাপন",
			],
		},
	];

	for (const plan of plans) {
		await prisma.subscriptionPlan.upsert({
			where: { type: plan.type },
			update: plan,
			create: plan,
		});
	}

	console.log("✅ Subscription plans seeded");
}
