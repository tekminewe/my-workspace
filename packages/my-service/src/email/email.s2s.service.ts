import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  UpdateEmailStatusDto,
  SendEmailDto,
  SendEmailResponseDto,
  CustomSendEmailDto,
} from './email.s2s.dto';
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import * as AWSXRay from 'aws-xray-sdk';
import { EmailStatusEnum } from '@prisma/client';
import { EmailClient } from './base.client';
import * as b64 from 'base64-js';
import * as encryptionSdk from '@aws-crypto/client-node';

const { decrypt } = encryptionSdk.buildClient(
  encryptionSdk.CommitmentPolicy.REQUIRE_ENCRYPT_ALLOW_DECRYPT,
);
const generatorKeyId = process.env.AUTH_KMS_KEY_ALIAS;
const keyIds = [process.env.AUTH_KMS_KEY_ID];
const keyring = new encryptionSdk.KmsKeyringNode({
  generatorKeyId,
  keyIds,
});
@Injectable()
export class EmailS2SService {
  private readonly sqsClient = AWSXRay.captureAWSv3Client(new SQSClient());

  constructor(
    private readonly db: PrismaService,
    private readonly emailClient: EmailClient,
  ) {}

  async sendEmail(data: SendEmailDto) {
    return this.sqsClient.send(
      new SendMessageCommand({
        QueueUrl: process.env.SEND_EMAIL_QUEUE,
        MessageBody: JSON.stringify(data),
      }),
    );
  }

  async processEmailQueue(data: SendEmailDto) {
    return this.db.$transaction(async (tx) => {
      if (!data.userId) {
        const emailLog = await tx.emailLog.findUniqueOrThrow({
          where: {
            id: data.emailLogId,
          },
        });

        if (emailLog.retryCount >= 1) {
          throw new BadRequestException('email_retry_limit_reached');
        }

        const emailSuppression = await tx.emailSuppression.findFirst({
          where: {
            emailAddress: emailLog.emailAddress,
          },
        });

        if (emailSuppression) {
          throw new BadRequestException('email_address_suppressed');
        }
        const sendResult = await this.emailClient.send({
          from: `${process.env.EMAIL_SENDER} <noreply@${process.env.EMAIL_DOMAIN}>`,
          to: [emailLog.emailAddress],
          subject: emailLog.subject,
          html: emailLog.htmlContent,
        });

        try {
          await tx.emailLog.update({
            where: {
              id: emailLog.id,
            },
            data: {
              messageId: sendResult.messageId,
              retryCount: emailLog.retryCount + 1,
            },
          });
        } catch (error) {
          console.error('Failed to update email log with messageId', error);
        }

        return new SendEmailResponseDto({
          emailLogId: emailLog.id,
        });
      } else if (data.userId) {
        const user = await tx.user.findUnique({
          where: {
            id: data.userId,
          },
        });

        if (!user) {
          return new SendEmailResponseDto({
            emailLogId: '',
          });
        }

        const emailSuppression = await tx.emailSuppression.findFirst({
          where: {
            emailAddress: user.email,
          },
        });

        if (emailSuppression) {
          throw new BadRequestException('email_address_suppressed');
        }

        const emailLog = await tx.emailLog.create({
          data: {
            emailAddress: user.email,
            userId: user.id,
            subject: data.subject,
            htmlContent: data.htmlContent,
          },
        });

        const sendResult = await this.emailClient.send({
          from: `${process.env.EMAIL_SENDER} <noreply@${process.env.EMAIL_DOMAIN}>`,
          to: [emailLog.emailAddress],
          subject: emailLog.subject,
          html: emailLog.htmlContent,
        });

        try {
          await tx.emailLog.update({
            where: {
              id: emailLog.id,
            },
            data: {
              messageId: sendResult.messageId,
            },
          });
        } catch (error) {
          console.error('Failed to update email log with messageId', error);
        }

        return new SendEmailResponseDto({
          emailLogId: emailLog.id,
        });
      }
    });
  }

