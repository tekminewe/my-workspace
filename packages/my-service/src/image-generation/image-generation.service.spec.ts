import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ImageGenerationService } from './image-generation.service';
import { ImageProviderFactory } from './factories/image-provider.factory';
import { OpenAIImageProvider } from './providers/openai-image.provider';
import { FalAIImageProvider } from './providers/fal-ai-image.provider';
import { ImageProviderType } from './types/image-generation.types';

describe('ImageGenerationService', () => {
  let service: ImageGenerationService;
  let factory: ImageProviderFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
      ],
      providers: [
        ImageGenerationService,
        ImageProviderFactory,
        OpenAIImageProvider,
        FalAIImageProvider,
      ],
    }).compile();

    service = module.get<ImageGenerationService>(ImageGenerationService);
    factory = module.get<ImageProviderFactory>(ImageProviderFactory);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(factory).toBeDefined();
  });

  it('should return provider information', () => {
    const providers = service.getProviderInfo();
    expect(providers).toHaveLength(2);
    expect(providers.map((p) => p.type)).toContain(ImageProviderType.OPENAI);
    expect(providers.map((p) => p.type)).toContain(ImageProviderType.FAL_AI);
  });

  it('should handle missing API keys gracefully', async () => {
    const result = await service.generateImage({
      prompt: 'A test image',
      provider: ImageProviderType.OPENAI,
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('not configured');
  });
});
