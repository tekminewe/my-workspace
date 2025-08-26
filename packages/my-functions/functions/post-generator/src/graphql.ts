import { GraphQLClient, RequestOptions } from "graphql-request";
import { GraphQLError, print } from "graphql";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
type GraphQLClientRequestHeaders = RequestOptions["requestHeaders"];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type Advertiser = {
  __typename?: "Advertiser";
  commission?: Maybe<AdvertiserCommission>;
  createdAt: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  logo: Media;
  logoId: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
  statusId: AdvertiserStatusEnum;
  updatedAt: Scalars["DateTime"]["output"];
};

export type AdvertiserCampaign = {
  __typename?: "AdvertiserCampaign";
  advertiser: Advertiser;
  advertiserId: Scalars["String"]["output"];
  /** Banner from the current language metadata, or null if not found */
  banner?: Maybe<Media>;
  createdAt: Scalars["DateTime"]["output"];
  /** Description from the current language metadata, or null if not found */
  description: Scalars["String"]["output"];
  endDate: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  metadatas: Array<AdvertiserCampaignMetadata>;
  name: Scalars["String"]["output"];
  providerId: AffiliateProviderEnum;
  providerReferenceId: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
  startDate: Scalars["DateTime"]["output"];
  statusId: AdvertiserCampaignStatusEnum;
  updatedAt: Scalars["DateTime"]["output"];
  url: Scalars["String"]["output"];
  voucherCodes: Array<Scalars["String"]["output"]>;
};

export type AdvertiserCampaignMetadata = {
  __typename?: "AdvertiserCampaignMetadata";
  banner?: Maybe<Media>;
  description: Scalars["String"]["output"];
  languageId: LanguageEnum;
  name: Scalars["String"]["output"];
};

export type AdvertiserCampaignMetadataInput = {
  /** The ID of the banner image for the advertiser campaign */
  bannerId?: InputMaybe<Scalars["String"]["input"]>;
  /** The description of the advertiser campaign */
  description: Scalars["String"]["input"];
  /** The language of the advertiser campaign metadata */
  languageId: LanguageEnum;
  /** The name of the advertiser campaign */
  name: Scalars["String"]["input"];
};

export type AdvertiserCampaignPagination = {
  __typename?: "AdvertiserCampaignPagination";
  currentPage: Scalars["Int"]["output"];
  nextPage?: Maybe<Scalars["Int"]["output"]>;
  pageSize: Scalars["Int"]["output"];
  previousPage?: Maybe<Scalars["Int"]["output"]>;
  totalItems: Scalars["Int"]["output"];
  totalPages: Scalars["Int"]["output"];
};

export enum AdvertiserCampaignStatusEnum {
  Active = "Active",
  Inactive = "Inactive",
}

export type AdvertiserCommission = {
  __typename?: "AdvertiserCommission";
  commission: Scalars["Float"]["output"];
  commissionRows: Array<AdvertiserCommissionRow>;
  dayToPayout: Scalars["Float"]["output"];
  dayToValidate: Scalars["Float"]["output"];
  id: Scalars["String"]["output"];
  url: Scalars["String"]["output"];
};

export type AdvertiserCommissionRow = {
  __typename?: "AdvertiserCommissionRow";
  advertiserCommissionId: Scalars["String"]["output"];
  commission: Scalars["Float"]["output"];
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  typeId: Scalars["String"]["output"];
};

export type AdvertiserProviderReference = {
  __typename?: "AdvertiserProviderReference";
  advertiser?: Maybe<Advertiser>;
  advertiserId: Scalars["String"]["output"];
  providerId: AffiliateProviderEnum;
  providerReferenceId: Scalars["String"]["output"];
};

export enum AdvertiserStatusEnum {
  Active = "Active",
  Inactive = "Inactive",
}

export type AdvertisersPagination = {
  __typename?: "AdvertisersPagination";
  currentPage: Scalars["Int"]["output"];
  nextPage?: Maybe<Scalars["Int"]["output"]>;
  pageSize: Scalars["Int"]["output"];
  previousPage?: Maybe<Scalars["Int"]["output"]>;
  totalItems: Scalars["Int"]["output"];
  totalPages: Scalars["Int"]["output"];
};

