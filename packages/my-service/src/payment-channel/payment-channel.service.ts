import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentChannelDto } from './payment-channel.dto';
import { LanguageEnum, PaymentChannelStatusEnum } from '@prisma/client';

@Injectable()
export class PaymentChannelService {
  constructor(private readonly prisma: PrismaService) {}

  async getActivePaymentChannels({
    language,
  }: {
    language: LanguageEnum;
  }): Promise<PaymentChannelDto[]> {
    const paymentChannels = await this.prisma.paymentChannel.findMany({
      where: {
        statusId: PaymentChannelStatusEnum.Active,
      },
      include: {
        logo: true,
        metadatas: {
          where: {
            languageId: language,
          },
        },
      },
    });
    return paymentChannels.map(
      (channel) =>
        new PaymentChannelDto({
          ...channel,
          metadata: channel.metadatas[0],
        }),
    );
  }
}
