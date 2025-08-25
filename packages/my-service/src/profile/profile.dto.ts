import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { LanguageEnum } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  companyName?: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty({
    enum: LanguageEnum,
  })
  @IsEnum(LanguageEnum)
  languageId: LanguageEnum;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}

@Exclude()
export class ProfileDto {
  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  photoUrl: string;

  @ApiProperty({
    enum: LanguageEnum,
  })
  @Expose()
  languageId: LanguageEnum;

  constructor(partial: Partial<ProfileDto>) {
    Object.assign(this, partial);
  }
}
