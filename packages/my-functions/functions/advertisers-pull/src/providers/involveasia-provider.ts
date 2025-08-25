import {
  AdvertiserCommissionTypeEnum,
  AdvertiserStatusEnum,
  AffiliateProviderEnum,
} from "../graphql";
import {
  Advertiser,
  GetAdvertiserOptions,
  GetCampaignOptions,
  Provider,
} from "./provider";

interface InvolveAsiaOffer {
  offer_name: string;
  description: string;
  preview_url: string;
  offer_id: number;
  merchant_id: number;
  currency: string;
  logo: string;
  lookup_value: string;
  datetime_updated: string;
  countries: string;
  categories: string;
  commissions: Array<Record<string, string>>;
  validation_terms: string;
  payment_terms: string;
  tracking_link: string;
  tracking_type: string;
  commission_tracking: string;
  directory_page: string;
}

interface InvolveAsiaCampaign {
  campaign_banner_id: number;
  offer_id: number;
  merchant_id: number;
  offer_name: string;
  campaign_name: string;
  description: string;
  voucher_code: string;
  date_campaign_start: string;
  date_campaign_end: string;
  banner_image_url: string;
  tracking_link: string;
  categories: string;
  with_banner: boolean;
}

interface InvolveAsiaResponse<T> {
  status: string;
  message: string;
  data: {
    page: number;
    limit: number;
    count: number;
    nextPage: number;
    data: Array<T>;
  };
}

type InvolveAsiaCampaignsResponse = InvolveAsiaResponse<InvolveAsiaCampaign>;
type InvolveAsiaOffersResponse = InvolveAsiaResponse<InvolveAsiaOffer>;
export class InvolveAsiaProvider implements Provider {
  private apiKey: string;
  private apiSecret: string;
  private apiBaseUrl = "https://api.involve.asia/api";

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }
  async getAdvertiser(
    params: GetAdvertiserOptions
  ): Promise<Advertiser | null> {
    const { providerReferenceId, name, isActive } = params;

    if (!providerReferenceId && !name) {
      throw new Error("Either providerReferenceId or name must be provided");
    }

    const accessToken = await this.authenticate();
    const res = await fetch(`${this.apiBaseUrl}/offers/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        filters: {
          ...(providerReferenceId ? { offer_id: providerReferenceId } : {}),
          ...(name ? { offer_name: name } : {}),
          ...(isActive ? { offer_status: "Active" } : {}),
        },
      }),
    });
    const json = (await res.json()) as InvolveAsiaOffersResponse;
    const offer = json.data.data[0];
    if (!offer) {
      return null;
    }

    // Parse commission data
    const commissions = offer.commissions || [];
    const primaryCommission = commissions.length > 0 ? commissions[0] : null;
    const commissionRate = primaryCommission
      ? parseFloat(Object.values(primaryCommission)[0].replace(/[^\d.]/g, ""))
      : 0;

    return {
      id: offer.offer_id.toString(),
      name: offer.offer_name,
      description: offer.description,
      logoUrl: offer.logo,
      statusId: AdvertiserStatusEnum.Active,
      trackingUrl: offer.tracking_link,
      commission: {
        rate: commissionRate,
        daysToValidate: parseInt(offer.validation_terms) || 30,
        daysToPayout: parseInt(offer.payment_terms) || 60,
        commissionRows: commissions.map((commission) => {
          const key = Object.keys(commission)[0];
          const value = commission[key];
          return {
            name: key,
            providerReferenceId: key
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-"),
            rate: parseFloat(value.replace(/[^\d.]/g, "")),
            typeId: key.includes("%")
              ? AdvertiserCommissionTypeEnum.Percentage
              : AdvertiserCommissionTypeEnum.Fixed,
          };
        }),
      },
    };
  }

  async getAdvertiserCampaigns(params: GetCampaignOptions) {
    const { advertiserId } = params;

    const accessToken = await this.authenticate();
    const res = await fetch(`${this.apiBaseUrl}/campaigns/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        filters: {
          offer_id: advertiserId,
        },
      }),
    });
    const json = (await res.json()) as InvolveAsiaCampaignsResponse;
    const campaigns = json.data.data;
    if (!campaigns || campaigns.length === 0) {
      return [];
    }

    return campaigns.map((campaign) => {
      return {
        id: campaign.campaign_banner_id.toString(),
        providerId: AffiliateProviderEnum.InvolveAsia,
        providerReferenceId: campaign.offer_id.toString(),
        startDate: new Date(campaign.date_campaign_start),
        endDate: new Date(campaign.date_campaign_end),
        url: campaign.tracking_link,
        name: campaign.campaign_name,
        description: campaign.description,
        bannerUrl: campaign.banner_image_url,
        voucherCodes: campaign.voucher_code ? [campaign.voucher_code] : [],
      };
    });
  }

  private async authenticate() {
    const authRes = await fetch(`${this.apiBaseUrl}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: this.apiKey,
        secret: this.apiSecret,
      }),
    });
    const auth = (await authRes.json()) as { data: { token: string } };
    return auth.data.token;
  }

  async createAdvertiserFromName(name: string): Promise<Advertiser | null> {
    // First, get the advertiser details by name
    const advertiser = await this.getAdvertiser({ name, isActive: true });

    if (!advertiser) {
      return null;
    }

    return advertiser;
  }
}
