import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import { LanguageEnum } from '@prisma/client';

@ArgsType()
export class GetSiteArgs {
  @Field(() => LanguageEnum, {
    description: 'The language to retrieve the site in',
    nullable: true,
    defaultValue: LanguageEnum.EN_US,
  })
  @IsEnum(LanguageEnum)
  @IsOptional()
  language?: LanguageEnum;
}
