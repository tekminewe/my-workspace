import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageGenerationService } from './image-generation.service';
import { ImageGenerationResolver } from './image-generation.resolver';
import { ImageProviderFactory } from './factories/image-provider.factory';
import { OpenAIImageProvider } from './providers/openai-image.provider';
import { FalAIImageProvider } from './providers/fal-ai-image.provider';

@Module({
  imports: [ConfigModule],
  providers: [
    ImageGenerationService,
    ImageGenerationResolver,
    ImageProviderFactory,
    OpenAIImageProvider,
    FalAIImageProvider,
  ],
  exports: [ImageGenerationService],
})
export class ImageGenerationModule {}
