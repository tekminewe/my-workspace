export interface SendEmailOptions {
  from: string;
  to: string[];
  subject: string;
  text?: string;
  html?: string;
}

export interface SendEmailResponse {
  messageId: string;
}

export interface IEmailClient {
  send(data: SendEmailOptions): Promise<SendEmailResponse>;
}

export abstract class EmailClient implements IEmailClient {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  send(data: SendEmailOptions): Promise<SendEmailResponse> {
    throw new Error('Method not implemented.');
  }
}
