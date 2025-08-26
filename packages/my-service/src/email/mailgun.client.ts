import Mailgun from 'mailgun.js';
import { IMailgunClient } from 'mailgun.js/Interfaces';
import {
  EmailClient,
  SendEmailOptions,
  SendEmailResponse,
} from './base.client';

const mailgun = new Mailgun(FormData);

export class MailgunClient extends EmailClient {
  private readonly mailgunClient: IMailgunClient = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
  });

  override async send(data: SendEmailOptions): Promise<SendEmailResponse> {
    try {
      const result = await this.mailgunClient.messages.create(
        process.env.EMAIL_DOMAIN,
        {
          from: data.from,
          to: data.to,
          subject: data.subject,
          text: data.text,
          html: data.html,
        },
      );
      return {
        messageId: result.id.replace(/<|>/g, ''),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