  async updateEmailStatus(data: UpdateEmailStatusDto) {
    const emailLog = await this.db.emailLog.findUnique({
      where: {
        messageId: data.messageId,
        status: EmailStatusEnum.PENDING,
      },
    });

    if (emailLog) {
      try {
        await this.db.emailLog.update({
          where: {
            id: emailLog.id,
          },
          data: {
            status: data.status,
            sentAt:
              data.status === EmailStatusEnum.DELIVERED
                ? new Date()
                : undefined,
          },
        });
      } catch (error) {
        console.error(error);
        throw new BadRequestException('email_log_update_failed');
      }
    }

    if (data.status === EmailStatusEnum.SOFT_BOUNCED) {
      if (emailLog.retryCount > 0) {
        await this.db.emailLog.update({
          where: {
            id: emailLog.id,
          },
          data: {
            status: EmailStatusEnum.BOUNCED,
          },
        });
      } else {
        await this.sqsClient.send(
          new SendMessageCommand({
            QueueUrl: process.env.SEND_EMAIL_QUEUE,
            MessageBody: JSON.stringify(
              new SendEmailDto({
                emailLogId: emailLog.id,
              }),
            ),
            DelaySeconds: 60 * 15,
          }),
        );
      }
    }

    if (
      data.status === EmailStatusEnum.BOUNCED ||
      data.status === EmailStatusEnum.COMPLAINT
    ) {
      try {
        await this.db.emailBounceComplaint.create({
          data: {
            emailAddress: emailLog.emailAddress,
            emailLogId: emailLog.id,
            type: data.status,
          },
        });
      } catch (error) {
        console.error(error);
        throw new BadRequestException('email_bounce_complaint_create_failed');
      }

      const emailToSuppress = emailLog?.emailAddress ?? data.email;
      try {
        await this.db.emailSuppression.create({
          data: {
            emailAddress: emailToSuppress,
            reason: data.status,
          },
        });
      } catch (error) {
        console.error(error);
        throw new BadRequestException('email_suppression_create_failed');
      }
    }

    return new SendEmailResponseDto({
      emailLogId: emailLog?.id,
    });
  }

