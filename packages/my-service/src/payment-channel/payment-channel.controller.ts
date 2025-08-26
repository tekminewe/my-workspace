import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PaymentChannelService } from './payment-channel.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiDefinition } from 'src/api-definition.decorator';
import { PaymentChannelDto } from './payment-channel.dto';
import { AuthService } from 'src/auth/auth.service';

@ApiBearerAuth()
@ApiTags('PaymentChannel')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('payment-channels')
export class PaymentChannelController {
  constructor(
    private readonly paymentChannelService: PaymentChannelService,
    private readonly authService: AuthService,
  ) {}

  @ApiDefinition({
    description: 'Get all active payment channels',
    operationId: 'getActivePaymentChannels',
    responseType: PaymentChannelDto,
    dataType: 'array',
  })
  @Get()
  async getActivePaymentChannels(): Promise<PaymentChannelDto[]> {
    const language = await this.authService.getAcceptLanguage();
    return this.paymentChannelService.getActivePaymentChannels({
      language,
    });
  }
}
