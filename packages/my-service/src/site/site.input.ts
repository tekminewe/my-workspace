import { Field, InputType } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType({ description: 'Site metadata update for a specific language' })
export class UpdateSiteMetadataInput {
  @Field(() => String, {
    description: 'The name of the site in the specific language',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String, {
    description: 'The description of the site in the specific language',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => String, {
    description: 'The logo ID of the site for the specific language',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  logoId?: string;

  @Field(() => String, {
    description: 'The dark theme logo ID of the site for the specific language',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  darkLogoId?: string;

  @Field(() => LanguageEnum, {
    description: 'The language identifier for this metadata',
  })
  @IsEnum(LanguageEnum)
  languageId: LanguageEnum;
}

@InputType({ description: 'Input for updating site information' })
export class UpdateSiteInput {
  @Field(() => String, {
    description: 'The domain of the site',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  domain?: string;

  @Field(() => [UpdateSiteMetadataInput], {
    description: 'The metadata for different languages',
    nullable: true,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateSiteMetadataInput)
  @IsOptional()
  metadatas?: UpdateSiteMetadataInput[];
}
