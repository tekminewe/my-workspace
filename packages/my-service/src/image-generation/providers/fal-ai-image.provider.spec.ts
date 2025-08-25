import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { FalAIImageProvider } from './fal-ai-image.provider';

describe('FalAIImageProvider', () => {
  let provider: FalAIImageProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
      ],
      providers: [FalAIImageProvider],
    }).compile();

    provider = module.get<FalAIImageProvider>(FalAIImageProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should return provider info', () => {
    const info = provider.getProviderInfo();
    expect(info.type).toBe('FAL_AI');
    expect(info.name).toBe('Fal.ai FLUX Schnell');
    expect(info.supportedFormats).toContain('jpeg');
    expect(info.supportedFormats).toContain('png');
  });

  it('should handle missing API key gracefully', async () => {
    const result = await provider.generateImage({
      prompt: 'A test image',
      systemPrompt: 'Test system prompt',
      referenceImages: [],
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('API key');
    // Should contain enhanced metadata even on failure
    expect(result.provider).toBe('FAL_AI');
  });
});
