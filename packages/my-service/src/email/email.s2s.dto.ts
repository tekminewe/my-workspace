import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EmailStatusEnum } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class SendEmailDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  emailLogId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  htmlContent?: string;

  constructor(data: Partial<SendEmailDto>) {
    Object.assign(this, data);
  }
}

@Exclude()
export class SendEmailResponseDto {
  @Expose()
  @ApiProperty()
  emailLogId: string;

  constructor(data: Partial<SendEmailResponseDto>) {
    Object.assign(this, data);
  }
}

export class UpdateEmailStatusDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  messageId: string;

  @ApiProperty({ enum: EmailStatusEnum })
  @IsEnum(EmailStatusEnum)
  status: EmailStatusEnum;
}

export class UpdateEmailStatusResponseDto {
  @ApiProperty()
  emailLogId: string;

  constructor(data: Partial<UpdateEmailStatusResponseDto>) {
    Object.assign(this, data);
  }
}

export class CustomSendEmailDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  providerAccountId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  encryptedCode?: string;
}
