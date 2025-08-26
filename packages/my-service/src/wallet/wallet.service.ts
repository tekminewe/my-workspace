import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateUserWalletDto,
  CreateUserWalletTransactionDto,
  CreateUserWithdrawalDto,
  WalletErrorCodesEnum,
  WalletDto,
  UserWithdrawalDto,
} from './wallet.dto';
import {
  CurrencyEnum,
  PaymentChannelStatusEnum,
  PaymentDirectionEnum,
  UserPaymentMethodStatusEnum,
  UserWalletStatusEnum,
  UserWalletTransactionStatusEnum,
  UserWalletTransactionTypeEnum,
  UserWithdrawalStatusEnum,
} from '@prisma/client';
import { PrismaTransaction } from 'src/prisma/prisma.types';
import { EmailS2SService } from 'src/email/email.s2s.service';
import { toLocaleCode } from 'src/language.utils';

@Injectable()
export class WalletService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly db: PrismaService,
    private readonly emailService: EmailS2SService,
  ) {}

  createUserWallet(
    data: {
      userId: string;
    } & CreateUserWalletDto,
    options?: {
      transaction?: PrismaTransaction;
    },
  ) {
    const db = options?.transaction || this.db;
    return db.userWallet.create({
      data: {
        userId: data.userId,
        currencyId: data.currency,
        balance: 0,
      },
    });
  }

  async getUserWallet(
    {
      userId,
      currency,
    }: {
      userId: string;
      currency: CurrencyEnum;
    },
    options?: {
      transaction?: PrismaTransaction;
    },
  ) {
    const db = options?.transaction || this.db;
    const wallet = await db.userWallet.findFirst({
      where: {
        userId,
        currencyId: currency,
      },
    });

    if (wallet) {
      return new WalletDto(wallet);
    }

    const newWallet = await this.createUserWallet({ userId, currency });
    return new WalletDto(newWallet);
  }

  createWithdrawalTransaction(
    data: CreateUserWithdrawalDto & { userId: string; userWalletId: string },
  ) {
    return this.db.$transaction(async (tx) => {
      const wallet = await tx.userWallet.findUnique({
        where: {
          id: data.userWalletId,
          statusId: UserWalletStatusEnum.Active,
        },
        include: {
          currency: true,
          user: {
            include: {
              profile: true,
            },
          },
        },
      });

      if (!wallet) {
        throw new BadRequestException(WalletErrorCodesEnum.InvalidWallet);
      }

      const paymentMethod = await tx.userPaymentMethod.findUnique({
        where: {
          id: data.userPaymentMethodId,
          statusId: UserPaymentMethodStatusEnum.Active,
          paymentChannel: {
            statusId: PaymentChannelStatusEnum.Active,
            directionId: {
              in: [PaymentDirectionEnum.Both, PaymentDirectionEnum.Withdrawal],
            },
          },
        },
        include: {
          paymentChannel: {
            include: {
              currencies: true,
              metadatas: {
                where: {
                  languageId: wallet.user.profile.languageId,
                },
              },
            },
          },
        },
      });

      if (!paymentMethod) {
        throw new BadRequestException(
          WalletErrorCodesEnum.InvalidPaymentMethod,
        );
      }

      if (paymentMethod.paymentChannel.minAmount > data.amount) {
        throw new BadRequestException(WalletErrorCodesEnum.BelowMinimumAmount);
      }

      if (paymentMethod.paymentChannel.maxAmount < data.amount) {
        throw new BadRequestException(WalletErrorCodesEnum.ExceedMaximumAmount);
      }

      if (
        !paymentMethod.paymentChannel.currencies.some(
          (c) => c.id === wallet.currencyId,
        )
      ) {
        throw new BadRequestException(WalletErrorCodesEnum.UnsupportedCurrency);
      }

      const withdrawal = await tx.userWithdrawal.create({
        data: {
          walletId: wallet.id,
          currencyId: wallet.currencyId,
          amount: data.amount,
          statusId: UserWithdrawalStatusEnum.Pending,
          processingFee: 0,
          netAmount: data.amount,
          paymentMethodId: data.userPaymentMethodId,
        },
      });

      await this.performTransaction(
        {
          userId: data.userId,
          currency: wallet.currencyId,
          amount: -data.amount,
          transactionType: UserWalletTransactionTypeEnum.Withdrawal,
          referenceId: withdrawal.id,
        },
        { transaction: tx },
      );

      try {
        const site = await this.db.site.findFirst({
          include: {
            metadatas: {
              include: {
                logo: true,
              },
              where: {
                languageId: wallet.user.profile.languageId,
              },
            },
          },
        });
        const siteName = site.metadatas[0].name;
        const siteLogo = `${process.env.MEDIA_URL}/${site.metadatas[0].logo.filePath}`;
        const userName = wallet.user.profile.firstName;
        const ctaDestination = site.domain;
        await this.emailService.sendEmail({
          userId: data.userId,
          subject: 'Your Withdrawal Request is Pending!',
          htmlContent: `<!doctype html>
            <html>
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Your Withdrawal Request is Pending!</title>
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
                  }
                  .pending-status {
                    font-size: 22px;
                    font-weight: bold;
                    color: #ffc107;
                  }
                  .transaction-details {
                    text-align: left;
                    background-color: #f1f1f1;
                    padding: 15px;
                    border-radius: 5px;
                    margin-top: 10px;
                  }
                  .cta-button {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 14px 24px;
                    background-color: #007bff;
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 18px;
                    font-weight: bold;
                    border-radius: 6px;
                    transition: 0.3s ease-in-out;
                  }
                  .cta-button:hover {
                    background-color: #0056b3;
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
                    ⏳ Your Withdrawal Request is Pending! ⏳
                  </div>

                  <!-- Content Section -->
                  <div class="content">
                    <p>Dear <strong>${userName}</strong>,</p>
                    <p>
                      We have received your withdrawal request and it is currently being processed.
                      Please allow some time for us to complete the verification and transfer.
                    </p>

                    <p><strong>Withdrawal Details:</strong></p>
                    <div class="transaction-details">
                      <p><strong>Transaction ID:</strong> ${withdrawal.id}</p>
                      <p><strong>Amount:</strong> ${data.amount.toLocaleString(
                        toLocaleCode(wallet.user.profile.languageId),
                        {
                          style: 'currency',
                          currency: wallet.currencyId,
                        },
                      )}</p>
                      <p><strong>Payment Method:</strong> ${paymentMethod.paymentChannel.metadatas[0]?.name} ${paymentMethod.accountNumber ? '**********' + paymentMethod.accountNumber.slice(-4) : ''}</p>
                      <p><strong>Status:</strong> <span class="pending-status">Pending</span></p>
                    </div>

                    <p>
                      We will notify you once your withdrawal has been processed.
                      You can track the status of your withdrawal in your account.
                    </p>

                    <a href="${ctaDestination}/dashboard" class="cta-button">Check Withdrawal Status</a>
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
      } catch (error) {
        console.error(error);
      }

      return new UserWithdrawalDto(withdrawal);
    });
  }

  private async performTransaction(
    data: CreateUserWalletTransactionDto,
    {
      transaction,
    }: {
      transaction?: PrismaTransaction;
    },
  ) {
    const wallet = await this.getUserWallet(
      {
        userId: data.userId,
        currency: data.currency,
      },
      {
        transaction: transaction,
      },
    );

    const balanceAfter = +wallet.balance + data.amount;
    if (balanceAfter < 0) {
      throw new BadRequestException(WalletErrorCodesEnum.InsufficientBalance);
    }

    const log = await transaction.userWalletTransactionLog.create({
      data: {
        walletId: wallet.id,
        currencyId: data.currency,
        balanceBefore: +wallet.balance,
        balanceAfter: balanceAfter,
        amount: data.amount,
        typeId: data.transactionType,
        reference: data.referenceId,
        description: data.description,
        extra: data.extra,
        statusId: UserWalletTransactionStatusEnum.Completed, // TODO: Think of scenario where transaction will not complete
      },
    });

    await transaction.userWallet.update({
      where: {
        id: wallet.id,
      },
      data: {
        balance: balanceAfter,
      },
    });

    return log;
  }
}
