import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiDefinition } from 'src/api-definition.decorator';
import { UserCashbackS2SService } from './user-cashback.s2s.service';
import { ProcessUserCashbackDto } from './user-cashback.s2s.dto';
import { UserCashbackDto } from './cashback.dto';
import { Public } from 'src/auth/auth.decorator';

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('AffiliateS2S')
@Controller('s2s/affiliate/cashback')
export class UserCashbackS2SController {
  constructor(private readonly cashbackService: UserCashbackS2SService) {}

  @ApiDefinition({
    description: 'Create or update user cashback',
    operationId: 'processUserCashback',
    responseType: UserCashbackDto,
  })
  @Public()
  @Post()
  async processUserCashback(@Body() data: ProcessUserCashbackDto) {
    await this.cashbackService.processUserCashback(data);

    return null;
  }
}
