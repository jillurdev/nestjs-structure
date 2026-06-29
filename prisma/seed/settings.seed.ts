import { PrismaClient } from "@prisma/client";

export async function seedSettings(prisma: PrismaClient, ownerId: string) {
	const existing = await prisma.appSetting.count();
	if (existing > 0) {
		console.log("⏭️  Settings already exist — skipping");
		return;
	}
	const settings = [
		{
			key: "bkash_number",
			value: "01853239027",
			description: "bKash payment number",
		},
		{
			key: "nagad_number",
			value: "01853239027",
			description: "Nagad payment number",
		},
		{
			key: "reward_per_ad_basic",
			value: "0.50",
			description: "Basic user reward per ad",
		},
		{
			key: "reward_per_ad_premium",
			value: "1.00",
			description: "Premium user reward per ad",
		},
		{
			key: "daily_limit_basic",
			value: "5",
			description: "Basic daily ad limit",
		},
		{
			key: "daily_limit_premium",
			value: "50",
			description: "Premium daily ad limit",
		},
		{
			key: "min_withdrawal_basic",
			value: "100",
			description: "Basic min withdrawal",
		},
		{
			key: "min_withdrawal_premium",
			value: "50",
			description: "Premium min withdrawal",
		},
		{
			key: "referral_bonus",
			value: "10",
			description: "Referral bonus amount",
		},
		{
			key: "maintenance_mode",
			value: "false",
			description: "App maintenance mode",
		},
		{ key: "app_version", value: "1.0.0", description: "Current app version" },
		{ key: "force_update", value: "false", description: "Force update flag" },
	];

	for (const setting of settings) {
		await prisma.appSetting.upsert({
			where: { key: setting.key },
			update: { value: setting.value },
			create: { ...setting, updatedBy: ownerId },
		});
	}

	console.log("✅ App settings seeded");
}
