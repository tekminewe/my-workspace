export interface ISearchClient {
  indexObjects({
    indexName,
    objects,
  }: {
    objects: any[];
    indexName: string;
  }): Promise<boolean>;

  searchObjects<T>({
    indexName,
    query,
  }: {
    query: string;
    indexName: string;
  }): Promise<T[]>;

  clearIndex({ indexName }: { indexName: string }): Promise<void>;
}

export abstract class SearchClient implements ISearchClient {
  constructor() {}

  abstract indexObjects(_: {
    objects: any[];
    indexName: string;
  }): Promise<boolean>;

  abstract removeObject(_: {
    objectKey: string;
    indexName: string;
  }): Promise<void>;

  abstract searchObjects<T>({
    indexName,
    query,
  }: {
    query: string;
    indexName: string;
  }): Promise<T[]>;

  abstract clearIndex(_: { indexName: string }): Promise<void>;
}
