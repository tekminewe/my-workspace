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
import { ApiDefinition } from 'src/api-definition.decorator';
import { AuthService } from 'src/auth/auth.service';
import { CashbackService } from './cashback.service';
import { UserCashbackDto, PendingBalanceDto } from './cashback.dto';

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Affiliate')
@Controller('affiliate/cashback')
export class CashbackController {
  constructor(
    private readonly cashbackService: CashbackService,
    private readonly authService: AuthService,
  ) {}

  @ApiDefinition({
    description: 'Get current user cashback',
    operationId: 'getMyCashbacks',
    responseType: UserCashbackDto,
    dataType: 'array',
  })
  @Get('/me')
  async getMyClicks(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    const currentUser = this.authService.getCurrentUser();
    const language = await this.authService.getAcceptLanguage();
    const { pagination, data } = await this.cashbackService.getUserCashbacks({
      userId: currentUser.id,
      page,
      pageSize,
      language,
    });

    return {
      data,
      pagination,
    };
  }

  @ApiDefinition({
    description: 'Get pending cashback balance for the current user',
    operationId: 'getPendingBalance',
    responseType: PendingBalanceDto,
  })
  @Get('/pending-balance')
  async getPendingBalance() {
    const currentUser = this.authService.getCurrentUser();
    const pendingBalance = await this.cashbackService.getUserPendingBalance(
      currentUser.id,
    );
    return pendingBalance;
  }
}