  async sendWelcomeEmail(data: CustomSendEmailDto) {
    const user = await this.db.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        profile: true,
      },
    });
    const site = await this.db.site.findFirst({
      include: {
        metadatas: {
          include: {
            logo: true,
          },
          where: {
            languageId: user.profile.languageId,
          },
        },
      },
    });
    const siteName = site.metadatas[0].name;
    const siteLogo = `${process.env.MEDIA_URL}/${site.metadatas[0].logo.filePath}`;
    const userName = user.profile.firstName;
    const verificationLink = `https://${process.env.AUTH_DOMAIN}/confirmUser?client_id=${process.env.COGNITO_CLIENT_ID}&user_name=${data.providerAccountId}&confirmation_code=${await this.getPlainCode(
      {
        encryptedCode: data.encryptedCode ?? '',
      },
    )}`;

    return this.sendEmail({
      userId: user.id,
      subject: 'Verify Your Email Address',
      htmlContent: `
        <!doctype html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Verify Your Email Address</title>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background-color: #f8f9fa;
                margin: 0;
                padding: 0;
                color: #333333;
              }
              .container {
                width: 100%;
                max-width: 600px;
                margin: 30px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .logo {
                text-align: center;
                margin-bottom: 20px;
              }
              .logo img {
                max-width: 150px;
              }
              .header {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                color: #2c3e50;
                margin-bottom: 10px;
              }
              .content {
                font-size: 16px;
                line-height: 1.6;
                text-align: center;
              }
              .cta-button {
                display: inline-block;
                margin-top: 20px;
                padding: 14px 24px;
                background-color: #28a745;
                color: #ffffff;
                text-decoration: none;
                font-size: 18px;
                font-weight: bold;
                border-radius: 6px;
                transition: 0.3s ease-in-out;
              }
              .cta-button:hover {
                background-color: #218838;
              }
              .footer {
                margin-top: 30px;
                text-align: center;
                font-size: 14px;
                color: #777;
                padding-top: 20px;
                border-top: 1px solid #ddd;
              }
              .footer a {
                color: #007bff;
                text-decoration: none;
              }
              .footer a:hover {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <!-- Logo Section -->
              <div class="logo">
                <img src="${siteLogo}" alt="${siteName}" />
              </div>

              <!-- Header Section -->
              <div class="header">
                ✅ Verify Your Email Address
              </div>

              <!-- Content Section -->
              <div class="content">
                <p>Dear <strong>${userName}</strong>,</p>
                <p>
                  Thank you for signing up with <strong>${siteName}</strong>! Before you get started,
                  please verify your email address by clicking the button below.
                </p>
                <a href="${verificationLink}" class="cta-button">Verify Email</a>
                <p>
                  If you did not create an account with us, please ignore this email.
                </p>
              </div>

              <!-- Footer Section -->
              <div class="footer">
                <p>&copy; 2025 <strong>${siteName}</strong>. All Rights Reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
  }

  async sendForgotPasswordEmail(data: CustomSendEmailDto) {
    const user = await this.db.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        profile: true,
      },
    });
    const site = await this.db.site.findFirst({
      include: {
        metadatas: {
          include: {
            logo: true,
          },
          where: {
            languageId: user.profile.languageId,
          },
        },
      },
    });
    const siteName = site.metadatas[0].name;
    const siteLogo = `${process.env.MEDIA_URL}/${site.metadatas[0].logo.filePath}`;
    const userName = user.profile.firstName;
    const resetCode = await this.getPlainCode({
      encryptedCode: data.encryptedCode ?? '',
    });

    return this.sendEmail({
      userId: user.id,
      subject: 'Reset Your Password',
      htmlContent: `
        <!doctype html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Reset Your Password</title>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background-color: #f8f9fa;
                margin: 0;
                padding: 0;
                color: #333333;
              }
              .container {
                width: 100%;
                max-width: 600px;
                margin: 30px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .logo {
                text-align: center;
                margin-bottom: 20px;
              }
              .logo img {
                max-width: 150px;
              }
              .header {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                color: #2c3e50;
                margin-bottom: 10px;
              }
              .content {
                font-size: 16px;
                line-height: 1.6;
                text-align: center;
              }
              .code-box {
                display: inline-block;
                margin-top: 20px;
                padding: 14px 24px;
                background-color: #dc3545;
                color: #ffffff;
                font-size: 18px;
                font-weight: bold;
                border-radius: 6px;
              }
              .footer {
                margin-top: 30px;
                text-align: center;
                font-size: 14px;
                color: #777;
                padding-top: 20px;
                border-top: 1px solid #ddd;
              }
              .footer a {
                color: #007bff;
                text-decoration: none;
              }
              .footer a:hover {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <!-- Logo Section -->
              <div class="logo">
                <img src="${siteLogo}" alt="${siteName}" />
              </div>

              <!-- Header Section -->
              <div class="header">
                🔒 Reset Your Password
              </div>

              <!-- Content Section -->
              <div class="content">
                <p>Dear <strong>${userName}</strong>,</p>
                <p>
                  We received a request to reset your password for your account on <strong>${siteName}</strong>.
                  Use the code below to set a new password:
                </p>
                <div class="code-box">${resetCode}</div>
                <p>
                  If you did not request a password reset, please ignore this email or contact support if you have any concerns.
                </p>
              </div>

              <!-- Footer Section -->
              <div class="footer">
                <p>&copy; 2025 <strong>${siteName}</strong>. All Rights Reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
  }

  private async getPlainCode({ encryptedCode }: { encryptedCode: string }) {
    const { plaintext } = await decrypt(
      keyring,
      b64.toByteArray(encryptedCode),
    );
    return plaintext.toString();
  }
}
