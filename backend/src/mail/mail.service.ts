import * as nodemailer from 'nodemailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('MAIL_HOST'),
      port: configService.get('MAIL_PORT'),
      secure: false,
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASS'),
      },
    });
  }

  async sendDailyReminder(
    reciever_email: string,
    reciever_name: string,
    count: number,
  ) {
    /*
        subject AND html ARE GOING TO BE REPLACED WITH REACT EMAIL
    */

    const subject = '📚 Time to repeat your notes';

    const html = `
        <div style="font-family: sans-serif; line-height: 1.5;">
         <h2>Привіт, ${reciever_name}!</h2>
         <p>Today you have <strong>${count}</strong> notes to repeat.</p>
         <p>Don't let them fizzle out — spend 5 minutes for review.</p>
          <a href="${this.configService.get('FRONTEND_URL')}/repetition" 
             style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Go to repetition
          </a>
         </div>
       `;

    try {
      await this.transporter.sendMail({
        from: this.configService.get('MAIL_FROM'),
        to: reciever_email,
        subject,
        html,
      });
    } catch (error: unknown) {
      this.logger.error(`Failed to send email to ${reciever_email}`, error);
    }
  }
}
