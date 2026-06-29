"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAds = seedAds;
const client_1 = require("@prisma/client");
async function seedAds(prisma, ownerId) {
    const existing = await prisma.ad.count();
    if (existing > 0) {
        console.log("⏭️  Ads already exist — skipping");
        return;
    }
    const ads = [
        {
            title: "গ্রামীণফোন অফার",
            description: "গ্রামীণফোনের বিশেষ ডেটা অফার",
            adNetwork: client_1.AdNetwork.ADMOB,
            adType: client_1.AdType.REWARDED_VIDEO,
            adUnitId: "ca-app-pub-test/rewarded",
            rewardAmount: 1.0,
            durationSeconds: 30,
            targetBasic: true,
            targetPremium: true,
            priority: 10,
        },
        {
            title: "বিকাশ ক্যাশব্যাক",
            description: "বিকাশে পেমেন্টে ক্যাশব্যাক",
            adNetwork: client_1.AdNetwork.UNITY,
            adType: client_1.AdType.REWARDED_VIDEO,
            rewardAmount: 1.0,
            durationSeconds: 30,
            targetBasic: true,
            targetPremium: true,
            priority: 9,
        },
        {
            title: "Daraz Sale",
            description: "দারাজ মেগা সেল",
            adNetwork: client_1.AdNetwork.ADMOB,
            adType: client_1.AdType.INTERSTITIAL,
            rewardAmount: 0.5,
            durationSeconds: 15,
            targetBasic: true,
            targetPremium: true,
            priority: 8,
        },
        {
            title: "Shajgoj Beauty",
            description: "সাজগোজ বিউটি প্রোডাক্ট",
            adNetwork: client_1.AdNetwork.ADMOB,
            adType: client_1.AdType.BANNER,
            rewardAmount: 0.5,
            durationSeconds: 15,
            targetBasic: true,
            targetPremium: true,
            priority: 7,
        },
        {
            title: "Robi Offer",
            description: "রবির বিশেষ অফার — Premium only",
            adNetwork: client_1.AdNetwork.IRONSOURCE,
            adType: client_1.AdType.REWARDED_VIDEO,
            rewardAmount: 1.0,
            durationSeconds: 30,
            targetBasic: false,
            targetPremium: true,
            priority: 6,
        },
        {
            title: "Chaldal Grocery",
            description: "চালডাল ফ্রেশ গ্রোসারি — Premium only",
            adNetwork: client_1.AdNetwork.APPLOVIN,
            adType: client_1.AdType.REWARDED_VIDEO,
            rewardAmount: 1.0,
            durationSeconds: 30,
            targetBasic: false,
            targetPremium: true,
            priority: 5,
        },
    ];
    for (const ad of ads) {
        await prisma.ad.create({
            data: { ...ad, createdBy: ownerId },
        });
    }
    console.log(`✅ ${ads.length} test ads seeded`);
}
//# sourceMappingURL=ads.seed.js.map