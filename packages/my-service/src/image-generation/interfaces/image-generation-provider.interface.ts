import {
  ImageGenerationParams,
  ImageGenerationResult,
  ProviderInfo,
} from '../types/image-generation.types';

export interface ImageGenerationProvider {
  /**
   * Generate an image using the provider's API
   * @param params Image generation parameters
   * @returns Promise resolving to generation result
   */
  generateImage(params: ImageGenerationParams): Promise<ImageGenerationResult>;

  /**
   * Get provider information and capabilities
   * @returns Provider information
   */
  getProviderInfo(): ProviderInfo;

  /**
   * Validate and sanitize parameters for this provider
   * @param params Raw parameters
   * @returns Validated parameters
   */
  validateParams(params: any): ImageGenerationParams;

  /**
   * Check if the provider is properly configured
   * @returns True if provider is ready to use
   */
  isConfigured(): boolean;
}
