import { Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { Pagination } from './pagination.model';

@Module({
  exports: [PaginationService, Pagination],
  providers: [PaginationService, Pagination],
})
export class PaginationModule {}
