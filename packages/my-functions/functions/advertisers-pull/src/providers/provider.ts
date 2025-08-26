import {
  AdvertiserCommissionTypeEnum,
  AdvertiserStatusEnum,
  AffiliateProviderEnum,
} from "../graphql";

interface CommissionRow {
  name: string;
  rate: number;
  providerReferenceId: string;
  typeId: AdvertiserCommissionTypeEnum;
}

interface Commission {
  rate: number;
  daysToValidate: number;
  daysToPayout: number;
  commissionRows?: CommissionRow[];
}

export interface Advertiser {
  description: string;
  id: string;
  logoUrl: string;
  name: string;
  statusId: AdvertiserStatusEnum;
  trackingUrl?: string;
  commission?: Commission;
}

interface AdvertiserCampaign {
  id: string;
  providerId: AffiliateProviderEnum;
  providerReferenceId: string;
  startDate: Date;
  endDate: Date;
  url: string;
  name: string;
  description: string;
  bannerUrl: string;
  voucherCodes: string[];
}

export interface GetAdvertiserOptions {
  providerReferenceId?: string;
  name?: string;
  isActive?: boolean;
}

export interface GetCampaignOptions {
  advertiserId: string;
}

export interface Provider {
  getAdvertiser(params: GetAdvertiserOptions): Promise<Advertiser | null>;
  getAdvertiserCampaigns(
    params: GetCampaignOptions
  ): Promise<AdvertiserCampaign[]>;
}
