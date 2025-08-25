import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  PaymentChannelStatusEnum,
  PaymentChannelTypeEnum,
  UserPaymentMethodStatusEnum,
} from '@prisma/client';
import {
  UserPaymentMethodDto,
  CreateUserPaymentMethodDto,
  DeletePaymentMethodResponseDto,
  CreateUserPaymentMethodErrorCodesEnum,
} from './payment-method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly prisma: PrismaService) {}

  async getPaymentMethodsByUserId(
    userId: string,
    paymentChannelType?: PaymentChannelTypeEnum,
  ): Promise<UserPaymentMethodDto[]> {
    const paymentMethods = await this.prisma.userPaymentMethod.findMany({
      where: {
        userId,
        statusId: UserPaymentMethodStatusEnum.Active,
        ...(paymentChannelType && {
          paymentChannel: {
            typeId: paymentChannelType,
          },
        }),
      },
      include: {
        paymentChannel: {
          include: { logo: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return paymentMethods.map((method) => new UserPaymentMethodDto(method));
  }

  async createPaymentMethod(
    data: CreateUserPaymentMethodDto & { userId: string },
  ): Promise<UserPaymentMethodDto | BadRequestException> {
    const paymentChannel = await this.prisma.paymentChannel.findUnique({
      where: { id: data.paymentChannelId },
      include: {
        status: true,
        direction: true,
      },
    });

    if (
      !paymentChannel ||
      paymentChannel.statusId !== PaymentChannelStatusEnum.Active
    ) {
      throw new BadRequestException(
        CreateUserPaymentMethodErrorCodesEnum.InvalidPaymentChannel,
      );
    }

    if (
      paymentChannel.directionId !== 'Both' &&
      paymentChannel.directionId !== data.direction
    ) {
      throw new BadRequestException(
        CreateUserPaymentMethodErrorCodesEnum.InvalidPaymentDirection,
      );
    }

    const numOfUserPaymentMethod = await this.prisma.userPaymentMethod.count({
      where: {
        userId: data.userId,
        statusId: UserPaymentMethodStatusEnum.Active,
      },
    });
    if (numOfUserPaymentMethod >= 5) {
      throw new BadRequestException(
        CreateUserPaymentMethodErrorCodesEnum.ExceedNumOfUserPaymentMethod,
      );
    }

    const paymentMethod = await this.prisma.userPaymentMethod.create({
      data: {
        userId: data.userId,
        accountName: data.accountName,
        accountNumber: data.accountNumber,
        swiftCode: data.swiftCode,
        paypalEmail: data.paypalEmail,
        isDefault: data.isDefault,
        extra: data.extra,
        paymentChannelId: data.paymentChannelId,
        directionId: data.direction,
        statusId: UserPaymentMethodStatusEnum.Active,
      },
      include: {
        paymentChannel: {
          include: { logo: true },
        },
      },
    });
    return new UserPaymentMethodDto(paymentMethod);
  }

  async deletePaymentMethod(
    paymentMethodId: string,
    userId: string,
  ): Promise<DeletePaymentMethodResponseDto> {
    await this.prisma.userPaymentMethod.update({
      where: {
        id: paymentMethodId,
        userId,
        statusId: UserPaymentMethodStatusEnum.Active,
      },
      data: {
        statusId: UserPaymentMethodStatusEnum.Inactive,
      },
    });

    return { success: true };
  }
}
