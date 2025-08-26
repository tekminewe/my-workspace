import { BaseStrategy, IStrategy, IStrategyOptions } from "../strategy";

interface AdvertiserCampaignParagraph {
  campaign: {
    link: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    voucherCodes?: string[];
  };
}

export interface AdvertiserCampaignStrategyOptions
  extends IStrategyOptions<AdvertiserCampaignParagraph> {
  advertiser: {
    name: string;
    description: string;
    logoUrl?: string;
  };
  cashbackRate?: string;
  siteLogoUrl: string;
}

export class AdvertiserCampaignStrategy
  extends BaseStrategy<AdvertiserCampaignParagraph>
  implements IStrategy
{
  constructor(public readonly options: AdvertiserCampaignStrategyOptions) {
    super(options);
  }

  getIntroductionPrompt(): string {
    return `
      Generate a blog post structured specifically in JSON format compatible with the Tiptap Rich Text Editor.
      
      Objective: Introduce and promote an advertiser campaign, emphasizing its value, benefits, and cashback opportunities.

      Target Audience: Online shoppers in Malaysia looking for great deals and cashback offers.

      Blog Post Title: ${this.options.title}

      Blog Post Description: ${this.options.description}

      Target Keywords: ${this.options.keywords.join(", ")}
      
      Advertiser Name: ${this.options.advertiser.name}

      Advertiser Description: ${this.options.advertiser.description}

      ${
        this.options.cashbackRate
          ? `Cashback Rate: ${this.options.cashbackRate}`
          : ""
      }

      Writing Style: Friendly, helpful, persuasive. Clearly mention cashback benefits and encourage shopping via the cashback site.

      Now, write the first paragraph of the blog post. The first paragraph should include a brief introduction to the advertiser and why their campaigns are worth checking out. Create excitement about the offers available. The paragraph should have around 200 words. Do not add heading in the introduction.
    `;
  }

  getParagraphPrompt(index: number): string {
    const campaign = this.options.paragraphs[index].campaign;
    const voucherCodesText =
      campaign.voucherCodes && campaign.voucherCodes.length > 0
        ? `Voucher codes available: ${campaign.voucherCodes.join(", ")}.`
        : "";

    return `
      Write a detailed paragraph about the campaign: ${campaign.title || ""}. 
      
      Campaign details:
      - Link: ${campaign.link || ""}
      - Description: ${campaign.description || ""}
      - Valid from: ${campaign.startDate} to ${campaign.endDate}
      ${voucherCodesText}
      
      The paragraph should be around 200 words. Add a heading 2 tag before the paragraph with the campaign title. 
      
      Make the paragraph persuasive and highlight the benefits of the campaign. Emphasize any time-limited nature of the offer to create urgency. 
      
      Include the campaign link naturally within the text, ideally linked to a call-to-action phrase like "Shop Now" or "Get This Deal". 
      
      ${
        this.options.cashbackRate
          ? `Make sure to highlight the ${this.options.cashbackRate} cashback opportunity when using our platform.`
          : ""
      }
      
      Encourage readers to click on the campaign link to take advantage of this offer before it expires.
    `;
  }

  getConclusionPrompt(): string {
    return `
      Write a conclusion paragraph for the blog post. The conclusion should:
      
      1. Summarize the key benefits of the campaign
      2. Emphasize any time-sensitive aspects to create urgency
      3. Remind readers about the cashback benefits when using our platform
      4. Include a strong call to action encouraging readers to click on the campaign link
      
      The paragraph should have around 200 words. Add a heading 2 tag before the paragraph. The heading should be "Don't Miss Out On This Limited-Time Offer".
      
      Make the conclusion compelling and persuasive, focusing on what the reader might lose by not taking immediate action.
    `;
  }

  getFeaturedImagePrompt(): string {
    return `
      Create a Featured Image for a Promotion

      * Promotion Title: ${this.options.title}
      * Promotion Description: ${this.options.description}
      * Advertiser Name: ${this.options.advertiser.name}
      * Advertiser Logo URL: ${this.options.advertiser.logoUrl || ""}
      * Site Logo URL: ${this.options.siteLogoUrl || ""}

      Image Requirements

      1. Be visually appealing and professional
      2. Relate to the promotion theme and the advertiser’s brand
      3. Include subtle visual elements related to deals, promotions, or special offers
      4. Possibly incorporate colours or elements that match the advertiser’s branding
      5. Prominently and clearly incorporate the advertiser’s logo into the design. The logo should be easily recognisable.
      6. Have a modern, clean aesthetic suitable for a sales promotion
      7. Not contain any text overlays, other than potentially text within the advertiser’s logo itself.
      8. Put the site logo provided at the top left corner of the image.
      9. The image should be 1200x630 pixels in size.
      10. The image should be in WEBP format.

      Goal

      Generate an image that would attract readers’ attention and represent the this special promotion.
    `;
  }

  getNumberOfParagraphs(): number {
    // We only need one paragraph for the campaign details, regardless of how many are in options
    return 1;
  }
}
