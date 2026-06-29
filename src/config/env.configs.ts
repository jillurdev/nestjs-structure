import * as dotenv from "dotenv";
dotenv.config();

const e = process.env;

export const configs = {
	// ─── App ─────────────────────────────────
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

	// ─── Database ────────────────────────────
	database: {
		url: e.DATABASE_URL || "",
	},

	// ─── JWT ─────────────────────────────────
	jwt: {
		secret: e.JWT_SECRET || "",
		expiresIn: e.JWT_EXPIRES_IN || "7d",
		refreshSecret: e.JWT_REFRESH_SECRET || "",
		refreshExpiresIn: e.JWT_REFRESH_EXPIRES_IN || "30d",
	},

	// ─── OTP ─────────────────────────────────
	otp: {
		expiresMinutes: parseInt(e.OTP_EXPIRES_MINUTES || "5", 10),
		length: parseInt(e.OTP_LENGTH || "6", 10),
	},

	// ─── SMS ─────────────────────────────────
	sms: {
		gatewayUrl: e.SMS_GATEWAY_URL || "",
		apiKey: e.SMS_GATEWAY_API_KEY || "",
		senderId: e.SMS_SENDER_ID || "TakaNibo",
	},

	// ─── Firebase ────────────────────────────
	firebase: {
		projectId: e.FIREBASE_PROJECT_ID || "",
		clientEmail: e.FIREBASE_CLIENT_EMAIL || "",
		privateKey: (e.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
	},

	// ─── Cloudinary ──────────────────────────
	cloudinary: {
		cloudName: e.CLOUDINARY_CLOUD_NAME || "",
		apiKey: e.CLOUDINARY_API_KEY || "",
		apiSecret: e.CLOUDINARY_API_SECRET || "",
	},

	// ─── Reward ──────────────────────────────
	reward: {
		perAdBasic: parseFloat(e.REWARD_PER_AD_BASIC || "0.5"),
		perAdPremium: parseFloat(e.REWARD_PER_AD_PREMIUM || "1.0"),
		dailyLimitBasic: parseInt(e.DAILY_LIMIT_BASIC || "5", 10),
		dailyLimitPremium: parseInt(e.DAILY_LIMIT_PREMIUM || "50", 10),
		minWithdrawalBasic: parseFloat(e.MIN_WITHDRAWAL_BASIC || "100"),
		minWithdrawalPremium: parseFloat(e.MIN_WITHDRAWAL_PREMIUM || "50"),
		referralBonus: parseFloat(e.REFERRAL_BONUS || "10"),
	},

	// ─── Subscription ────────────────────────
	subscription: {
		premiumPrice: parseFloat(e.PREMIUM_PRICE || "99"),
		premiumDurationDays: parseInt(e.PREMIUM_DURATION_DAYS || "30", 10),
	},

	// ─── Rate Limiting ───────────────────────
	throttle: {
		ttl: parseInt(e.THROTTLE_TTL || "60", 10),
		limit: parseInt(e.THROTTLE_LIMIT || "30", 10),
	},

	// ─── Owner Seed ──────────────────────────
	owner: {
		name: e.OWNER_NAME || "",
		phone: e.OWNER_PHONE || "",
		email: e.OWNER_EMAIL || "",
		password: e.OWNER_PASSWORD || "",
	},
} as const;
