import {
  ImageProviderType,
  ImageGenerationParams,
} from '../types/image-generation.types';

/**
 * Cost estimation utility for image generation providers
 */
export class CostCalculator {
  // Approximate costs in USD (as of 2025)
  private static readonly PROVIDER_COSTS = {
    [ImageProviderType.OPENAI]: {
      standard: 0.04, // per image
      hd: 0.08, // per image
    },
    [ImageProviderType.FAL_AI]: {
      base: 0.0025, // per image for FLUX Schnell
    },
  };

  /**
   * Estimate the cost of image generation
   * @param provider Provider type
   * @param params Generation parameters
   * @returns Estimated cost in USD
   */
  static estimateCost(
    provider: ImageProviderType,
    params: ImageGenerationParams,
  ): number {
    switch (provider) {
      case ImageProviderType.OPENAI:
        const quality = params.quality || 'hd';
        return this.PROVIDER_COSTS[provider][quality] || 0;

      case ImageProviderType.FAL_AI:
        const numImages = params.numImages || 1;
        return this.PROVIDER_COSTS[provider].base * numImages;

      default:
        return 0;
    }
  }

  /**
   * Calculate input tokens (approximate)
   * @param text Input text
   * @returns Estimated token count
   */
  static estimateTokens(text: string): number {
    // Rough approximation: ~4 characters per token
    return Math.ceil(text.length / 4);
  }
}
