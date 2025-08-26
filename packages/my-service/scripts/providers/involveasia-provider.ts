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

interface InvolveAsiaOffersResponse {
  status: string;
  message: string;
  data: {
    page: number;
    limit: number;
    count: number;
    nextPage: number;
    data: Array<InvolveAsiaOffer>;
  };
}

interface GetAdvertiserOptions {
  advertiserName: string;
}

export class InvolveAsiaProvider {
  private apiKey: string;
  private apiSecret: string;
  private apiBaseUrl = 'https://api.involve.asia/api';

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }
  async getAdvertiser(
    params: GetAdvertiserOptions,
  ): Promise<InvolveAsiaOffer | null> {
    const { advertiserName } = params;

    const accessToken = await this.authenticate();
    const res = await fetch(`${this.apiBaseUrl}/offers/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        filters: {
          offer_name: advertiserName,
        },
      }),
    });
    const json = (await res.json()) as InvolveAsiaOffersResponse;
    const offer = json.data.data[0];
    if (!offer) {
      return null;
    }

    return offer;
  }

  private async authenticate() {
    const authRes = await fetch(`${this.apiBaseUrl}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: this.apiKey,
        secret: this.apiSecret,
      }),
    });
    const auth = (await authRes.json()) as { data: { token: string } };
    return auth.data.token;
  }
}
