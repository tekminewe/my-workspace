import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AdvertiserCommissionTypeEnum,
  AdvertiserStatusEnum,
  AffiliateProviderEnum,
  UserCashbackStatusEnum,
  UserWalletStatusEnum,
  UserWalletTransactionStatusEnum,
  UserWalletTransactionTypeEnum,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProcessUserCashbackDto } from './user-cashback.s2s.dto';
import { EmailS2SService } from 'src/email/email.s2s.service';
import { BonusService } from 'src/bonus/bonus.service';
import { toLocaleCode } from 'src/language.utils';

@Injectable()
export class UserCashbackS2SService {
  constructor(
    private readonly db: PrismaService,
    private readonly emailService: EmailS2SService,
    private readonly bonusService: BonusService,
  ) {}

  async processUserCashback(dto: ProcessUserCashbackDto) {
    const {
      userClickId,
      providerReferenceId,
      status,
      advertiserOrderId,
      currencyId,
      amount,
      date,
    } = dto;

    const userClick = await this.db.userAdvertiserClick.findUnique({
      where: {
        id: userClickId,
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!userClick) {
      throw new BadRequestException(
        'user_advertiser_click not found: ' + userClickId,
      );
    }

    const advertiserCommission = await this.db.advertiserCommission.findFirst({
      where: {
        advertiserId: userClick.advertiserId,
        statusId: AdvertiserStatusEnum.Active,
        provider: {
          id: AffiliateProviderEnum.InvolveAsia,
          statusId: AdvertiserStatusEnum.Active,
        },
      },
      select: {
        commissionShare: true,
        commissionShareType: true,
      },
    });

    if (!advertiserCommission) {
      throw new BadRequestException(
        'No active InvolveAsia advertiser commission found',
      );
    }

    const existingCashback = await this.db.userCashback.findUnique({
      where: {
        providerReferenceId,
      },
      include: {
        currency: true,
      },
    });

    const site = await this.db.site.findFirst({
      include: {
        metadatas: {
          include: {
            logo: true,
          },
          where: {
            languageId: userClick.user.profile.languageId,
          },
        },
      },
    });

    if (existingCashback) {
      await this.db.$transaction(async (tx) => {
        if (status.toLowerCase() === 'approved') {
          let wallet = await tx.userWallet.findFirst({
            where: {
              userId: existingCashback.userId,
              currencyId: existingCashback.currency.id,
            },
          });
          if (!wallet) {
            wallet = await tx.userWallet.create({
              data: {
                userId: existingCashback.userId,
                currencyId: existingCashback.currency.id,
                statusId: UserWalletStatusEnum.Active,
                balance: 0,
              },
            });
          }
          const balanceAfter = wallet.balance + existingCashback.netAmount;
          if (balanceAfter < 0) {
            throw new BadRequestException('Insufficient balance');
          }

          await tx.userWalletTransactionLog.create({
            data: {
              walletId: wallet.id,
              currencyId: existingCashback.currency.id,
              balanceBefore: wallet.balance,
              balanceAfter: balanceAfter,
              amount: existingCashback.netAmount,
              typeId: UserWalletTransactionTypeEnum.AffiliateCashback,
              reference: existingCashback.id,
              statusId: UserWalletTransactionStatusEnum.Completed,
            },
          });

          await tx.userWallet.update({
            where: {
              id: wallet.id,
            },
            data: {
              balance: balanceAfter,
            },
          });

          // Process bonus for approved cashback
          try {
            const bonusResult = await this.bonusService.processBonusForCashback(
              existingCashback.userId,
              existingCashback.id,
              existingCashback.netAmount,
              existingCashback.currencyId,
              dto.providerReferenceId,
              tx, // Pass the transaction context
            );

            if (bonusResult.success && bonusResult.bonusAmount > 0) {
              // Add bonus amount to wallet
              const bonusBalanceAfter = balanceAfter + bonusResult.bonusAmount;

              await tx.userWalletTransactionLog.create({
                data: {
                  walletId: wallet.id,
                  currencyId: existingCashback.currency.id,
                  balanceBefore: balanceAfter,
                  balanceAfter: bonusBalanceAfter,
                  amount: bonusResult.bonusAmount,
                  typeId: UserWalletTransactionTypeEnum.FirstCashbackBonus,
                  reference: bonusResult.bonusTransactionId,
                  statusId: UserWalletTransactionStatusEnum.Completed,
                },
              });

              await tx.userWallet.update({
                where: { id: wallet.id },
                data: { balance: bonusBalanceAfter },
              });

              console.log(
                `Bonus processed for user ${existingCashback.userId}: ${bonusResult.bonusAmount} ${existingCashback.currencyId}`,
              );
            }
          } catch (bonusError) {
            console.error('Bonus processing failed:', bonusError);
            // Don't throw - bonus failure shouldn't break cashback processing
          }
        }

        const userCashback = await this.db.userCashback.findFirst({
          where: {
            providerReferenceId,
            statusId: UserCashbackStatusEnum.Approved,
          },
          include: {
            advertiser: {
              include: {
                commissions: {
                  where: {
                    statusId: AdvertiserStatusEnum.Active,
                    provider: {
                      id: AffiliateProviderEnum.InvolveAsia,
                      statusId: AdvertiserStatusEnum.Active,
                    },
                  },
                },
                metadatas: {
                  where: {
                    languageId: userClick.user.profile.languageId,
                  },
                },
              },
            },
            user: {
              include: {
                profile: true,
              },
            },
          },
        });

        await this.db.userCashback.update({
          where: {
            providerReferenceId,
          },
          data: {
            statusId: this.mapStatusToEnum(status),
          },
        });

        const merchantName = userCashback.advertiser.metadatas[0].name;
        const cashbackAmount = userCashback.netAmount.toLocaleString(
          toLocaleCode(userCashback.user.profile.languageId),
          {
            style: 'currency',
            currency: userCashback.currencyId,
          },
        );
        const siteName = site.metadatas[0].name;
        const siteLogo = `${process.env.MEDIA_URL}/${site.metadatas[0].logo.filePath}`;
        const userName = userCashback.user.profile.firstName;
        const orderId = userCashback.advertiserOrderId;
        const ctaDestination = site.domain;

        await this.emailService.sendEmail({
          userId: userClick.userId,
          subject: 'Congratulations! Your Cashback is confirmed 🎉',
          htmlContent: `<!doctype html>
            <html>
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Your Cashback Has Been Confirmed!</title>
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
                  .cashback-amount {
                    font-size: 22px;
                    font-weight: bold;
                    color: #28a745;
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
                    🎉 Congratulations! Your Cashback is Confirmed! 🎉
                  </div>

                  <!-- Content Section -->
                  <div class="content">
                    <p>Dear <strong>${userName}</strong>,</p>
                    <p>
                      Your cashback for your recent purchase at <strong>${merchantName}</strong>
                      has been successfully confirmed and is now available in your account.
                    </p>

                    <p><strong>Transaction Details:</strong></p>
                    <div class="transaction-details">
                      <p><strong>Order ID:</strong> ${orderId}</p>
                      <p><strong>Merchant:</strong> ${merchantName}</p>
                      <p><strong>Cashback Amount:</strong> ${cashbackAmount}</p>
                    </div>

                    <p>
                      You can now withdraw your cashback to
                      your preferred payment method.
                    </p>

                    <a href="${ctaDestination}" class="cta-button">View Cashback Balance</a>
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
      });

      console.log('Cashback status updated successfully');
    } else {
      if (status.toLowerCase() !== 'pending') {
        throw new BadRequestException(
          `Cashback not found but the postback status is not pending: ${providerReferenceId}`,
        );
      }
      const share =
        advertiserCommission.commissionShareType.id ===
        AdvertiserCommissionTypeEnum.Percentage
          ? +((amount * advertiserCommission.commissionShare) / 100).toFixed(2)
          : amount - advertiserCommission.commissionShare;

      const dateTimeConversion = decodeURIComponent(date);
      const localDate = new Date(
        dateTimeConversion.replace(' ', 'T') + '+08:00',
      );
      const utcDate = new Date(
        localDate.getTime() - localDate.getTimezoneOffset() * 60000,
      );

      const userCashback = await this.db.userCashback.create({
        data: {
          userId: userClick.userId,
          advertiserOrderId,
          providerReferenceId,
          amount: amount,
          share,
          netAmount: amount - share,
          statusId: this.mapStatusToEnum(status),
          currencyId,
          advertiserId: userClick.advertiserId,
          createdAt: utcDate.toISOString(),
        },
        include: {
          advertiser: {
            include: {
              commissions: {
                where: {
                  statusId: AdvertiserStatusEnum.Active,
                  provider: {
                    id: AffiliateProviderEnum.InvolveAsia,
                    statusId: AdvertiserStatusEnum.Active,
                  },
                },
              },
              metadatas: {
                where: {
                  languageId: 'EN_MY', // TODO: Get the language from the user
                },
              },
            },
          },
          user: {
            include: {
              profile: true,
            },
          },
        },
      });

      // Auto-enroll user for first cashback bonus if this is their first cashback
      try {
        const existingCashbackCount = await this.db.userCashback.count({
          where: {
            userId: userClick.userId,
            statusId: {
              not: UserCashbackStatusEnum.Rejected,
            },
          },
        });

        // If this is their first cashback (count = 1 because we just created one), enroll for bonus
        if (existingCashbackCount === 1) {
          await this.bonusService.autoEnrollFirstCashbackBonus(
            userClick.userId,
          );
          console.log(
            `Auto-enrolled user ${userClick.userId} for first cashback bonus`,
          );
        }
      } catch (bonusError) {
        console.error('Bonus enrollment failed:', bonusError);
        // Don't throw - bonus failure shouldn't break cashback processing
      }

      const userName = userCashback.user.profile.firstName;
      const merchantName = userCashback.advertiser.metadatas[0].name;
      const cashbackAmount = userCashback.netAmount.toLocaleString(
        toLocaleCode(userCashback.user.profile.languageId),
        {
          style: 'currency',
          currency: userCashback.currencyId,
        },
      );
      const siteName = site.metadatas[0].name;
      const siteLogo = `${process.env.MEDIA_URL}/${site.metadatas[0].logo.filePath}`;
      const orderId = userCashback.advertiserOrderId;
      const dayToConfirm =
        userCashback.advertiser.commissions[0].dayToPayout +
        userCashback.advertiser.commissions[0].dayToValidate;
      const ctaDestination = site.domain;

      await this.emailService.sendEmail({
        userId: userClick.userId,
        subject: 'Your Cashback is recorded 🎉',
        htmlContent: `<!doctype html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Your Cashback is recorded 🎉</title>
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
                  background-color: #00bf63;
                  color: #ffffff;
                  text-decoration: none;
                  font-size: 18px;
                  font-weight: bold;
                  border-radius: 6px;
                  transition: 0.3s ease-in-out;
                }
                .cta-button:hover {
                  background-color: #00b358;
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
                  color: #00bf63;
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
                <div class="header">⏳ Your Cashback is Pending Confirmation ⏳</div>
                
                <!-- Content Section -->
                <div class="content">
                  <p>Dear <strong>${userName}</strong>,</p>
                  <p>
                    We are happy to inform you that your cashback from
                    <strong>${merchantName}</strong> is now pending confirmation.
                  </p>

                  <p><strong>Transaction Details:</strong></p>
                  <div class="transaction-details">
                    <p><strong>Order ID:</strong> ${orderId}</p>
                    <p><strong>Merchant:</strong> ${merchantName}</p>
                    <p><strong>Cashback Amount:</strong> ${cashbackAmount}</p>
                  </div>

                  <p><strong>What happens next?</strong></p>
                  <p>
                    Your cashback is currently being verified by the merchant and may take
                    <strong>${dayToConfirm} days</strong> to be confirmed.
                  </p>
                  <p>
                    Once approved, it will be available in your balance for withdrawal.
                  </p>

                  <a href="${ctaDestination}" class="cta-button">Check Cashback Status</a>
                </div>

                <!-- Footer Section -->
                <div class="footer">
                  <p>&copy; 2025 <strong>${siteName}</strong>. All Rights Reserved.</p>
                </div>
              </div>
            </body>
          </html>`,
      });
      console.log('Cashback stored successfully');
    }
  }

  private mapStatusToEnum = (status: string): UserCashbackStatusEnum => {
    switch (status.toLowerCase()) {
      case 'pending':
        return UserCashbackStatusEnum.Pending;
      case 'rejected':
        return UserCashbackStatusEnum.Rejected;
      case 'approved':
        return UserCashbackStatusEnum.Approved;
      default:
        throw new BadRequestException(`Unknown status: ${status}`);
    }
  };
}
