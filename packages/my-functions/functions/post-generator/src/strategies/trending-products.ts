import { BaseStrategy, IStrategy, IStrategyOptions } from "../strategy";

interface TrendingProductParagraph {
  product: {
    link: string;
    title: string;
    description: string;
    originalPrice?: string;
    currentPrice: string;
  };
}

export interface TrendingProductStrategyOptions
  extends IStrategyOptions<TrendingProductParagraph> {
  advertiser: {
    name: string;
    description: string;
  };
}

export class TrendingProductsStrategy
  extends BaseStrategy<TrendingProductParagraph>
  implements IStrategy
{
  constructor(public readonly options: TrendingProductStrategyOptions) {
    super(options);
  }

  getIntroductionPrompt(): string {
    return `
      Generate a blog post structured specifically in JSON format compatible with the Tiptap Rich Text Editor.
      
      Objective: Highlight the benefits of buying products listed below, emphasizing value for money, product features, and cashback opportunities.

      Target Audience: Online shoppers in Malaysia looking for great deals and cashback offers.

      Blog Post Title: ${this.options.title}

      Blog Post Description: ${this.options.description}

      Target Keywords: ${this.options.keywords.join(", ")}
      
      Advertiser Name: ${this.options.advertiser.name}

      Writing Style: Friendly, helpful, persuasive. Clearly mention cashback benefits and encourage shopping via the cashback site.

      Now, write the first paragraph of the blog post. The first paragraph should include a brief introduction to the topic. The paragraph should have at around 200 words. Do not add heading in the introduction.
    `;
  }

  getParagraphPrompt(index: number): string {
    const product = this.options.paragraphs[index].product;
    return `Write another paragraph about the product: ${
      product?.title || ""
    }. The price of the product is ${
      product?.currentPrice
    }. The link to the product is ${
      product?.link || ""
    }. The description of the product is ${
      product?.description || ""
    }. The paragraph should have at around 200 words. Add link to the title of the product or any relevant text in the paragraph. You need to persuade the reader to buy the product and mention cashback benefits if applicable. Add a heading 2 tag before the paragraph. The heading should be the title of the product.`;
  }

  getConclusionPrompt(): string {
    return `Write a conclusion paragraph for the blog post. The conclusion should summarize the key points discussed in the blog post and encourage readers to take action. The paragraph should have at around 200 words. Add a heading 2 tag before the paragraph. The heading should be "Conclusion".`;
  }

  getFeaturedImagePrompt(): string {
    return `
      Create a high-quality, visually appealing featured image for a blog post about trending products.
      
      Blog Post Title: ${this.options.title}
      Blog Post Description: ${this.options.description}
      Keywords: ${this.options.keywords.join(", ")}
      
      The image should:
      1. Be visually appealing and professional
      2. Relate to shopping, deals, or the specific products mentioned
      3. Include subtle visual elements related to cashback or savings
      4. Have a modern, clean aesthetic suitable for an e-commerce blog
      5. Not contain any text overlays
      
      Generate an image that would attract readers' attention and represent the content of the blog post about trending products and deals.
    `;
  }
}
