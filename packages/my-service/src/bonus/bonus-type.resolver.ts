import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BonusType, BonusTypeMetadata } from './bonus-type.model';
import { BonusService } from './bonus.service';
import { Permissions } from '../role/role.decorator';
import { PermissionEnum } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { CreateBonusTypeInput, UpdateBonusTypeInput } from './bonus-type.input';

@Resolver(() => BonusType)
export class BonusTypeResolver {
  constructor(
    private readonly bonusService: BonusService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => [BonusType])
  @Permissions(PermissionEnum.ViewBonuses)
  async bonusTypes(): Promise<BonusType[]> {
    return this.bonusService.getAllBonusTypes();
  }

  @Query(() => BonusType, { nullable: true })
  @Permissions(PermissionEnum.ViewBonuses)
  async bonusType(@Args('id') id: string): Promise<BonusType | null> {
    return this.bonusService.getBonusTypeById(id);
  }

  @Mutation(() => BonusType)
  @Permissions(PermissionEnum.ManageBonuses)
  async createBonusType(
    @Args('input') input: CreateBonusTypeInput,
  ): Promise<BonusType> {
    const user = this.authService.getCurrentUser();
    return this.bonusService.createBonusType(input, user.id);
  }

  @Mutation(() => BonusType)
  @Permissions(PermissionEnum.ManageBonuses)
  async updateBonusType(
    @Args('id') id: string,
    @Args('input') input: UpdateBonusTypeInput,
  ): Promise<BonusType> {
    const user = this.authService.getCurrentUser();
    return this.bonusService.updateBonusType(id, input, user.id);
  }

  @Mutation(() => Boolean)
  @Permissions(PermissionEnum.ManageBonuses)
  async deleteBonusType(@Args('id') id: string): Promise<boolean> {
    return this.bonusService.deleteBonusType(id);
  }

  @ResolveField(() => BonusTypeMetadata, { nullable: true })
  async metadata(
    @Parent() bonusType: BonusType,
  ): Promise<BonusTypeMetadata | null> {
    const acceptLanguage = await this.authService.getAcceptLanguage();
    return this.bonusService.getBonusTypeMetadataByLanguage(
      bonusType.id,
      acceptLanguage,
    );
  }
}
