import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AdvertiserCommission } from './advertiser-commission.model';
import { AdvertiserService2 } from './advertiser2.service';
import { UpdateAdvertiserCommissionInput } from './advertiser-commission.input';
import { AuthService } from 'src/auth/auth.service';
import { AllowIAM } from 'src/auth/auth.decorator';
import { Permissions } from 'src/role/role.decorator';
import { PermissionEnum } from '@prisma/client';

@Resolver(() => AdvertiserCommission)
export class AdvertiserCommissionResolver {
  constructor(
    private readonly advertiserService: AdvertiserService2,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => AdvertiserCommission, {
    description:
      'Update an advertiser commission, including its commission rows',
    nullable: true,
  })
  @AllowIAM()
  @Permissions(PermissionEnum.ManageAdvertiser)
  async updateAdvertiserCommission(
    @Args('data') data: UpdateAdvertiserCommissionInput,
  ): Promise<AdvertiserCommission | null> {
    const language = await this.authService.getAcceptLanguage();
    return this.advertiserService.updateAdvertiserCommission(data, language);
  }
}
