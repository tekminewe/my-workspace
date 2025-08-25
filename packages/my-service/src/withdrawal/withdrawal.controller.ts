import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiDefinition } from 'src/api-definition.decorator';
import { UserWithdrawalDto } from './withdrawal.dto';
import { AuthService } from 'src/auth/auth.service';
import { PaginationDto } from 'src/pagination/pagination.dto';

@ApiBearerAuth()
@ApiTags('Withdrawal')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('withdrawals')
export class WithdrawalController {
  constructor(
    private readonly withdrawalService: WithdrawalService,
    private readonly authService: AuthService,
  ) {}

  @ApiDefinition({
    description: 'Get current user withdrawals',
    operationId: 'getUserWithdrawals',
    responseType: UserWithdrawalDto,
    dataType: 'array',
  })
  @Get()
  async getUserWithdrawals(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ): Promise<{ data: UserWithdrawalDto[]; pagination: PaginationDto }> {
    const currentUser = await this.authService.getCurrentUser();
    const languageId = await this.authService.getAcceptLanguage();
    return this.withdrawalService.getUserWithdrawals(
      currentUser.id,
      languageId,
      page,
      pageSize,
    );
  }
}
