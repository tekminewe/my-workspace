import { Injectable } from '@nestjs/common';
import { AlgoliaSearchClient } from './aglolia.client';

@Injectable()
export class SearchService {
  constructor(private readonly searchClient: AlgoliaSearchClient) {}

  async indexObjects({
    indexName,
    objects,
  }: {
    indexName: string;
    objects: any[];
  }): Promise<boolean> {
    return this.searchClient.indexObjects({ indexName, objects });
  }

  async removeObject({
    indexName,
    objectKey,
  }: {
    indexName: string;
    objectKey: string;
  }) {
    return this.searchClient.removeObject({ indexName, objectKey });
  }

  async searchObjects<T>({
    indexName,
    query,
  }: {
    indexName: string;
    query: string;
  }): Promise<T[]> {
    return this.searchClient.searchObjects<T>({ indexName, query });
  }

  async clearIndex({ indexName }: { indexName: string }) {
    return this.searchClient.clearIndex({ indexName });
  }
}
