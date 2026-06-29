import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { seedOwner } from "./owner.seed";
import { seedSettings } from "./settings.seed";
 
const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export async function runSeed() {
	console.log("🌱 Starting seed...\n");
	console.log("🔍 Running seedOwner...");
	const owner = await seedOwner(prisma);
	console.log("✅ seedOwner done");
	await seedSettings(prisma, owner.id);
 

	console.log("🎉 Seed complete!\n");
}

if (require.main === module) {
	runSeed()
		.catch(e => {
			console.error("❌ Seed failed:", e);
			process.exit(1);
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}
