"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedOwner = seedOwner;
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
async function seedOwner(prisma) {
    console.log("🔍 Checking existing owner...");
    const existing = await prisma.user.findFirst({
        where: { role: client_1.Role.OWNER },
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
            referralCode: "TN-000000",
            passwordHash,
            role: client_1.Role.OWNER,
            subscriptionType: client_1.SubscriptionType.PREMIUM,
            isActive: true,
        },
    });
    console.log(`✅ Owner created: ${owner.phone}`);
    return owner;
}
//# sourceMappingURL=owner.seed.js.map