import * as dotenv from "dotenv";

dotenv.config();

const e = process.env;

export const configs = {
	// ─── App ─────────────────────────────────
	app: {
		name: e.APP_NAME || "VyybeBank",
		env: e.NODE_ENV || "development",
		port: Number(e.PORT || 8080),
		url: e.APP_URL || "http://localhost:8080",
		frontendUrl: e.FRONTEND_URL || "http://localhost:3000",
		allowedOrigins: (e.ALLOWED_ORIGINS || "http://localhost:3000")
			.split(",")
			.map(origin => origin.trim())
			.filter(Boolean),
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

	// resend
	mail: {
		resendApiKey: e.RESEND_API_KEY as string,
		from: e.MAIL_FROM || "noreply@yourdomain.com",
	},

	// ─── OTP ─────────────────────────────────
	otp: {
		expiresMinutes: Number(e.OTP_EXPIRES_MINUTES || 5),
		length: Number(e.OTP_LENGTH || 6),
	},

	// ─── SMS Gateway ─────────────────────────
	sms: {
		gatewayUrl: e.SMS_GATEWAY_URL || "",
		apiKey: e.SMS_GATEWAY_API_KEY || "",
		senderId: e.SMS_SENDER_ID || "VyybeBank",
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

	// ─── Rate Limiting ───────────────────────
	throttle: {
		ttl: Number(e.THROTTLE_TTL || 60),
		limit: Number(e.THROTTLE_LIMIT || 30),
	},

	// ─── Owner Seed ──────────────────────────
	owner: {
		name: e.OWNER_NAME || "",
		phone: e.OWNER_PHONE || "",
		email: e.OWNER_EMAIL || "",
		password: e.OWNER_PASSWORD || "",
	},
} as const;
