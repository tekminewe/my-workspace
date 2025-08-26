import { Field, ObjectType } from '@nestjs/graphql';
import { CurrencyEnum } from '@prisma/client';
import './bonus.enums'; // Import to register enums
import { BonusEligibility } from './bonus-eligibility.model';

@ObjectType()
export class BonusTransaction {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  bonusEligibilityId: string;

  @Field(() => BonusEligibility, { nullable: true })
  bonusEligibility?: BonusEligibility;

  @Field()
  bonusTypeId: string;

  @Field()
  bonusVersion: number;

  @Field()
  amount: number;

  @Field(() => CurrencyEnum)
  currencyId: CurrencyEnum;

  @Field({ nullable: true })
  sourceTransactionId?: string;

  @Field({ nullable: true })
  merchantCallbackId?: string;

  @Field()
  processedAt: Date;

  @Field({ nullable: true })
  walletTransactionId?: string;

  @Field({ nullable: true })
  processingMetadata?: string; // JSON as string

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
