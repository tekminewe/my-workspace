import { Algoliasearch, algoliasearch } from 'algoliasearch';
import { SearchClient } from './search.client';

export class AlgoliaSearchClient extends SearchClient {
  private readonly algoliaClient: Algoliasearch;
  constructor() {
    super();

    this.algoliaClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_API_KEY,
    );
  }

  async indexObjects({
    indexName,
    objects,
  }: {
    indexName: string;
    objects: any[];
  }): Promise<boolean> {
    await this.algoliaClient.saveObjects({
      indexName,
      objects,
    });

    return true;
  }

  async searchObjects<T>({
    indexName,
    query,
  }: {
    indexName: string;
    query: string;
  }): Promise<T[]> {
    const { hits } = await this.algoliaClient.searchSingleIndex({
      indexName,
      searchParams: {
        query: encodeURIComponent(query),
      },
    });

    return hits as T[];
  }

  async removeObject({
    objectKey,
    indexName,
  }: {
    objectKey: string;
    indexName: string;
  }) {
    await this.algoliaClient.deleteObject({
      objectID: objectKey,
      indexName: indexName,
    });
  }

  async clearIndex({ indexName }: { indexName: string }) {
    await this.algoliaClient.clearObjects({
      indexName: indexName,
    });
  }
}
