import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { OkResponseDto } from 'src/app.dto';
import { MediaDto } from './media.dto';
import { AuthService } from 'src/auth/auth.service';

@ApiBearerAuth()
@ApiExtraModels(OkResponseDto, MediaDto)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly authService: AuthService,
  ) {}

  @ApiOkResponse({
    description: 'Upload the media file',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponseDto) },
        {
          required: ['data'],
          properties: {
            data: {
              type: 'object',
              $ref: getSchemaPath(MediaDto),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ operationId: 'uploadMedia' })
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile('file') file: Express.Multer.File) {
    const currentUser = this.authService.getCurrentUser();
    const result = await this.mediaService.uploadFile({
      file,
      companyId: currentUser.company?.id,
    });
    return new MediaDto(result);
  }
}
