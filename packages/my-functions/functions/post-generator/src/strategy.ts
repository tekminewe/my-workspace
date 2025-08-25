export interface IStrategy {
  getIntroductionPrompt(): string;
  getParagraphPrompt(index: number): string;
  getConclusionPrompt(): string;
  getFeaturedImagePrompt(): string;
  getNumberOfParagraphs(): number;
}

export interface IStrategyOptions<P> {
  title: string;
  description: string;
  keywords: string[];
  paragraphs: P[];
}

export abstract class BaseStrategy<P> implements IStrategy {
  constructor(public readonly options: IStrategyOptions<P>) {}

  getIntroductionPrompt(): string {
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getParagraphPrompt(_: number): string {
    throw new Error("Method not implemented.");
  }

  getConclusionPrompt(): string {
    throw new Error("Method not implemented.");
  }

  getFeaturedImagePrompt(): string {
    throw new Error("Method not implemented.");
  }

  getNumberOfParagraphs(): number {
    return this.options.paragraphs.length;
  }
}
