import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { ImageGenerationService } from './image-generation.service';
import {
  ImageGenerationInput,
  ImageGenerationResponse,
  ProviderInfoResponse,
} from './dto/image-generation.dto';
import { ImageProviderType } from './types/image-generation.types';

@Resolver()
export class ImageGenerationResolver {
  private readonly logger = new Logger(ImageGenerationResolver.name);

  constructor(
    private readonly imageGenerationService: ImageGenerationService,
  ) {}

  @Mutation(() => ImageGenerationResponse)
  async generateImage(
    @Args('input') input: ImageGenerationInput,
  ): Promise<ImageGenerationResponse> {
    this.logger.log('GraphQL mutation: generateImage', {
      provider: input.provider,
      promptLength: input.prompt.length,
    });

    const result = await this.imageGenerationService.generateImage(input);

    // Transform the result to match GraphQL schema
    return {
      success: result.success,
      imageUrl: result.imageUrl,
      imageBase64: result.imageBase64,
      prompt: result.prompt,
      provider: result.provider,
      referenceImages: result.referenceImages,
      metadata: result.metadata
        ? {
            model: result.metadata.model,
            size: result.metadata.size,
            seed: result.metadata.seed,
            timings: result.metadata.timings
              ? JSON.stringify(result.metadata.timings)
              : undefined,
            hasNsfwConcepts: result.metadata.hasNsfwConcepts,
            // Enhanced metadata
            generationTimeMs: result.metadata.generationTimeMs,
            inputTokens: result.metadata.inputTokens,
            outputTokens: result.metadata.outputTokens,
            estimatedCost: result.metadata.estimatedCost,
            requestId: result.metadata.requestId,
            timestamp: result.metadata.timestamp,
          }
        : undefined,
      error: result.error,
    };
  }

  @Query(() => [ProviderInfoResponse])
  async getImageProviders(): Promise<ProviderInfoResponse[]> {
    this.logger.log('GraphQL query: getImageProviders');
    return this.imageGenerationService.getProviderInfo();
  }

  @Query(() => ImageProviderType, { nullable: true })
  async getDefaultImageProvider(): Promise<ImageProviderType | null> {
    this.logger.log('GraphQL query: getDefaultImageProvider');
    return this.imageGenerationService.getDefaultProvider();
  }
}