export enum AffiliateProviderEnum {
  InvolveAsia = "InvolveAsia",
}

export type Carousel = {
  __typename?: "Carousel";
  cta: CarouselCta;
  endDate: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  image: Media;
  metadatas: Array<CarouselMetada>;
  sortOrder: Scalars["String"]["output"];
  startDate: Scalars["DateTime"]["output"];
  status: CarouselStatusEnum;
  title: Scalars["String"]["output"];
};

export type CarouselCta = CarouselCtaCashback | CarouselCtaLink;

export type CarouselCtaCashback = {
  __typename?: "CarouselCtaCashback";
  payload: CarouselCtaCashbackPayload;
  type: CarouselCtaEnum;
};

export type CarouselCtaCashbackPayload = {
  __typename?: "CarouselCtaCashbackPayload";
  advertiserCashbackRate: Scalars["Float"]["output"];
  advertiserId: Scalars["String"]["output"];
  advertiserLogoUrl: Scalars["String"]["output"];
  advertiserName: Scalars["String"]["output"];
  advertiserRedirectUrl: Scalars["String"]["output"];
  advertiserSlug: Scalars["String"]["output"];
};

export enum CarouselCtaEnum {
  Cashback = "Cashback",
  Link = "Link",
}

export type CarouselCtaLink = {
  __typename?: "CarouselCtaLink";
  payload: CarouselCtaLinkPayload;
  type: CarouselCtaEnum;
};

export type CarouselCtaLinkPayload = {
  __typename?: "CarouselCtaLinkPayload";
  link: Scalars["String"]["output"];
};

export type CarouselMetada = {
  __typename?: "CarouselMetada";
  id: Scalars["String"]["output"];
  image: Media;
  languageId: LanguageEnum;
};

export enum CarouselStatusEnum {
  Active = "Active",
  Inactive = "Inactive",
}

export type CarouselsPagination = {
  __typename?: "CarouselsPagination";
  currentPage: Scalars["Int"]["output"];
  nextPage?: Maybe<Scalars["Int"]["output"]>;
  pageSize: Scalars["Int"]["output"];
  previousPage?: Maybe<Scalars["Int"]["output"]>;
  totalItems: Scalars["Int"]["output"];
  totalPages: Scalars["Int"]["output"];
};

export type CreateAdvertiserCampaignInput = {
  /** The ID of the advertiser for this campaign */
  advertiserId: Scalars["String"]["input"];
  /** The end date of the campaign */
  endDate: Scalars["DateTime"]["input"];
  /** The advertiser campaign metadata in different languages */
  metadatas: Array<AdvertiserCampaignMetadataInput>;
  /** The ID of the affiliate provider */
  providerId: AffiliateProviderEnum;
  /** The reference ID of the campaign in the provider system */
  providerReferenceId: Scalars["String"]["input"];
  /** URL-friendly identifier for the campaign */
  slug: Scalars["String"]["input"];
  /** The start date of the campaign */
  startDate: Scalars["DateTime"]["input"];
  /** The status of the advertiser campaign */
  statusId?: InputMaybe<AdvertiserCampaignStatusEnum>;
  /** The URL of the advertiser campaign */
  url: Scalars["String"]["input"];
  /** The voucher codes for the campaign */
  voucherCodes: Array<Scalars["String"]["input"]>;
};

export type CreateCarouselInput = {
  ctaPayloadAdvertiserId?: InputMaybe<Scalars["String"]["input"]>;
  ctaPayloadLink?: InputMaybe<Scalars["String"]["input"]>;
  ctaType: CarouselCtaEnum;
  endDate: Scalars["DateTime"]["input"];
  metadatas: Array<CreateCarouselMetadataInput>;
  sortOrder: Scalars["Int"]["input"];
  startDate: Scalars["DateTime"]["input"];
  status: CarouselStatusEnum;
  title: Scalars["String"]["input"];
};

export type CreateCarouselMetadataInput = {
  imageId: Scalars["String"]["input"];
  languageId: LanguageEnum;
};

