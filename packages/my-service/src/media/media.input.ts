import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UploadMediaInput {
  @Field(() => String, { description: 'Base64 encoded file content' })
  @IsString()
  fileBase64: string;

  @Field(() => String, { description: 'Original filename' })
  @IsString()
  filename: string;

  @Field(() => String, { description: 'Mime type of the file' })
  @IsString()
  mimeType: string;

  @Field(() => String, { nullable: true, description: 'Caption for the media' })
  @IsOptional()
  @IsString()
  caption?: string;

  @Field(() => String, {
    nullable: true,
    description:
      'Custom filename pattern (e.g., "logo", "logo-dark"). If provided, will use this instead of original filename with timestamp.',
  })
  @IsOptional()
  @IsString()
  customFilename?: string;
}
