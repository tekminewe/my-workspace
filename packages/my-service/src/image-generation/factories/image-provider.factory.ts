import { Injectable, Logger } from '@nestjs/common';
import { ImageProviderType } from '../types/image-generation.types';
import { ImageGenerationProvider } from '../interfaces/image-generation-provider.interface';
import { OpenAIImageProvider } from '../providers/openai-image.provider';
import { FalAIImageProvider } from '../providers/fal-ai-image.provider';

@Injectable()
export class ImageProviderFactory {
  private readonly logger = new Logger(ImageProviderFactory.name);

  constructor(
    private readonly openAIProvider: OpenAIImageProvider,
    private readonly falAIProvider: FalAIImageProvider,
  ) {}

  /**
   * Create an image generation provider instance
   * @param type Provider type
   * @returns Provider instance
   */
  createProvider(type: ImageProviderType): ImageGenerationProvider {
    switch (type) {
      case ImageProviderType.OPENAI:
        if (!this.openAIProvider.isConfigured()) {
          this.logger.warn('OpenAI provider is not properly configured');
        }
        return this.openAIProvider;

      case ImageProviderType.FAL_AI:
        if (!this.falAIProvider.isConfigured()) {
          this.logger.warn('Fal.ai provider is not properly configured');
        }
        return this.falAIProvider;

      default:
        throw new Error(`Unsupported image provider type: ${type}`);
    }
  }

  /**
   * Get all available providers with their configuration status
   * @returns Array of provider info
   */
  getAvailableProviders() {
    return [
      {
        ...this.openAIProvider.getProviderInfo(),
        configured: this.openAIProvider.isConfigured(),
      },
      {
        ...this.falAIProvider.getProviderInfo(),
        configured: this.falAIProvider.isConfigured(),
      },
    ];
  }

  /**
   * Get the first available configured provider
   * @returns Provider type or null if none available
   */
  getDefaultProvider(): ImageProviderType | null {
    const providers = this.getAvailableProviders();
    const configuredProvider = providers.find((p) => p.configured);
    return configuredProvider?.type || null;
  }
}
