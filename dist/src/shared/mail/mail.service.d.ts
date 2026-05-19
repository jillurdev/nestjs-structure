import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly config;
    private resend;
    private from;
    constructor(config: ConfigService);
    sendVerificationEmail(to: string, name: string, otp: string): Promise<void>;
}
