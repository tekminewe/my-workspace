import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginatedOkResponse, OkResponseDto } from 'src/app.dto';
import { TagService } from './tag.service';
import { TagDto } from './tag.dto';
import { AuthService } from 'src/auth/auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Tags')
@ApiExtraModels(OkResponseDto, TagDto, PaginatedOkResponse)
@Controller('tags')
export class TagController {
  constructor(
    private readonly tagService: TagService,
    private readonly authService: AuthService,
  ) {}

  @ApiOkResponse({
    description: 'Search a list of tags',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedOkResponse) },
        {
          required: ['data'],
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: getSchemaPath(TagDto),
              },
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ operationId: 'getTags' })
  @ApiQuery({ name: 'name', required: false, type: String })
  @Get()
  async getTags(@Query('name') name?: string) {
    const user = this.authService.getCurrentUser();
    return this.tagService.getTags({ name, companyId: user.company.id });
  }
}
