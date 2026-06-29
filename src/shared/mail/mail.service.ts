import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { configs } from '@/config';

@Injectable()
export class MailService {
  private resend: Resend;
  private from: string;

  constructor() {
    this.resend = new Resend(configs.mail.resendApiKey);
    this.from = configs.mail.from;
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

  async sendPasswordResetEmail(to: string, name: string, resetLink: string) {
    await this.resend.emails.send({
      from: this.from,
      to,
      subject: 'Reset your password',
      html: `
        <h2>Hi ${name}!</h2>
        <p>We received a request to reset your password. Click the link below to continue:</p>
        <p><a href="${resetLink}" style="display:inline-block;padding:10px 20px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">Reset Password</a></p>
        <p>If you didn't request this, you can safely ignore this email. This link expires in 15 minutes.</p>
      `,
    });
  }

  async sendPurchaseConfirmationEmail(
    to: string,
    name: string,
    productTitle: string,
    amountUsd: number,
  ) {
    await this.resend.emails.send({
      from: this.from,
      to,
      subject: `Your purchase: ${productTitle}`,
      html: `
        <h2>Thank you, ${name}!</h2>
        <p>Your purchase of <strong>${productTitle}</strong> for <strong>$${amountUsd.toFixed(2)} USD</strong> was successful.</p>
        <p>You can now download it from your dashboard.</p>
      `,
    });
  }

  async sendBroadcastEmail(
    to: string,
    name: string,
    subject: string,
    body: string,
  ) {
    await this.resend.emails.send({
      from: this.from,
      to,
      subject,
      html: `
        <p>Hi ${name},</p>
        <div>${body}</div>
      `,
    });
  }
}
