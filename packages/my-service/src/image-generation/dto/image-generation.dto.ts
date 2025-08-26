import { Field, InputType, ObjectType, Int, Float } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsNumber,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';
import { ImageProviderType } from '../types/image-generation.types';

@InputType()
export class ImageGenerationInput {
  @Field()
  @IsString()
  prompt: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  systemPrompt?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  referenceImages?: string[];

  @Field(() => ImageProviderType, { nullable: true })
  @IsOptional()
  @IsEnum(ImageProviderType)
  provider?: ImageProviderType;

  // OpenAI specific parameters
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  quality?: 'standard' | 'hd';

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  style?: 'vivid' | 'natural';

  // Fal.ai specific parameters
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  imageSize?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(50)
  numInferenceSteps?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  guidanceScale?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  seed?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(4)
  numImages?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  enableSafetyChecker?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  outputFormat?: 'jpeg' | 'png';
}

@ObjectType()
export class ImageGenerationMetadata {
  @Field({ nullable: true })
  model?: string;

  @Field({ nullable: true })
  size?: string;

  @Field(() => Int, { nullable: true })
  seed?: number;

  @Field({ nullable: true })
  timings?: string; // JSON string

  @Field(() => [Boolean], { nullable: true })
  hasNsfwConcepts?: boolean[];

  // Enhanced metadata fields
  @Field(() => Int, { nullable: true })
  generationTimeMs?: number;

  @Field(() => Int, { nullable: true })
  inputTokens?: number;

  @Field(() => Int, { nullable: true })
  outputTokens?: number;

  @Field(() => Float, { nullable: true })
  estimatedCost?: number;

  @Field({ nullable: true })
  requestId?: string;

  @Field({ nullable: true })
  timestamp?: string;
}

@ObjectType()
export class ImageGenerationResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  imageBase64?: string;

  @Field()
  prompt: string;

  @Field(() => ImageProviderType)
  provider: ImageProviderType;

  @Field(() => [String], { nullable: true })
  referenceImages?: string[];

  @Field(() => ImageGenerationMetadata, { nullable: true })
  metadata?: ImageGenerationMetadata;

  @Field({ nullable: true })
  error?: string;
}

@ObjectType()
export class ProviderInfoResponse {
  @Field()
  name: string;

  @Field(() => ImageProviderType)
  type: ImageProviderType;

  @Field(() => [String])
  supportedFormats: string[];

  @Field(() => [String])
  supportedSizes: string[];

  @Field()
  configured: boolean;
}
