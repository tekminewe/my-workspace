import {
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdvertiserService } from './advertiser.service';
import { Public } from 'src/auth/auth.decorator';
import {
  AdvertiserDto,
  CreateAdvertiserClickResponseDto,
} from './advertiser.dto';
import { AuthService } from 'src/auth/auth.service';
import { ApiDefinition } from 'src/api-definition.decorator';

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Affiliate')
@Controller('affiliate/advertisers')
export class AdvertiserController {
  constructor(
    private readonly advertiserService: AdvertiserService,
    private readonly authService: AuthService,
  ) {}

  @ApiDefinition({
    description: 'Get popular advertisers',
    operationId: 'getPopularAdvertisers',
    responseType: AdvertiserDto,
    dataType: 'array',
  })
  @Public()
  @Get('/popular')
  async getPopularAdvertisers() {
    const language = await this.authService.getAcceptLanguage();
    return this.advertiserService.getPopularAdvertisers({
      language,
    });
  }

  @Public()
  @ApiDefinition({
    description: 'Get a advertiser',
    operationId: 'getAdvertiser',
    responseType: AdvertiserDto,
  })
  @Get('/:id')
  async getById(@Param('id') id: string) {
    const result = await this.advertiserService.getAdvertiser({
      id,
    });

    if (result === null) {
      throw new NotFoundException();
    }

    return result;
  }

  @Public()
  @ApiDefinition({
    description: 'Get a advertiser by slug',
    operationId: 'getAdvertiserBySlug',
    responseType: AdvertiserDto,
  })
  @Get('/slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    const language = await this.authService.getAcceptLanguage();
    const result = await this.advertiserService.getAdvertiserBySlug({
      slug,
      language,
    });

    if (result === null) {
      throw new NotFoundException();
    }

    return result;
  }

  @ApiDefinition({
    description: 'Create a user advertiser click',
    operationId: 'createUserAdvertiserClick',
    responseType: CreateAdvertiserClickResponseDto,
  })
  @Post('/:id/click')
  async createUserAdvertiserClick(@Param('id') id: string) {
    const currentUser = await this.authService.getCurrentUser();
    const result = await this.advertiserService.createUserAdvertiserClick({
      advertiserId: id,
      ipAddress: currentUser.ipAddress,
      userAgent: currentUser.userAgent,
      referrer: currentUser.referrer,
      userId: currentUser.id,
    });
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @ApiDefinition({
    description: 'Get all advertisers',
    operationId: 'getAllAdvertisers',
    responseType: AdvertiserDto,
    dataType: 'array',
  })
  @Public()
  @Get()
  async getAllAdvertisers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    const language = await this.authService.getAcceptLanguage();
    return this.advertiserService.getAdvertisers({
      page,
      pageSize,
      language,
    });
  }
}
