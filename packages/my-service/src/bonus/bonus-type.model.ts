import { Field, ObjectType } from '@nestjs/graphql';
import {
  BonusTypeCodeEnum,
  BonusTypeStatusEnum,
  LanguageEnum,
} from '@prisma/client';
import { Media } from 'src/media/media.model';
import './bonus.enums'; // Import to register enums

@ObjectType()
export class BonusTypeMetadata {
  @Field()
  bonusTypeId: string;

  @Field(() => LanguageEnum)
  languageId: LanguageEnum;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  termsAndConditions: string;

  @Field({ nullable: true })
  featuredImageId?: string;

  @Field({ nullable: true })
  logoId?: string;

  @Field(() => Media, { nullable: true })
  featuredImage?: Media;

  @Field(() => Media, { nullable: true })
  logo?: Media;
}

@ObjectType()
export class BonusType {
  @Field()
  id: string;

  @Field(() => BonusTypeCodeEnum)
  codeId: BonusTypeCodeEnum;

  @Field()
  version: number;

  @Field()
  priority: number;

  @Field({ nullable: true })
  expiryDays?: number;

  @Field()
  maxUsagePerUser: number;

  @Field()
  ruleConfig: string; // JSON as string

  @Field(() => BonusTypeStatusEnum)
  statusId: BonusTypeStatusEnum;

  @Field()
  effectiveFrom: Date;

  @Field({ nullable: true })
  effectiveTo?: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  createdBy?: string;

  @Field({ nullable: true })
  updatedBy?: string;

  @Field(() => [BonusTypeMetadata], { nullable: true })
  metadatas?: BonusTypeMetadata[];

  @Field(() => BonusTypeMetadata, { nullable: true })
  metadata?: BonusTypeMetadata;
}
