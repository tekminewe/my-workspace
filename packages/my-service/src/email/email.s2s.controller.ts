import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmailS2SService } from './email.s2s.service';
import { ApiDefinition } from 'src/api-definition.decorator';
import {
  CustomSendEmailDto,
  SendEmailDto,
  SendEmailResponseDto,
  UpdateEmailStatusDto,
} from './email.s2s.dto';
import { Public } from 'src/auth/auth.decorator';

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('EmailS2S')
@Controller('s2s/email')
export class EmailS2SController {
  constructor(private readonly emailService: EmailS2SService) {}

  @ApiDefinition({
    description: 'Send email',
    operationId: 'sendEmail',
    responseType: SendEmailResponseDto,
  })
  @Public()
  @Post()
  async sendEmail(@Body() data: SendEmailDto) {
    return this.emailService.sendEmail(data);
  }

  @ApiDefinition({
    description: 'Send user sign up welcome email',
    operationId: 'sendUserSignUpWelcomeEmail',
    responseType: SendEmailResponseDto,
  })
  @Public()
  @Post('sendUserSignUpWelcomeEmail')
  async sendUserSignUpWelcomeEmail(@Body() data: CustomSendEmailDto) {
    return this.emailService.sendWelcomeEmail(data);
  }

  @ApiDefinition({
    description: 'Send user forgotPassword email',
    operationId: 'sendForgotPasswordEmail',
    responseType: SendEmailResponseDto,
  })
  @Public()
  @Post('sendForgotPasswordEmail')
  async sendForgotPasswordEmail(@Body() data: CustomSendEmailDto) {
    return this.emailService.sendForgotPasswordEmail(data);
  }

  @ApiDefinition({
    description: 'Process email queue',
    operationId: 'processEmailQueue',
    responseType: SendEmailResponseDto,
  })
  @Public()
  @Post('process')
  async processEmailQueue(@Body() data: SendEmailDto) {
    return this.emailService.processEmailQueue(data);
  }

  @ApiDefinition({
    description: 'Update email status',
    operationId: 'updateEmailStatus',
    responseType: SendEmailResponseDto,
  })
  @Public()
  @Put()
  async updateEmailStatus(@Body() data: UpdateEmailStatusDto) {
    return this.emailService.updateEmailStatus(data);
  }
}
