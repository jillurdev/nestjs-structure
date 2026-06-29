export declare const configs: {
    readonly app: {
        readonly name: string;
        readonly env: string;
        readonly port: number;
        readonly url: string;
        readonly frontendUrl: string;
        readonly allowedOrigins: string[];
        readonly isProduction: boolean;
        readonly isDevelopment: boolean;
    };
    readonly database: {
        readonly url: string;
    };
    readonly jwt: {
        readonly secret: string;
        readonly expiresIn: string;
        readonly refreshSecret: string;
        readonly refreshExpiresIn: string;
    };
    readonly otp: {
        readonly expiresMinutes: number;
        readonly length: number;
    };
    readonly sms: {
        readonly gatewayUrl: string;
        readonly apiKey: string;
        readonly senderId: string;
    };
    readonly firebase: {
        readonly projectId: string;
        readonly clientEmail: string;
        readonly privateKey: string;
    };
    readonly cloudinary: {
        readonly cloudName: string;
        readonly apiKey: string;
        readonly apiSecret: string;
    };
    readonly reward: {
        readonly perAdBasic: number;
        readonly perAdPremium: number;
        readonly dailyLimitBasic: number;
        readonly dailyLimitPremium: number;
        readonly minWithdrawalBasic: number;
        readonly minWithdrawalPremium: number;
        readonly referralBonus: number;
    };
    readonly subscription: {
        readonly premiumPrice: number;
        readonly premiumDurationDays: number;
    };
    readonly throttle: {
        readonly ttl: number;
        readonly limit: number;
    };
    readonly owner: {
        readonly name: string;
        readonly phone: string;
        readonly email: string;
        readonly password: string;
    };
};
