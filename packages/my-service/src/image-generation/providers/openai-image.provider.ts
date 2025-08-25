import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
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
export class OpenAIImageProvider implements ImageGenerationProvider {
  private readonly logger = new Logger(OpenAIImageProvider.name);
  private readonly openAIClient: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openAIClient = new OpenAI({ apiKey });
    }
  }

  async generateImage(
    params: ImageGenerationParams,
  ): Promise<ImageGenerationResult> {
    const startTime = Date.now();
    const requestId = randomUUID();

    try {
      const fullPrompt = params.systemPrompt
        ? `${params.systemPrompt}\n\n${params.prompt}`
        : params.prompt;

      const estimatedCost = CostCalculator.estimateCost(
        ImageProviderType.OPENAI,
        params,
      );
      const inputTokens = CostCalculator.estimateTokens(fullPrompt);

      this.logger.log('Generating image with OpenAI', {
        requestId,
        prompt: params.prompt,
        estimatedCost,
        inputTokens,
        hasSystemPrompt: !!params.systemPrompt,
        hasReferenceImages: !!(
          params.referenceImages && params.referenceImages.length > 0
        ),
        referenceImageCount: params.referenceImages?.length || 0,
      });

      if (!this.isConfigured()) {
        throw new Error('OpenAI API key is not configured');
      }

      // Always use the Responses API to match frontend implementation
      return this.generateUsingResponsesAPI(params, {
        startTime,
        requestId,
        estimatedCost,
        inputTokens,
      });
    } catch (error) {
      this.logger.error('Error generating image with OpenAI', error);
      return {
        success: false,
        prompt: params.prompt,
        provider: ImageProviderType.OPENAI,
        referenceImages: params.referenceImages,
        error:
          error instanceof Error
            ? error.message
            : 'Unknown error occurred during image generation',
      };
    }
  }

  private async generateUsingResponsesAPI(
    params: ImageGenerationParams,
    metadata?: {
      startTime: number;
      requestId: string;
      estimatedCost: number;
      inputTokens: number;
    },
  ): Promise<ImageGenerationResult> {
    // Build content array for user input
    const userContent: Array<
      | { type: 'input_text'; text: string }
      | {
          type: 'input_image';
          image_url: string;
          detail: 'high' | 'low' | 'auto';
        }
    > = [{ type: 'input_text', text: params.prompt }];

    // Add reference images if provided
    if (params.referenceImages && params.referenceImages.length > 0) {
      params.referenceImages.forEach((imageUrl) => {
        userContent.push({
          type: 'input_image',
          image_url: imageUrl,
          detail: 'high',
        });
      });
    }

    this.logger.log('OpenAI Responses API input', {
      userContentLength: userContent.length,
      hasSystemPrompt: !!params.systemPrompt,
      model: 'gpt-4.1-2025-04-14',
    });

    const response = await this.openAIClient.responses.create({
      model: 'gpt-4.1-2025-04-14',
      store: true,
      input: [
        {
          role: 'system',
          content: params.systemPrompt || this.getDefaultSystemPrompt(),
        },
        {
          role: 'user',
          content: userContent,
        },
      ],
      tools: [
        {
          type: 'image_generation',
          quality: 'high',
        },
      ],
    });

    // Extract image data from the response - matching frontend implementation
    const imageOutputs = response.output
      .filter((output) => output.type === 'image_generation_call')
      .map((output) => (output as any).result);

    if (imageOutputs.length === 0) {
      throw new Error('No image output returned from OpenAI Responses API');
    }

    const imageBase64 = imageOutputs[0];
    const generationTime = metadata ? Date.now() - metadata.startTime : 0;

    this.logger.log('OpenAI image generation successful', {
      outputCount: imageOutputs.length,
      hasImageData: !!imageBase64,
      generationTime,
    });

    return {
      success: true,
      imageBase64,
      prompt: params.prompt,
      provider: ImageProviderType.OPENAI,
      referenceImages: params.referenceImages,
      metadata: {
        model: 'gpt-4.1-2025-04-14',
        size: '1536x1024',
        quality: 'high',
        systemPrompt: params.systemPrompt,
        originalPrompt: params.prompt,
        // Enhanced metadata
        generationTimeMs: generationTime,
        inputTokens: metadata?.inputTokens,
        outputTokens: 1, // Always 1 image for OpenAI
        estimatedCost: metadata?.estimatedCost,
        requestId: metadata?.requestId,
        timestamp: new Date().toISOString(),
      },
    };
  }

  private getDefaultSystemPrompt(): string {
    return `You are an expert image generator. Create professional marketing visuals using the provided reference images.

Guidelines:
1. Create high-quality, professional marketing imagery that complements any provided reference images
2. Ensure the image works well for web display at 1536x1024 resolution
3. Use colors and design elements that work well with any provided reference images
4. Output format should be WebP for optimal web performance
5. If reference images are provided, use them as visual inspiration for style, colors, and theme
6. If no reference images are provided, create original content based on the text prompt only
7. Always maintain professional quality and ensure the composition works well for marketing purposes
8. Create visually appealing and cohesive designs that would work well for digital marketing campaigns

Logo Placement Instructions:
- If the FIRST reference image is provided, it represents the advertiser icon and should be placed in the BOTTOM RIGHT corner of the generated image
- If the SECOND reference image is provided, it represents the site logo and should be placed in the TOP LEFT corner of the generated image
- Ensure logos are clearly visible but not overwhelming - they should complement the main design
- Keep logos at an appropriate size (roughly 80-120px) and maintain their aspect ratio
- Add subtle drop shadows or backgrounds to logos if needed for visibility
- Any additional reference images beyond the first two should be used as style/theme inspiration only`;
  }

  getProviderInfo(): ProviderInfo {
    return {
      name: 'OpenAI',
      type: ImageProviderType.OPENAI,
      supportedFormats: ['webp', 'png'],
      supportedSizes: ['1024x1024', '1536x1024', '1024x1536'],
      defaultParameters: {
        quality: 'hd',
        style: 'vivid',
        numImages: 1,
      },
    };
  }

  validateParams(params: any): ImageGenerationParams {
    return {
      prompt: params.prompt || '',
      systemPrompt: params.systemPrompt,
      referenceImages: Array.isArray(params.referenceImages)
        ? params.referenceImages
        : [],
      provider: ImageProviderType.OPENAI,
      quality: ['standard', 'hd'].includes(params.quality)
        ? params.quality
        : 'hd',
      style: ['vivid', 'natural'].includes(params.style)
        ? params.style
        : 'vivid',
      numImages: Number.isInteger(params.numImages) ? params.numImages : 1,
    };
  }

  isConfigured(): boolean {
    return !!this.configService.get<string>('OPENAI_API_KEY');
  }
}
