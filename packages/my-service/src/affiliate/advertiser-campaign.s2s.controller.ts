import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Query,
} from '@nestjs/common';
import { AdvertiserCampaignS2SService } from './advertiser-campaign.s2s.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiDefinition } from 'src/api-definition.decorator';
import { AdvertiserCampaignDto } from './advertiser-campaign.s2s.dto';
import { CreateAdvertiserCampaignDto } from './advertiser-campaign.s2s.dto';
import { Public } from 'src/auth/auth.decorator';
import { AffiliateProviderEnum } from '@prisma/client';

@ApiBearerAuth()
@ApiTags('AdvertiserCampaign')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('s2s/affiliate/advertisers/campaigns')
export class AdvertiserCampaignS2SController {
  constructor(
    private readonly advertiserCampaignService: AdvertiserCampaignS2SService,
  ) {}

  @ApiDefinition({
    description: 'Get a advertiser campaign',
    operationId: 'getAdvertiserCampaign',
    responseType: AdvertiserCampaignDto,
  })
  @Public()
  @Get()
  async getAdvertiser(
    @Query('providerReferenceId') providerReferenceId: string,
    @Query('providerId') providerId: AffiliateProviderEnum,
  ) {
    const advertiser =
      await this.advertiserCampaignService.getAdvertiserCampaignByProvider({
        providerReferenceId,
        providerId,
      });

    return advertiser;
  }

  @ApiDefinition({
    description: 'Create a new advertiser campaign',
    operationId: 'createAdvertiserCampaign',
    responseType: AdvertiserCampaignDto,
  })
  @Public()
  @Post()
  async createAdvertiserCampaign(
    @Body() data: CreateAdvertiserCampaignDto,
  ): Promise<AdvertiserCampaignDto> {
    return this.advertiserCampaignService.createAdvertiserCampaign(data);
  }

  // @ApiDefinition({
  //   description: 'Update an existing advertiser campaign',
  //   operationId: 'updateAdvertiserCampaign',
  //   responseType: AdvertiserCampaignDto,
  // })
  // @Put(':id')
  // async updateAdvertiserCampaign(
  //   @Param('id') id: string,
  //   @Body() data: UpdateAdvertiserCampaignDto,
  // ): Promise<AdvertiserCampaignDto> {
  //   return this.advertiserCampaignService.updateAdvertiserCampaign(id, data);
  // }

  @ApiDefinition({
    description: 'Delete an advertiser campaign',
    operationId: 'deleteAdvertiserCampaign',
    responseType: AdvertiserCampaignDto,
  })
  @Delete(':id')
  async deleteAdvertiserCampaign(
    @Param('id') id: string,
  ): Promise<AdvertiserCampaignDto> {
    return this.advertiserCampaignService.deleteAdvertiserCampaign(id);
  }
}
