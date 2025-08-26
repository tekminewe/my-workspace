import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { ApiDefinition } from 'src/api-definition.decorator';
import { PaymentChannelTypeEnum } from '@prisma/client';
import {
  UserPaymentMethodDto,
  CreateUserPaymentMethodDto,
  DeletePaymentMethodResponseDto,
  CreateUserPaymentMethodErrorCodesEnum,
} from './payment-method.dto';

@ApiBearerAuth()
@ApiTags('PaymentMethod')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('payment-methods')
export class PaymentMethodController {
  constructor(
    private readonly paymentMethodService: PaymentMethodService,
    private readonly authService: AuthService,
  ) {}

  @ApiDefinition({
    description: 'Get all payment methods of the current user',
    operationId: 'getMyPaymentMethods',
    responseType: UserPaymentMethodDto,
    dataType: 'array',
  })
  @Get('me')
  @ApiQuery({
    name: 'paymentChannelType',
    enum: PaymentChannelTypeEnum,
    required: false,
  })
  async getMyPaymentMethods(
    @Query('paymentChannelType') paymentChannelType?: PaymentChannelTypeEnum,
  ) {
    const currentUser = this.authService.getCurrentUser();
    const paymentMethods =
      await this.paymentMethodService.getPaymentMethodsByUserId(
        currentUser.id,
        paymentChannelType,
      );
    return paymentMethods;
  }

  @ApiDefinition({
    description: 'Create a new payment method for the current user',
    operationId: 'createUserPaymentMethod',
    responseType: UserPaymentMethodDto,
    badRequestErrorCodes: CreateUserPaymentMethodErrorCodesEnum,
  })
  @Post()
  async createPaymentMethod(
    @Body() createPaymentMethodDto: CreateUserPaymentMethodDto,
  ) {
    const currentUser = this.authService.getCurrentUser();
    const paymentMethod = await this.paymentMethodService.createPaymentMethod({
      ...createPaymentMethodDto,
      userId: currentUser.id,
    });
    return paymentMethod;
  }

  @ApiDefinition({
    description: 'Soft delete a payment method of the current user',
    operationId: 'deletePaymentMethod',
    responseType: DeletePaymentMethodResponseDto,
  })
  @Delete(':paymentMethodId')
  async deletePaymentMethod(
    @Param('paymentMethodId') paymentMethodId: string,
  ): Promise<DeletePaymentMethodResponseDto> {
    const currentUser = this.authService.getCurrentUser();
    return this.paymentMethodService.deletePaymentMethod(
      paymentMethodId,
      currentUser.id,
    );
  }
}
