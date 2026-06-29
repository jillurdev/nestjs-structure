import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
 
const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export async function runSeed() {
	console.log("🌱 Starting seed...\n");
	console.log("🔍 Running seedOwner...");
 

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
