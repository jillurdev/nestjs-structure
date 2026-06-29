import { OnModuleInit } from "@nestjs/common";
export declare class FirebaseService implements OnModuleInit {
    private readonly logger;
    onModuleInit(): void;
    sendToToken(fcmToken: string, title: string, body: string, data?: Record<string, string>): Promise<boolean>;
    sendToMany(fcmTokens: string[], title: string, body: string, data?: Record<string, string>): Promise<number>;
}
