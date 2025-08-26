import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fal } from '@fal-ai/client';
import {
  ImageGenerationParams,
  ImageGenerationResult,
  ImageProviderType,
  ProviderInfo,
} from '../types/image-generation.types';
import { ImageGenerationProvider } from '../interfaces/image-generation-provider.interface';
import { CostCalculator } from '../utils/cost-calculator';
import { randomUUID } from 'crypto';

@Injectable()
export class FalAIImageProvider implements ImageGenerationProvider {
  private readonly logger = new Logger(FalAIImageProvider.name);

  constructor(private readonly configService: ConfigService) {
    const falKey = this.configService.get<string>('FAL_AI_API_KEY');
    if (falKey) {
      fal.config({
        credentials: falKey,
      });
    }
  }

  async generateImage(
    params: ImageGenerationParams,
  ): Promise<ImageGenerationResult> {
    const startTime = Date.now();
    const requestId = randomUUID();

    try {
      if (!this.isConfigured()) {
        throw new Error('Fal.ai API key is not configured');
      }

      // Construct the full prompt by combining system prompt and main prompt
      let fullPrompt = params.prompt;
      if (params.systemPrompt) {
        fullPrompt = `${params.systemPrompt}\n\n${params.prompt}`;
      }

      // Add reference images to the prompt description if provided
      if (params.referenceImages && params.referenceImages.length > 0) {
        const referenceDescription = `\n\nReference style/composition: Based on the provided reference images, maintain similar visual style, composition, and aesthetic qualities.`;
        fullPrompt += referenceDescription;
      }

      // Calculate estimated costs and tokens
      const estimatedCost = CostCalculator.estimateCost(
        ImageProviderType.FAL_AI,
        params,
      );
      const inputTokens = CostCalculator.estimateTokens(fullPrompt);

      this.logger.log('Generating image with Fal.ai', {
        requestId,
        originalPrompt: params.prompt,
        systemPrompt: params.systemPrompt,
        fullPrompt: fullPrompt,
        estimatedCost,
        inputTokens,
        hasReferenceImages: !!(
          params.referenceImages && params.referenceImages.length > 0
        ),
        referenceImageCount: params.referenceImages?.length || 0,
        model: 'fal-ai/flux/schnell',
      });

      const input: any = {
        prompt: fullPrompt,
      };

      // Add reference images if supported (for image-to-image or style transfer)
      // Note: FLUX schnell primarily supports text-to-image, but we include this for future model support
      if (params.referenceImages && params.referenceImages.length > 0) {
        // For now, we incorporate reference images as prompt context
        // Future models might support direct image input
        this.logger.log('Reference images provided', {
          count: params.referenceImages.length,
          approach: 'text-description-based',
        });
      }

      // Add optional parameters that are supported
      if (params.imageSize) {
        input.image_size = params.imageSize;
      }
      if (params.numInferenceSteps) {
        input.num_inference_steps = params.numInferenceSteps;
      }
      if (params.seed !== undefined) {
        input.seed = params.seed;
      }

      this.logger.log('Fal.ai input parameters', { input });

      // Use FLUX Schnell model for fast generation
      const result = await fal.subscribe('fal-ai/flux/schnell', {
        input,
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === 'IN_PROGRESS') {
            this.logger.log('Fal.ai generation in progress', {
              status: update.status,
            });
          }
        },
      });

      if (!result.data?.images || result.data.images.length === 0) {
        throw new Error('No images returned from Fal.ai');
      }

      const imageData = result.data.images[0];

      // Convert image URL to base64 for consistency with OpenAI
      let imageBase64: string | undefined;
      try {
        const response = await fetch(imageData.url);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const mimeType = response.headers.get('content-type') || 'image/jpeg';
        imageBase64 = `data:${mimeType};base64,${buffer.toString('base64')}`;
      } catch (conversionError) {
        this.logger.warn('Could not convert image to base64', conversionError);
        // Still return success with URL only
      }

      const generationTime = Date.now() - startTime;

      return {
        success: true,
        imageUrl: imageData.url,
        imageBase64,
        prompt: fullPrompt, // Use the full combined prompt
        provider: ImageProviderType.FAL_AI,
        referenceImages: params.referenceImages,
        metadata: {
          model: 'fal-ai/flux/schnell',
          size:
            typeof params.imageSize === 'string' ? params.imageSize : 'custom',
          seed: result.data.seed,
          timings: result.data.timings,
          hasNsfwConcepts: result.data.has_nsfw_concepts,
          originalPrompt: params.prompt,
          systemPrompt: params.systemPrompt,
          fullPrompt: fullPrompt,
          // Enhanced metadata
          generationTimeMs: generationTime,
          inputTokens,
          outputTokens: 1, // Always 1 image for fal.ai
          estimatedCost,
          requestId,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      this.logger.error('Error generating image with Fal.ai', error);
      return {
        success: false,
        prompt: params.prompt,
        provider: ImageProviderType.FAL_AI,
        referenceImages: params.referenceImages,
        error:
          error instanceof Error
            ? error.message
            : 'Unknown error occurred during image generation',
      };
    }
  }

  getProviderInfo(): ProviderInfo {
    return {
      name: 'Fal.ai FLUX Schnell',
      type: ImageProviderType.FAL_AI,
      supportedFormats: ['jpeg', 'png'],
      supportedSizes: [
        'square_hd',
        'square',
        'portrait_4_3',
        'portrait_16_9',
        'landscape_4_3',
        'landscape_16_9',
      ],
      defaultParameters: {
        imageSize: 'landscape_4_3',
        numInferenceSteps: 4,
        guidanceScale: 3.5,
        numImages: 1,
        enableSafetyChecker: true,
        outputFormat: 'jpeg',
      },
    };
  }

  validateParams(params: any): ImageGenerationParams {
    // Validate image size
    let imageSize = params.imageSize || 'landscape_4_3';
    if (typeof imageSize === 'object' && imageSize.width && imageSize.height) {
      // Custom size object is valid
    } else if (typeof imageSize === 'string') {
      const validSizes = [
        'square_hd',
        'square',
        'portrait_4_3',
        'portrait_16_9',
        'landscape_4_3',
        'landscape_16_9',
      ];
      if (!validSizes.includes(imageSize)) {
        imageSize = 'landscape_4_3';
      }
    } else {
      imageSize = 'landscape_4_3';
    }

    return {
      prompt: params.prompt || '',
      systemPrompt: params.systemPrompt,
      referenceImages: Array.isArray(params.referenceImages)
        ? params.referenceImages
        : [],
      provider: ImageProviderType.FAL_AI,
      imageSize,
      numInferenceSteps: Number.isInteger(params.numInferenceSteps)
        ? Math.max(1, Math.min(50, params.numInferenceSteps))
        : 4,
      guidanceScale:
        typeof params.guidanceScale === 'number'
          ? Math.max(1, Math.min(20, params.guidanceScale))
          : 3.5,
      seed:
        Number.isInteger(params.seed) && params.seed >= 0
          ? params.seed
          : undefined,
      numImages: Number.isInteger(params.numImages)
        ? Math.max(1, Math.min(4, params.numImages))
        : 1,
      enableSafetyChecker: params.enableSafetyChecker ?? true,
      outputFormat: ['jpeg', 'png'].includes(params.outputFormat)
        ? params.outputFormat
        : 'jpeg',
    };
  }

  isConfigured(): boolean {
    return !!this.configService.get<string>('FAL_AI_API_KEY');
  }
}
