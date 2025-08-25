import { Injectable, Logger } from '@nestjs/common';
import {
  ImageGenerationParams,
  ImageGenerationResult,
  ImageProviderType,
} from './types/image-generation.types';
import { ImageProviderFactory } from './factories/image-provider.factory';

@Injectable()
export class ImageGenerationService {
  private readonly logger = new Logger(ImageGenerationService.name);

  constructor(private readonly providerFactory: ImageProviderFactory) {}

  /**
   * Generate an image using the specified provider
   * @param params Image generation parameters
   * @returns Promise resolving to generation result
   */
  async generateImage(
    params: ImageGenerationParams,
  ): Promise<ImageGenerationResult> {
    try {
      // Use specified provider or fallback to default
      const providerType =
        params.provider || this.providerFactory.getDefaultProvider();

      if (!providerType) {
        throw new Error(
          'No image generation provider is configured. Please configure OpenAI or Fal.ai API keys.',
        );
      }

      this.logger.log('Starting image generation', {
        provider: providerType,
        prompt: params.prompt.substring(0, 100) + '...',
      });

      const provider = this.providerFactory.createProvider(providerType);

      // Validate parameters for the specific provider
      const validatedParams = provider.validateParams(params);

      // Generate the image
      const result = await provider.generateImage(validatedParams);

      this.logger.log('Image generation completed', {
        provider: providerType,
        success: result.success,
      });

      return result;
    } catch (error) {
      this.logger.error('Error during image generation', error);
      return {
        success: false,
        prompt: params.prompt,
        provider: params.provider || ImageProviderType.OPENAI,
        error:
          error instanceof Error
            ? error.message
            : 'Unknown error occurred during image generation',
      };
    }
  }

  /**
   * Get information about all available providers
   * @returns Array of provider information
   */
  getProviderInfo() {
    return this.providerFactory.getAvailableProviders();
  }

  /**
   * Check if a specific provider is configured
   * @param type Provider type
   * @returns True if provider is configured
   */
  isProviderConfigured(type: ImageProviderType): boolean {
    try {
      const provider = this.providerFactory.createProvider(type);
      return provider.isConfigured();
    } catch {
      return false;
    }
  }

  /**
   * Get the default provider type
   * @returns Default provider or null if none configured
   */
  getDefaultProvider(): ImageProviderType | null {
    return this.providerFactory.getDefaultProvider();
  }
}
