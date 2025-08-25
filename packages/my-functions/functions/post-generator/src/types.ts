export type BlogTopic = "trending-products" | "advertiser-campaign";

export interface BlogParagraphIntroductionSettings {
  prompt: string;
}

export interface BlogParagraphConclusionSettings {
  prompt: string;
}

export interface BlogParagraphDefaultSettings {
  prompt: string;
}

export interface BlogParagraphSettings {
  introduction: BlogParagraphIntroductionSettings;
  conclusion: BlogParagraphConclusionSettings;
  default: BlogParagraphDefaultSettings;
}

export interface BlogSettings {
  paragraphs: Record<BlogTopic, BlogParagraphSettings>;
}
