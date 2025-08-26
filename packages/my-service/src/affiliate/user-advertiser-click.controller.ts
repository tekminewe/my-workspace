import {
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdvertiserService } from './advertiser.service';
import { UserAdvertiserClickDto } from './advertiser.dto';
import { ApiDefinition } from 'src/api-definition.decorator';
import { AuthService } from 'src/auth/auth.service';

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Affiliate')
@Controller('affiliate/user-clicks')
export class UserAdvertiserClickController {
  constructor(
    private readonly advertiserService: AdvertiserService,
    private readonly authService: AuthService,
  ) {}

  @ApiDefinition({
    description: 'Get current user clicks',
    operationId: 'getMyClicks',
    responseType: UserAdvertiserClickDto,
    dataType: 'array',
  })
  @Get('/me')
  async getMyClicks(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    const currentUser = this.authService.getCurrentUser();
    const language = await this.authService.getAcceptLanguage();
    const { pagination, clicks } =
      await this.advertiserService.getUserAdvertiserClicks({
        userId: currentUser.id,
        page,
        pageSize,
        language,
      });

    return {
      data: clicks,
      pagination,
    };
  }
}
