import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginatedOkResponse, OkResponseDto } from 'src/app.dto';
import { Public } from 'src/auth/auth.decorator';
import { PageDto } from './page.dto';
import { PageService } from './page.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Page')
@ApiExtraModels(OkResponseDto, PageDto, PaginatedOkResponse)
@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Public()
  @ApiOkResponse({
    description: 'Get a page with slug',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponseDto) },
        {
          required: ['data'],
          properties: {
            data: {
              type: 'object',
              $ref: getSchemaPath(PageDto),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ operationId: 'getPageBySlug' })
  @Get('slug/:slug')
  async getPageBySlug(@Param('slug') slug: string) {
    const result = await this.pageService.getPageBySlug({
      slug,
    });

    if (result === null) {
      throw new NotFoundException();
    }

    return result;
  }
}
