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
exports.configs = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const e = process.env;
exports.configs = {
    app: {
        name: e.APP_NAME || "TakaNibo",
        env: e.NODE_ENV || "development",
        port: parseInt(e.PORT || "5000", 10),
        url: e.APP_URL || "http://localhost:5000",
        frontendUrl: e.FRONTEND_URL || "http://localhost:3000",
        allowedOrigins: (e.ALLOWED_ORIGINS || "http://localhost:3000").split(","),
        isProduction: e.NODE_ENV === "production",
        isDevelopment: e.NODE_ENV === "development",
    },
    database: {
        url: e.DATABASE_URL || "",
    },
    jwt: {
        secret: e.JWT_SECRET || "",
        expiresIn: e.JWT_EXPIRES_IN || "7d",
        refreshSecret: e.JWT_REFRESH_SECRET || "",
        refreshExpiresIn: e.JWT_REFRESH_EXPIRES_IN || "30d",
    },
    otp: {
        expiresMinutes: parseInt(e.OTP_EXPIRES_MINUTES || "5", 10),
        length: parseInt(e.OTP_LENGTH || "6", 10),
    },
    sms: {
        gatewayUrl: e.SMS_GATEWAY_URL || "",
        apiKey: e.SMS_GATEWAY_API_KEY || "",
        senderId: e.SMS_SENDER_ID || "TakaNibo",
    },
    firebase: {
        projectId: e.FIREBASE_PROJECT_ID || "",
        clientEmail: e.FIREBASE_CLIENT_EMAIL || "",
        privateKey: (e.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    },
    cloudinary: {
        cloudName: e.CLOUDINARY_CLOUD_NAME || "",
        apiKey: e.CLOUDINARY_API_KEY || "",
        apiSecret: e.CLOUDINARY_API_SECRET || "",
    },
    reward: {
        perAdBasic: parseFloat(e.REWARD_PER_AD_BASIC || "0.5"),
        perAdPremium: parseFloat(e.REWARD_PER_AD_PREMIUM || "1.0"),
        dailyLimitBasic: parseInt(e.DAILY_LIMIT_BASIC || "5", 10),
        dailyLimitPremium: parseInt(e.DAILY_LIMIT_PREMIUM || "50", 10),
        minWithdrawalBasic: parseFloat(e.MIN_WITHDRAWAL_BASIC || "100"),
        minWithdrawalPremium: parseFloat(e.MIN_WITHDRAWAL_PREMIUM || "50"),
        referralBonus: parseFloat(e.REFERRAL_BONUS || "10"),
    },
    subscription: {
        premiumPrice: parseFloat(e.PREMIUM_PRICE || "99"),
        premiumDurationDays: parseInt(e.PREMIUM_DURATION_DAYS || "30", 10),
    },
    throttle: {
        ttl: parseInt(e.THROTTLE_TTL || "60", 10),
        limit: parseInt(e.THROTTLE_LIMIT || "30", 10),
    },
    owner: {
        name: e.OWNER_NAME || "",
        phone: e.OWNER_PHONE || "",
        email: e.OWNER_EMAIL || "",
        password: e.OWNER_PASSWORD || "",
    },
};
//# sourceMappingURL=env.configs.js.map