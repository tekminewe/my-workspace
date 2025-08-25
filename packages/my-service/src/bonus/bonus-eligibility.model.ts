import { Field, ObjectType } from '@nestjs/graphql';
import { BonusEligibilityStatusEnum } from '@prisma/client';
import { BonusType } from './bonus-type.model';
import './bonus.enums'; // Import to register enums

@ObjectType()
export class BonusEligibility {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  bonusTypeId: string;

  @Field()
  bonusVersion: number;

  @Field(() => BonusEligibilityStatusEnum)
  statusId: BonusEligibilityStatusEnum;

  @Field()
  availableAt: Date;

  @Field({ nullable: true })
  expiresAt?: Date;

  @Field({ nullable: true })
  usedAt?: Date;

  @Field({ nullable: true })
  eligibilityMetadata?: string; // JSON as string

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => BonusType, { nullable: true })
  bonusType?: BonusType;
}
