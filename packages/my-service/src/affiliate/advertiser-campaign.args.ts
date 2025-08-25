import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class AdvertiserCampaignArgs {
  @Field({ description: 'The unique identifier of the advertiser campaign' })
  id: string;
}
