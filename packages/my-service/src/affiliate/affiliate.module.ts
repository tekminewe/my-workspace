import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdvertiserController } from './advertiser.controller';
import { AdvertiserService } from './advertiser.service';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { PaginationModule } from 'src/pagination/pagination.module';
import { UserAdvertiserClickController } from './user-advertiser-click.controller';
import { CashbackService } from './cashback.service';
import { CashbackController } from './user-cashback.controller';
import { AdvertiserCampaignS2SController } from './advertiser-campaign.s2s.controller';
import { AdvertiserCampaignS2SService } from './advertiser-campaign.s2s.service';
import { UserCashbackS2SController } from './user-cashback.s2s.controller';
import { UserCashbackS2SService } from './user-cashback.s2s.service';
import { EmailModule } from 'src/email/email.module';
import { AdvertiserService2 } from './advertiser2.service';
import { AdvertiserResolver } from './advertiser.resolver';
import { AdvertisersPaginationResolver } from './advertiser-pagination.resolver';
import { MediaModule } from 'src/media/media.module';
import { SearchModule } from 'src/search/search.module';
import { BonusModule } from 'src/bonus/bonus.module';
import { AdvertiserCampaignService } from './advertiser-campaign.service';
import { AdvertiserCampaignResolver } from './advertiser-campaign.resolver';
import { AdvertiserProviderReferenceResolver } from './advertiser-provider-reference.resolver';
import { AdvertiserProviderReferenceService } from './advertiser-provider-reference.service';
import { AdvertiserCampaignPaginationResolver } from './advertiser-campaign-pagination.resolver';
import { AdvertiserCampaignFieldResolver } from './advertiser-campaign-field.resolver';
import { AdvertiserCommissionResolver } from './advertiser-commission.resolver';
import { AdvertiserLambdaService } from './advertiser-lambda.service';
import { AdvertiserCategoryResolver } from './advertiser-category.resolver';

@Module({
  exports: [AdvertiserService],
  imports: [
    AuthModule,
    PrismaModule,
    PaginationModule,
    EmailModule,
    MediaModule,
    SearchModule,
    BonusModule,
  ],
  controllers: [
    AdvertiserController,
    ProviderController,
    UserAdvertiserClickController,
    CashbackController,
    AdvertiserCampaignS2SController,
    UserCashbackS2SController,
  ],
  providers: [
    AdvertiserService,
    ProviderService,
    CashbackService,
    AdvertiserCampaignS2SService,
    UserCashbackS2SService,
    AdvertiserService2,
    AdvertiserResolver,
    AdvertisersPaginationResolver,
    AdvertiserCampaignService,
    AdvertiserCampaignResolver,
    AdvertiserCampaignPaginationResolver,
    AdvertiserProviderReferenceService,
    AdvertiserProviderReferenceResolver,
    AdvertiserCampaignFieldResolver,
    AdvertiserCommissionResolver,
    AdvertiserLambdaService,
    AdvertiserCategoryResolver,
  ],
})
export class AffiliateModule {}
