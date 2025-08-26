import { registerEnumType } from '@nestjs/graphql';

export enum ImageProviderType {
  OPENAI = 'OPENAI',
  FAL_AI = 'FAL_AI',
}

registerEnumType(ImageProviderType, {
  name: 'ImageProviderType',
  description: 'Available image generation providers',
});

export interface ImageGenerationParams {
  prompt: string;
  systemPrompt?: string;
  referenceImages?: string[];
  provider?: ImageProviderType;
  // OpenAI specific parameters
  quality?: 'standard' | 'hd';
  style?: 'vivid' | 'natural';
  // Fal.ai specific parameters
  imageSize?: string | { width: number; height: number };
  numInferenceSteps?: number;
  guidanceScale?: number;
  seed?: number;
  numImages?: number;
  enableSafetyChecker?: boolean;
  outputFormat?: 'jpeg' | 'png';
}

export interface ImageGenerationResult {
  success: boolean;
  imageUrl?: string;
  imageBase64?: string;
  prompt: string;
  provider: ImageProviderType;
  referenceImages?: string[];
  metadata?: {
    model?: string;
    size?: string;
    seed?: number;
    timings?: any;
    hasNsfwConcepts?: boolean[];
    originalPrompt?: string;
    systemPrompt?: string;
    fullPrompt?: string;
    quality?: string;
    // Enhanced metadata
    generationTimeMs?: number;
    inputTokens?: number;
    outputTokens?: number;
    estimatedCost?: number;
    requestId?: string;
    timestamp?: string;
  };
  error?: string;
}

export interface ProviderInfo {
  name: string;
  type: ImageProviderType;
  supportedFormats: string[];
  supportedSizes: string[];
  defaultParameters: Partial<ImageGenerationParams>;
}
