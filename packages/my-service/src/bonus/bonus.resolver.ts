import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  ObjectType,
  Field,
  Int,
} from '@nestjs/graphql';
import { BonusEligibility } from './bonus-eligibility.model';
import { BonusTransaction } from './bonus-transaction.model';
import { BonusType } from './bonus-type.model';
import { BonusService } from './bonus.service';
import { AuthService } from '../auth/auth.service';

@ObjectType()
export class BonusTransactionConnection {
  @Field(() => [BonusTransaction])
  items: BonusTransaction[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}

@Resolver(() => BonusEligibility)
export class BonusResolver {
  constructor(
    private readonly bonusService: BonusService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => [BonusEligibility])
  async myBonuses(): Promise<BonusEligibility[]> {
    const user = this.authService.getCurrentUser();
    return this.bonusService.getUserBonuses(user.id);
  }

  @Query(() => [BonusTransaction])
  async myBonusTransactions(): Promise<BonusTransaction[]> {
    const user = this.authService.getCurrentUser();
    return this.bonusService.getUserBonusHistory(user.id);
  }

  @Query(() => BonusTransactionConnection)
  async myBonusTransactionsPaginated(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 25 }) pageSize: number,
  ): Promise<BonusTransactionConnection> {
    const user = this.authService.getCurrentUser();
    return this.bonusService.getUserBonusHistoryPaginated(
      user.id,
      page,
      pageSize,
    );
  }

  @ResolveField(() => BonusType)
  async bonusType(
    @Parent() bonusEligibility: BonusEligibility,
  ): Promise<BonusType> {
    const bonusType = await this.bonusService.getBonusTypeById(
      bonusEligibility.bonusTypeId,
    );

    if (!bonusType) {
      throw new Error(
        `BonusType with id ${bonusEligibility.bonusTypeId} not found`,
      );
    }

    return bonusType;
  }
}

@Resolver(() => BonusTransaction)
export class BonusTransactionResolver {
  constructor(private readonly bonusService: BonusService) {}

  @ResolveField(() => BonusEligibility, { nullable: true })
  async bonusEligibility(
    @Parent() bonusTransaction: BonusTransaction,
  ): Promise<BonusEligibility | null> {
    return this.bonusService.getBonusEligibilityById(
      bonusTransaction.bonusEligibilityId,
    );
  }
}
