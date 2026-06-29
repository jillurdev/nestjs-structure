"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeed = runSeed;
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const owner_seed_1 = require("./owner.seed");
const plans_seed_1 = require("./plans.seed");
const settings_seed_1 = require("./settings.seed");
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new client_1.PrismaClient({ adapter });
async function runSeed() {
    console.log("🌱 Starting seed...\n");
    console.log("🔍 Running seedOwner...");
    const owner = await (0, owner_seed_1.seedOwner)(prisma);
    console.log("✅ seedOwner done");
    await (0, plans_seed_1.seedPlans)(prisma);
    await (0, settings_seed_1.seedSettings)(prisma, owner.id);
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
//# sourceMappingURL=index.js.map