export type CreatePostInput = {
  /** The main content of the post */
  content?: InputMaybe<Scalars["String"]["input"]>;
  /** A short summary or description of the post */
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** Version of the editor used */
  editorVersion?: InputMaybe<Scalars["Int"]["input"]>;
  /** ID of the featured image associated with the post */
  featuredImageId?: InputMaybe<Scalars["ID"]["input"]>;
  /** The date the post was published or scheduled */
  postDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** The type of the post (e.g., blog, article) */
  postTypeId?: InputMaybe<PostTypeEnum>;
  /** URL-friendly identifier for the post */
  slug?: InputMaybe<Scalars["String"]["input"]>;
  /** The status of the post (e.g., draft, published) */
  statusId?: InputMaybe<PostStatusEnum>;
  /** List of tags associated with the post */
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** The title of the post */
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type Language = {
  __typename?: "Language";
  code: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: LanguageEnum;
  isDefault: Scalars["Boolean"]["output"];
  isSupported: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  shortName: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export enum LanguageEnum {
  EnGb = "EN_GB",
  EnMy = "EN_MY",
  EnUs = "EN_US",
  ZhCn = "ZH_CN",
  ZhMy = "ZH_MY",
}

export type Media = {
  __typename?: "Media";
  /** Optional caption for the media */
  caption?: Maybe<Scalars["String"]["output"]>;
  /** When the media was created */
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  /** Unique identifier for the media */
  id: Scalars["String"]["output"];
  /** File mime type */
  mimeType?: Maybe<Scalars["String"]["output"]>;
  /** Publicly accessible URL to the media */
  url: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Create a new advertiser campaign */
  createAdvertiserCampaign: AdvertiserCampaign;
  createCarousel: Carousel;
  createPost: Post;
  /** Refreshes the advertiser search index. If no advertiserId is provided, all active advertisers will be re-indexed. */
  refreshAdvertiserSearchIndex: RefreshAdvertiserSearchIndexOutput;
  updateAdvertiser: Advertiser;
  /** Update an existing advertiser campaign */
  updateAdvertiserCampaign: AdvertiserCampaign;
  updateCarousel: Carousel;
  updatePost: Post;
  uploadMedia: Media;
};

export type MutationCreateAdvertiserCampaignArgs = {
  data: CreateAdvertiserCampaignInput;
};

export type MutationCreateCarouselArgs = {
  data: CreateCarouselInput;
};

export type MutationCreatePostArgs = {
  data: CreatePostInput;
};

export type MutationRefreshAdvertiserSearchIndexArgs = {
  data: RefreshAdvertiserSearchIndexInput;
};

export type MutationUpdateAdvertiserArgs = {
  data: UpdateAdvertiserInput;
  id: Scalars["String"]["input"];
};

export type MutationUpdateAdvertiserCampaignArgs = {
  data: UpdateAdvertiserCampaignInput;
};

export type MutationUpdateCarouselArgs = {
  data: UpdateCarouselInput;
  id: Scalars["String"]["input"];
};

export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
  id: Scalars["String"]["input"];
};

export type MutationUploadMediaArgs = {
  data: UploadMediaInput;
};

export type Post = {
  __typename?: "Post";
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  editorVersion: Scalars["Int"]["output"];
  featuredImage?: Maybe<Media>;
  featuredImageId?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  ogDescription?: Maybe<Scalars["String"]["output"]>;
  ogImage?: Maybe<Media>;
  ogImageId?: Maybe<Scalars["String"]["output"]>;
  ogTitle?: Maybe<Scalars["String"]["output"]>;
  postDate: Scalars["DateTime"]["output"];
  slug: Scalars["String"]["output"];
  status: PostStatus;
  statusId?: Maybe<PostStatusEnum>;
  tags?: Maybe<Array<PostTag>>;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type PostStatus = {
  __typename?: "PostStatus";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export enum PostStatusEnum {
  Draft = "Draft",
  Published = "Published",
}

export type PostTag = {
  __typename?: "PostTag";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export enum PostTypeEnum {
  Blog = "Blog",
  Page = "Page",
}

export type PostsPagination = {
  __typename?: "PostsPagination";
  currentPage: Scalars["Int"]["output"];
  nextPage?: Maybe<Scalars["Int"]["output"]>;
  pageSize: Scalars["Int"]["output"];
  previousPage?: Maybe<Scalars["Int"]["output"]>;
  totalItems: Scalars["Int"]["output"];
  totalPages: Scalars["Int"]["output"];
};

export type Query = {
  __typename?: "Query";
  advertiser: Advertiser;
  /** Get an advertiser campaign by ID */
  advertiserCampaign?: Maybe<AdvertiserCampaign>;
  /** Get an advertiser campaign by provider details */
  advertiserCampaignByProvider?: Maybe<AdvertiserCampaign>;
  /** Get advertiser campaigns with optional filtering by status, dates (endDateGt and startDateLte) and sorting by createdAt or startDate */
  advertiserCampaigns: Array<AdvertiserCampaign>;
  advertiserCampaignsPagination: AdvertiserCampaignPagination;
  advertiserProviderReferences: Array<AdvertiserProviderReference>;
  advertisers: Array<Advertiser>;
  advertisersPagination: AdvertisersPagination;
  carousel: Carousel;
  carousels: Array<Carousel>;
  carouselsPagination: CarouselsPagination;
  /** Get all languages with optional filtering by support status */
  languages: Array<Language>;
  media: Media;
  post?: Maybe<Post>;
  posts: Array<Post>;
  postsPagination: PostsPagination;
  searchAdvertisers: Array<SearchResultAdvertiser>;
  /** Get the site information */
  site: Site;
};

export type QueryAdvertiserArgs = {
  advertiserId?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAdvertiserCampaignArgs = {
  id: Scalars["String"]["input"];
};

export type QueryAdvertiserCampaignByProviderArgs = {
  providerId: AffiliateProviderEnum;
  providerReferenceId: Scalars["String"]["input"];
};

export type QueryAdvertiserCampaignsArgs = {
  advertiserId?: InputMaybe<Scalars["String"]["input"]>;
  advertiserSlug?: InputMaybe<Scalars["String"]["input"]>;
  endDateGt?: InputMaybe<Scalars["DateTime"]["input"]>;
  page?: Scalars["Int"]["input"];
  pageSize?: Scalars["Int"]["input"];
  providerId?: InputMaybe<AffiliateProviderEnum>;
  providerReferenceId?: InputMaybe<Scalars["String"]["input"]>;
  sortBy?: InputMaybe<SortByField>;
  sortDirection?: InputMaybe<SortDirection>;
  startDateLte?: InputMaybe<Scalars["DateTime"]["input"]>;
  statusId?: InputMaybe<AdvertiserCampaignStatusEnum>;
};

export type QueryAdvertiserCampaignsPaginationArgs = {
  advertiserId?: InputMaybe<Scalars["String"]["input"]>;
  advertiserSlug?: InputMaybe<Scalars["String"]["input"]>;
  endDateGt?: InputMaybe<Scalars["DateTime"]["input"]>;
  page?: Scalars["Int"]["input"];
  pageSize?: Scalars["Int"]["input"];
  providerId?: InputMaybe<AffiliateProviderEnum>;
  providerReferenceId?: InputMaybe<Scalars["String"]["input"]>;
  sortBy?: InputMaybe<SortByField>;
  sortDirection?: InputMaybe<SortDirection>;
  startDateLte?: InputMaybe<Scalars["DateTime"]["input"]>;
  statusId?: InputMaybe<AdvertiserCampaignStatusEnum>;
};

export type QueryAdvertiserProviderReferencesArgs = {
  advertiserId?: InputMaybe<Scalars["String"]["input"]>;
  providerId?: InputMaybe<AffiliateProviderEnum>;
};

export type QueryAdvertisersArgs = {
  page?: Scalars["Int"]["input"];
  pageSize?: Scalars["Int"]["input"];
  statusId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAdvertisersPaginationArgs = {
  page?: Scalars["Int"]["input"];
  pageSize?: Scalars["Int"]["input"];
  statusId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryCarouselArgs = {
  id: Scalars["String"]["input"];
};

export type QueryCarouselsArgs = {
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  page?: Scalars["Int"]["input"];
  pageSize?: Scalars["Int"]["input"];
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryCarouselsPaginationArgs = {
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  page?: Scalars["Int"]["input"];
  pageSize?: Scalars["Int"]["input"];
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryLanguagesArgs = {
  isSupported?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryMediaArgs = {
  id: Scalars["String"]["input"];
};

export type QueryPostArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryPostsArgs = {
  page?: Scalars["Int"]["input"];
  pageSize?: Scalars["Int"]["input"];
  statusId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryPostsPaginationArgs = {
  page?: Scalars["Int"]["input"];
  pageSize?: Scalars["Int"]["input"];
  statusId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QuerySearchAdvertisersArgs = {
  query?: InputMaybe<Scalars["String"]["input"]>;
};

export type RefreshAdvertiserSearchIndexInput = {
  /** Optional specific advertiser ID to refresh. If not provided, all advertisers will be re-indexed. */
  advertiserId?: InputMaybe<Scalars["String"]["input"]>;
};

export type RefreshAdvertiserSearchIndexOutput = {
  __typename?: "RefreshAdvertiserSearchIndexOutput";
  /** Indicates whether the operation was successful */
  success: Scalars["Boolean"]["output"];
};

export type SearchResultAdvertiser = {
  __typename?: "SearchResultAdvertiser";
  categories: Array<Scalars["String"]["output"]>;
  commission: Scalars["Float"]["output"];
  id: Scalars["String"]["output"];
  logo: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type Site = {
  __typename?: "Site";
  /** The creation date of the site */
  createdAt: Scalars["DateTime"]["output"];
  /** The description of the site */
  description?: Maybe<Scalars["String"]["output"]>;
  /** The domain of the site */
  domain?: Maybe<Scalars["String"]["output"]>;
  /** The ID of the site */
  id: Scalars["String"]["output"];
  /** The logo of the site */
  logo?: Maybe<Media>;
  /** The name of the site */
  name: Scalars["String"]["output"];
  /** The last update date of the site */
  updatedAt: Scalars["DateTime"]["output"];
};

/** Fields to sort advertiser campaigns by */
export enum SortByField {
  CreatedAt = "CreatedAt",
  StartDate = "StartDate",
}

/** Direction to sort advertiser campaigns */
export enum SortDirection {
  Asc = "Asc",
  Desc = "Desc",
}

export type UpdateAdvertiserCampaignInput = {
  /** The end date of the campaign */
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** The ID of the advertiser campaign to update */
  id: Scalars["String"]["input"];
  /** The advertiser campaign metadata in different languages */
  metadatas?: InputMaybe<Array<UpdateAdvertiserCampaignMetadataInput>>;
  /** URL-friendly identifier for the campaign */
  slug?: InputMaybe<Scalars["String"]["input"]>;
  /** The start date of the campaign */
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** The status of the advertiser campaign */
  statusId?: InputMaybe<AdvertiserCampaignStatusEnum>;
  /** The URL of the advertiser campaign */
  url?: InputMaybe<Scalars["String"]["input"]>;
  /** The voucher codes for the campaign */
  voucherCodes?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type UpdateAdvertiserCampaignMetadataInput = {
  /** The ID of the banner image for the advertiser campaign */
  bannerId?: InputMaybe<Scalars["String"]["input"]>;
  /** The description of the advertiser campaign */
  description: Scalars["String"]["input"];
  /** The language of the advertiser campaign metadata */
  languageId: LanguageEnum;
  /** The name of the advertiser campaign */
  name: Scalars["String"]["input"];
};

export type UpdateAdvertiserInput = {
  statusId?: InputMaybe<AdvertiserStatusEnum>;
};

export type UpdateCarouselInput = {
  ctaPayloadAdvertiserId?: InputMaybe<Scalars["String"]["input"]>;
  ctaPayloadLink?: InputMaybe<Scalars["String"]["input"]>;
  ctaType?: InputMaybe<CarouselCtaEnum>;
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  metadatas?: InputMaybe<Array<CreateCarouselMetadataInput>>;
  sortOrder?: InputMaybe<Scalars["Int"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  status?: InputMaybe<CarouselStatusEnum>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdatePostInput = {
  /** The main content of the post */
  content?: InputMaybe<Scalars["String"]["input"]>;
  /** A short summary or description of the post */
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** Version of the editor used */
  editorVersion?: InputMaybe<Scalars["Int"]["input"]>;
  /** ID of the featured image associated with the post */
  featuredImageId?: InputMaybe<Scalars["ID"]["input"]>;
  /** The date the post was published or scheduled */
  postDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** The type of the post (e.g., blog, article) */
  postTypeId?: InputMaybe<PostTypeEnum>;
  /** URL-friendly identifier for the post */
  slug?: InputMaybe<Scalars["String"]["input"]>;
  /** The status of the post (e.g., draft, published) */
  statusId?: InputMaybe<PostStatusEnum>;
  /** List of tags associated with the post */
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** The title of the post */
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UploadMediaInput = {
  /** Caption for the media */
  caption?: InputMaybe<Scalars["String"]["input"]>;
  /** Base64 encoded file content */
  fileBase64: Scalars["String"]["input"];
  /** Original filename */
  filename: Scalars["String"]["input"];
  /** Mime type of the file */
  mimeType: Scalars["String"]["input"];
};

export type CreatePostMutationVariables = Exact<{
  data: CreatePostInput;
}>;

export type CreatePostMutation = {
  __typename?: "Mutation";
  createPost: { __typename?: "Post"; id: string };
};

export type GetInitialDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetInitialDataQuery = {
  __typename?: "Query";
  site: {
    __typename?: "Site";
    id: string;
    name: string;
    logo?: { __typename?: "Media"; id: string; url: string } | null;
  };
};

export type UpdatePostMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  data: UpdatePostInput;
}>;

export type UpdatePostMutation = {
  __typename?: "Mutation";
  updatePost: { __typename?: "Post"; id: string };
};

export type UploadMediaMutationVariables = Exact<{
  data: UploadMediaInput;
}>;

export type UploadMediaMutation = {
  __typename?: "Mutation";
  uploadMedia: {
    __typename?: "Media";
    id: string;
    url: string;
    mimeType?: string | null;
    caption?: string | null;
  };
};

export const CreatePostDocument = gql`
  mutation CreatePost($data: CreatePostInput!) {
    createPost(data: $data) {
      id
    }
  }
`;
export const GetInitialDataDocument = gql`
  query GetInitialData {
    site {
      id
      name
      logo {
        id
        url
      }
    }
  }
`;
export const UpdatePostDocument = gql`
  mutation UpdatePost($id: String!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
      id
    }
  }
`;
export const UploadMediaDocument = gql`
  mutation UploadMedia($data: UploadMediaInput!) {
    uploadMedia(data: $data) {
      id
      url
      mimeType
      caption
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables
) => action();
const CreatePostDocumentString = print(CreatePostDocument);
const GetInitialDataDocumentString = print(GetInitialDataDocument);
const UpdatePostDocumentString = print(UpdatePostDocument);
const UploadMediaDocumentString = print(UploadMediaDocument);
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    CreatePost(
      variables: CreatePostMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<{
      data: CreatePostMutation;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreatePostMutation>(
            CreatePostDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "CreatePost",
        "mutation",
        variables
      );
    },
    GetInitialData(
      variables?: GetInitialDataQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<{
      data: GetInitialDataQuery;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetInitialDataQuery>(
            GetInitialDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetInitialData",
        "query",
        variables
      );
    },
    UpdatePost(
      variables: UpdatePostMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<{
      data: UpdatePostMutation;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UpdatePostMutation>(
            UpdatePostDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "UpdatePost",
        "mutation",
        variables
      );
    },
    UploadMedia(
      variables: UploadMediaMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<{
      data: UploadMediaMutation;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UploadMediaMutation>(
            UploadMediaDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "UploadMedia",
        "mutation",
        variables
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
