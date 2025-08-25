import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MediaService } from 'src/media/media.service';
import { Media } from './media.model';
import { UploadMediaInput } from './media.input';
import { BadRequestException } from '@nestjs/common';
import { AllowIAM } from 'src/auth/auth.decorator';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Query(() => Media)
  async media(@Args('id', { type: () => String }) id: string) {
    const media = await this.mediaService.getMediaById(id);

    if (!media) {
      return null;
    }

    return {
      id: media.id,
      url: `${process.env.MEDIA_URL}/${media.filePath}`,
      caption: media.caption,
      mimeType: media.mimeType,
      createdAt: media.createdAt,
    };
  }

  @Mutation(() => Media)
  @AllowIAM()
  async uploadMedia(@Args('data') input: UploadMediaInput): Promise<Media> {
    try {
      const media = await this.mediaService.uploadBase64File(input);
      return {
        id: media.id,
        url: `${process.env.MEDIA_URL}/${media.filePath}`,
        caption: media.caption,
        mimeType: media.mimeType,
        createdAt: media.createdAt,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to upload media: ${error.message}`);
    }
  }
}
