import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;
  private from: string;

  constructor(private readonly config: ConfigService) {
    this.resend = new Resend(config.get<string>('RESEND_API_KEY'));
    this.from = config.get<string>('MAIL_FROM') || 'noreply@yourdomain.com';
  }

  async sendVerificationEmail(to: string, name: string, otp: string) {
    await this.resend.emails.send({
      from: this.from,
      to,
      subject: 'Verify your email',
      html: `
        <h2>Hi ${name}!</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing: 8px; font-size: 36px;">${otp}</h1>
        <p>This code expires in 15 minutes.</p>
      `,
    });
  }
}