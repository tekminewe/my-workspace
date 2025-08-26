import { Module } from '@nestjs/common';
import { AlgoliaSearchClient } from './aglolia.client';
import { SearchService } from './search.service';

@Module({
  exports: [SearchService],
  providers: [AlgoliaSearchClient, SearchService],
})
export class SearchModule {}
