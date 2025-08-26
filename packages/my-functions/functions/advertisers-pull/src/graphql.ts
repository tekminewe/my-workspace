import { GraphQLClient, RequestOptions } from 'graphql-request';
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

/** Advertiser entity */
export type Advertiser = {
  __typename?: 'Advertiser';
  /** Primary commission information for the advertiser */
  commission?: Maybe<AdvertiserCommission>;
  /** List of all commissions for the advertiser */
  commissions?: Maybe<Array<AdvertiserCommission>>;
  /** Date when the advertiser was created */
  createdAt: Scalars['DateTime']['output'];
  /** Description of the advertiser */
  description: Scalars['String']['output'];
  /** Unique identifier for the advertiser */
  id: Scalars['String']['output'];
  logo: Media;
  /** ID of the advertiser logo media */
  logoId: Scalars['String']['output'];
  /** Name of the advertiser */
  name: Scalars['String']['output'];
  /** List of provider references for the advertiser */
  providerReferences?: Maybe<Array<AdvertiserProviderReference>>;
  /** List of affiliate providers for the advertiser */
  providers?: Maybe<Array<AffiliateProvider>>;
  /** URL-friendly slug for the advertiser */
  slug: Scalars['String']['output'];
  /** Status of the advertiser (Active/Inactive) */
  statusId: AdvertiserStatusEnum;
  /** Date when the advertiser was last updated */
  updatedAt: Scalars['DateTime']['output'];
};


/** Advertiser entity */
export type AdvertiserCommissionArgs = {
  rowStatusId?: InputMaybe<AdvertiserCommissionRowStatusEnum>;
  statusId?: InputMaybe<AdvertiserCommissionStatusEnum>;
};


/** Advertiser entity */
export type AdvertiserCommissionsArgs = {
  rowStatusId?: InputMaybe<AdvertiserCommissionRowStatusEnum>;
  statusId?: InputMaybe<AdvertiserCommissionStatusEnum>;
};

export type AdvertiserCampaign = {
  __typename?: 'AdvertiserCampaign';
  advertiser: Advertiser;
  advertiserId: Scalars['String']['output'];
  /** Banner from the current language metadata, or null if not found */
  banner?: Maybe<Media>;
  createdAt: Scalars['DateTime']['output'];
  /** Description from the current language metadata, or null if not found */
  description: Scalars['String']['output'];
  /** The end date of the campaign, which can be null for open-ended campaigns */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  metadatas: Array<AdvertiserCampaignMetadata>;
  name: Scalars['String']['output'];
  providerId: AffiliateProviderEnum;
  providerReferenceId: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  statusId: AdvertiserCampaignStatusEnum;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  voucherCodes: Array<Scalars['String']['output']>;
};

export type AdvertiserCampaignMetadata = {
  __typename?: 'AdvertiserCampaignMetadata';
  banner?: Maybe<Media>;
  description: Scalars['String']['output'];
  languageId: LanguageEnum;
  name: Scalars['String']['output'];
};

export type AdvertiserCampaignMetadataInput = {
  /** The ID of the banner image for the advertiser campaign */
  bannerId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the advertiser campaign */
  description: Scalars['String']['input'];
  /** The language of the advertiser campaign metadata */
  languageId: LanguageEnum;
  /** The name of the advertiser campaign */
  name: Scalars['String']['input'];
};

export type AdvertiserCampaignPagination = {
  __typename?: 'AdvertiserCampaignPagination';
  currentPage: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  pageSize: Scalars['Int']['output'];
  previousPage?: Maybe<Scalars['Int']['output']>;
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export enum AdvertiserCampaignStatusEnum {
  Active = 'Active',
  Inactive = 'Inactive'
}

/** Commission information for an advertiser */
export type AdvertiserCommission = {
  __typename?: 'AdvertiserCommission';
  /** Calculated commission value (maximum from calculated commission of rows) */
  calculatedCommission: Scalars['Float']['output'];
  /** Commission value (maximum from commission rows) */
  commission: Scalars['Float']['output'];
  /** Rows of commission details */
  commissionRows: Array<AdvertiserCommissionRow>;
  /** Number of days until the commission is paid out */
  dayToPayout: Scalars['Float']['output'];
  /** Number of days until the commission is validated */
  dayToValidate: Scalars['Float']['output'];
  /** Unique identifier for the commission */
  id: Scalars['String']['output'];
  /** ID of the affiliate provider for this commission */
  providerId: AffiliateProviderEnum;
  /** Status of the commission (Active or Inactive) */
  statusId: AdvertiserCommissionStatusEnum;
  /** URL for the commission */
  url: Scalars['String']['output'];
};

/** A commission row for an advertiser commission */
export type AdvertiserCommissionRow = {
  __typename?: 'AdvertiserCommissionRow';
  /** ID of the advertiser commission this row belongs to */
  advertiserCommissionId: Scalars['String']['output'];
  /** Calculated commission value after applying share */
  calculatedCommission: Scalars['Float']['output'];
  /** Commission value */
  commission: Scalars['Float']['output'];
  /** Unique identifier for the commission row */
  id: Scalars['String']['output'];
  /** Localized metadata for this commission row */
  metadatas?: Maybe<Array<AdvertiserCommissionRowMetadata>>;
  /** Name of the commission row */
  name: Scalars['String']['output'];
  /** Provider reference ID for this commission row */
  providerReferenceId: Scalars['String']['output'];
  /** Status of the commission row (Active or Inactive) */
  statusId: AdvertiserCommissionRowStatusEnum;
  /** Type of the commission (Percentage or Fixed) */
  typeId: AdvertiserCommissionTypeEnum;
};

/** Metadata for an advertiser commission row in different languages */
export type AdvertiserCommissionRowMetadata = {
  __typename?: 'AdvertiserCommissionRowMetadata';
  /** ID of the commission row this metadata belongs to */
  commissionRowId: Scalars['String']['output'];
  /** Language of this metadata */
  languageId: LanguageEnum;
  /** Name of the commission row in the specified language */
  name: Scalars['String']['output'];
};

export enum AdvertiserCommissionRowStatusEnum {
  Active = 'Active',
  Inactive = 'Inactive'
}

/** Type of commission share (Percentage or Fixed) */
export enum AdvertiserCommissionShareTypeEnum {
  Fixed = 'Fixed',
  Percentage = 'Percentage'
}

export enum AdvertiserCommissionStatusEnum {
  Active = 'Active',
  Inactive = 'Inactive'
}

export enum AdvertiserCommissionTypeEnum {
  Fixed = 'Fixed',
  Percentage = 'Percentage'
}

export type AdvertiserMetadataInput = {
  /** The description of the advertiser */
  description: Scalars['String']['input'];
  /** The language of the advertiser metadata */
  languageId: LanguageEnum;
  /** The name of the advertiser */
  name: Scalars['String']['input'];
};

/** Advertiser provider reference entity */
export type AdvertiserProviderReference = {
  __typename?: 'AdvertiserProviderReference';
  /** The advertiser */
  advertiser?: Maybe<Advertiser>;
  /** The advertiser ID */
  advertiserId: Scalars['String']['output'];
  /** The affiliate provider */
  provider?: Maybe<AffiliateProvider>;
  /** The affiliate provider ID */
  providerId: AffiliateProviderEnum;
  /** The reference ID of the advertiser in the provider system */
  providerReferenceId: Scalars['String']['output'];
};

export type AdvertiserProviderReferenceInput = {
  /** The affiliate provider ID */
  providerId: AffiliateProviderEnum;
  /** The reference ID of the advertiser in the provider system */
  providerReferenceId: Scalars['String']['input'];
};

export enum AdvertiserStatusEnum {
  Active = 'Active',
  Inactive = 'Inactive'
}

export type AdvertisersPagination = {
  __typename?: 'AdvertisersPagination';
  currentPage: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  pageSize: Scalars['Int']['output'];
  previousPage?: Maybe<Scalars['Int']['output']>;
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

/** Affiliate provider entity */
export type AffiliateProvider = {
  __typename?: 'AffiliateProvider';
  /** Date when the affiliate provider was created */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier for the affiliate provider */
  id: AffiliateProviderEnum;
  /** Name of the affiliate provider */
  name: Scalars['String']['output'];
  /** Status of the affiliate provider (Active/Inactive) */
  statusId: AffiliateProviderStatusEnum;
  /** Date when the affiliate provider was last updated */
  updatedAt: Scalars['DateTime']['output'];
};

export enum AffiliateProviderEnum {
  InvolveAsia = 'InvolveAsia'
}

export enum AffiliateProviderStatusEnum {
  Active = 'Active',
  Inactive = 'Inactive'
}

export type Carousel = {
  __typename?: 'Carousel';
  cta: CarouselCta;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  image: Media;
  metadatas: Array<CarouselMetada>;
  sortOrder: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  status: CarouselStatusEnum;
  title: Scalars['String']['output'];
};

export type CarouselCta = CarouselCtaCashback | CarouselCtaLink;

export type CarouselCtaCashback = {
  __typename?: 'CarouselCtaCashback';
  payload: CarouselCtaCashbackPayload;
  type: CarouselCtaEnum;
};

export type CarouselCtaCashbackPayload = {
  __typename?: 'CarouselCtaCashbackPayload';
  advertiserCashbackRate: Scalars['Float']['output'];
  advertiserId: Scalars['String']['output'];
  advertiserLogoUrl: Scalars['String']['output'];
  advertiserName: Scalars['String']['output'];
  advertiserRedirectUrl: Scalars['String']['output'];
  advertiserSlug: Scalars['String']['output'];
};

export enum CarouselCtaEnum {
  Cashback = 'Cashback',
  Link = 'Link'
}

export type CarouselCtaLink = {
  __typename?: 'CarouselCtaLink';
  payload: CarouselCtaLinkPayload;
  type: CarouselCtaEnum;
};

export type CarouselCtaLinkPayload = {
  __typename?: 'CarouselCtaLinkPayload';
  link: Scalars['String']['output'];
};

export type CarouselMetada = {
  __typename?: 'CarouselMetada';
  id: Scalars['String']['output'];
  image: Media;
  languageId: LanguageEnum;
};

export enum CarouselStatusEnum {
  Active = 'Active',
  Inactive = 'Inactive'
}

export type CarouselsPagination = {
  __typename?: 'CarouselsPagination';
  currentPage: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  pageSize: Scalars['Int']['output'];
  previousPage?: Maybe<Scalars['Int']['output']>;
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type CreateAdvertiserCampaignInput = {
  /** The ID of the advertiser for this campaign */
  advertiserId: Scalars['String']['input'];
  /** The end date of the campaign */
  endDate: Scalars['DateTime']['input'];
  /** The advertiser campaign metadata in different languages */
  metadatas: Array<AdvertiserCampaignMetadataInput>;
  /** The ID of the affiliate provider */
  providerId: AffiliateProviderEnum;
  /** The reference ID of the campaign in the provider system */
  providerReferenceId: Scalars['String']['input'];
  /** URL-friendly identifier for the campaign */
  slug: Scalars['String']['input'];
  /** The start date of the campaign */
  startDate: Scalars['DateTime']['input'];
  /** The status of the advertiser campaign */
  statusId?: InputMaybe<AdvertiserCampaignStatusEnum>;
  /** The URL of the advertiser campaign */
  url: Scalars['String']['input'];
  /** The voucher codes for the campaign */
  voucherCodes: Array<Scalars['String']['input']>;
};

export type CreateAdvertiserCommissionInput = {
  /** Advertiser ID that this commission belongs to */
  advertiserId: Scalars['String']['input'];
  /** Commission rows for this commission */
  commissionRows?: InputMaybe<Array<CreateCommissionRowInput>>;
  /** Commission share percentage */
  commissionShare: Scalars['Float']['input'];
  /** Commission share type */
  commissionShareTypeId: AdvertiserCommissionShareTypeEnum;
  /** Number of days to payout the commission */
  dayToPayout: Scalars['Float']['input'];
  /** Number of days to validate the commission */
  dayToValidate: Scalars['Float']['input'];
  /** Affiliate provider ID */
  providerId: AffiliateProviderEnum;
  /** Provider reference ID */
  providerReferenceId: Scalars['String']['input'];
  /** Status of the commission */
  statusId: AdvertiserCommissionStatusEnum;
  /** Affiliate URL */
  url: Scalars['String']['input'];
};

export type CreateAdvertiserInput = {
  /** The commissions for the advertiser */
  commissions?: InputMaybe<Array<CreateAdvertiserCommissionInput>>;
  /** The ID of the logo media */
  logoId: Scalars['String']['input'];
  /** The advertiser metadata in different languages */
  metadatas: Array<AdvertiserMetadataInput>;
  /** The provider references for the advertiser */
  providerReferences?: InputMaybe<Array<AdvertiserProviderReferenceInput>>;
  /** The unique slug for the advertiser */
  slug: Scalars['String']['input'];
  /** The status of the advertiser */
  statusId?: InputMaybe<AdvertiserStatusEnum>;
};

export type CreateCarouselInput = {
  ctaPayloadAdvertiserId?: InputMaybe<Scalars['String']['input']>;
  ctaPayloadLink?: InputMaybe<Scalars['String']['input']>;
  ctaType: CarouselCtaEnum;
  endDate: Scalars['DateTime']['input'];
  metadatas: Array<CreateCarouselMetadataInput>;
  sortOrder: Scalars['Int']['input'];
  startDate: Scalars['DateTime']['input'];
  status: CarouselStatusEnum;
  title: Scalars['String']['input'];
};

export type CreateCarouselMetadataInput = {
  imageId: Scalars['String']['input'];
  languageId: LanguageEnum;
};

export type CreateCommissionRowInput = {
  /** Commission value */
  commission: Scalars['Float']['input'];
  /** Metadata translations for the commission row */
  metadatas?: InputMaybe<Array<CreateCommissionRowMetadataInput>>;
  /** Provider reference ID for this commission row */
  providerReferenceId: Scalars['String']['input'];
  /** Status of the commission row (Active or Inactive) */
  statusId?: AdvertiserCommissionRowStatusEnum;
  /** Type of the commission (Percentage or Fixed) */
  typeId: AdvertiserCommissionTypeEnum;
};

export type CreateCommissionRowMetadataInput = {
  /** Language ID of the metadata */
  languageId: LanguageEnum;
  /** Name of the commission row in the specified language */
  name: Scalars['String']['input'];
};

export type CreatePostInput = {
  /** The main content of the post */
  content?: InputMaybe<Scalars['String']['input']>;
  /** A short summary or description of the post */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Version of the editor used */
  editorVersion?: InputMaybe<Scalars['Int']['input']>;
  /** ID of the featured image associated with the post */
  featuredImageId?: InputMaybe<Scalars['ID']['input']>;
  /** The date the post was published or scheduled */
  postDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** The type of the post (e.g., blog, article) */
  postTypeId?: InputMaybe<PostTypeEnum>;
  /** URL-friendly identifier for the post */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the post (e.g., draft, published) */
  statusId?: InputMaybe<PostStatusEnum>;
  /** List of tags associated with the post */
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The title of the post */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FetchAdvertiserInput = {
  /** The name of the advertiser to fetch from the provider API */
  name: Scalars['String']['input'];
};

export type FetchAdvertiserOutput = {
  __typename?: 'FetchAdvertiserOutput';
  /** The name of the advertiser that was fetched */
  advertiserName?: Maybe<Scalars['String']['output']>;
  /** Any message returned from the operation */
  message?: Maybe<Scalars['String']['output']>;
  /** The generated slug for the advertiser */
  slug?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the operation was successful */
  success: Scalars['Boolean']['output'];
};

export type Language = {
  __typename?: 'Language';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: LanguageEnum;
  isDefault: Scalars['Boolean']['output'];
  isSupported: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum LanguageEnum {
  EnGb = 'EN_GB',
  EnMy = 'EN_MY',
  EnUs = 'EN_US',
  ZhCn = 'ZH_CN',
  ZhMy = 'ZH_MY'
}

export type Media = {
  __typename?: 'Media';
  /** Optional caption for the media */
  caption?: Maybe<Scalars['String']['output']>;
  /** When the media was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Unique identifier for the media */
  id: Scalars['String']['output'];
  /** File mime type */
  mimeType?: Maybe<Scalars['String']['output']>;
  /** Publicly accessible URL to the media */
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new advertiser with provider references */
  createAdvertiser: Advertiser;
  /** Create a new advertiser campaign */
  createAdvertiserCampaign: AdvertiserCampaign;
  createCarousel: Carousel;
  createPost: Post;
  /** Fetch an advertiser from the provider API by name and trigger AWS Lambda function */
  fetchAdvertiser: FetchAdvertiserOutput;
  /** Refreshes the advertiser search index. If no advertiserId is provided, all active advertisers will be re-indexed. */
  refreshAdvertiserSearchIndex: RefreshAdvertiserSearchIndexOutput;
  updateAdvertiser: Advertiser;
  /** Update an existing advertiser campaign */
  updateAdvertiserCampaign: AdvertiserCampaign;
  /** Update an advertiser commission, including its commission rows */
  updateAdvertiserCommission?: Maybe<AdvertiserCommission>;
  /** Update an advertiser provider reference */
  updateAdvertiserProviderReference: AdvertiserProviderReference;
  updateCarousel: Carousel;
  updatePost: Post;
  /** Update the site information and metadata */
  updateSite: Site;
  uploadMedia: Media;
};


export type MutationCreateAdvertiserArgs = {
  data: CreateAdvertiserInput;
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


export type MutationFetchAdvertiserArgs = {
  data: FetchAdvertiserInput;
};


export type MutationRefreshAdvertiserSearchIndexArgs = {
  data: RefreshAdvertiserSearchIndexInput;
};


export type MutationUpdateAdvertiserArgs = {
  data: UpdateAdvertiserInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateAdvertiserCampaignArgs = {
  data: UpdateAdvertiserCampaignInput;
};


export type MutationUpdateAdvertiserCommissionArgs = {
  data: UpdateAdvertiserCommissionInput;
};


export type MutationUpdateAdvertiserProviderReferenceArgs = {
  input: UpdateAdvertiserProviderReferenceInput;
};


export type MutationUpdateCarouselArgs = {
  data: UpdateCarouselInput;
  id: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateSiteArgs = {
  input: UpdateSiteInput;
};


export type MutationUploadMediaArgs = {
  data: UploadMediaInput;
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  editorVersion: Scalars['Int']['output'];
  featuredImage?: Maybe<Media>;
  featuredImageId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  ogDescription?: Maybe<Scalars['String']['output']>;
  ogImage?: Maybe<Media>;
  ogImageId?: Maybe<Scalars['String']['output']>;
  ogTitle?: Maybe<Scalars['String']['output']>;
  postDate: Scalars['DateTime']['output'];
  slug: Scalars['String']['output'];
  status: PostStatus;
  statusId?: Maybe<PostStatusEnum>;
  tags?: Maybe<Array<PostTag>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PostStatus = {
  __typename?: 'PostStatus';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export enum PostStatusEnum {
  Draft = 'Draft',
  Published = 'Published'
}

export type PostTag = {
  __typename?: 'PostTag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export enum PostTypeEnum {
  Blog = 'Blog',
  Page = 'Page'
}

export type PostsPagination = {
  __typename?: 'PostsPagination';
  currentPage: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  pageSize: Scalars['Int']['output'];
  previousPage?: Maybe<Scalars['Int']['output']>;
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
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
  advertiserId?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAdvertiserCampaignArgs = {
  id: Scalars['String']['input'];
};


export type QueryAdvertiserCampaignByProviderArgs = {
  providerId: AffiliateProviderEnum;
  providerReferenceId: Scalars['String']['input'];
};


export type QueryAdvertiserCampaignsArgs = {
  advertiserId?: InputMaybe<Scalars['String']['input']>;
  advertiserSlug?: InputMaybe<Scalars['String']['input']>;
  endDateGt?: InputMaybe<Scalars['DateTime']['input']>;
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  providerId?: InputMaybe<AffiliateProviderEnum>;
  providerReferenceId?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<SortByField>;
  sortDirection?: InputMaybe<SortDirection>;
  startDateLte?: InputMaybe<Scalars['DateTime']['input']>;
  statusId?: InputMaybe<AdvertiserCampaignStatusEnum>;
};


export type QueryAdvertiserCampaignsPaginationArgs = {
  advertiserId?: InputMaybe<Scalars['String']['input']>;
  advertiserSlug?: InputMaybe<Scalars['String']['input']>;
  endDateGt?: InputMaybe<Scalars['DateTime']['input']>;
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  providerId?: InputMaybe<AffiliateProviderEnum>;
  providerReferenceId?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<SortByField>;
  sortDirection?: InputMaybe<SortDirection>;
  startDateLte?: InputMaybe<Scalars['DateTime']['input']>;
  statusId?: InputMaybe<AdvertiserCampaignStatusEnum>;
};


export type QueryAdvertiserProviderReferencesArgs = {
  advertiserId?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  providerId?: InputMaybe<AffiliateProviderEnum>;
};


export type QueryAdvertisersArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  statusId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAdvertisersPaginationArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  statusId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCarouselArgs = {
  id: Scalars['String']['input'];
};


export type QueryCarouselsArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCarouselsPaginationArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLanguagesArgs = {
  isSupported?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryMediaArgs = {
  id: Scalars['String']['input'];
};


export type QueryPostArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostsArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  statusId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostsPaginationArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  statusId?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchAdvertisersArgs = {
  query?: InputMaybe<Scalars['String']['input']>;
};

export type RefreshAdvertiserSearchIndexInput = {
  /** Optional specific advertiser ID to refresh. If not provided, all advertisers will be re-indexed. */
  advertiserId?: InputMaybe<Scalars['String']['input']>;
};

export type RefreshAdvertiserSearchIndexOutput = {
  __typename?: 'RefreshAdvertiserSearchIndexOutput';
  /** Indicates whether the operation was successful */
  success: Scalars['Boolean']['output'];
};

/** Search result for advertisers */
export type SearchResultAdvertiser = {
  __typename?: 'SearchResultAdvertiser';
  /** Calculated commission value after applying share */
  calculatedCommission: Scalars['Float']['output'];
  /** Categories the advertiser belongs to */
  categories: Array<Scalars['String']['output']>;
  /** Commission value for the advertiser */
  commission: Scalars['Float']['output'];
  /** Unique identifier for the advertiser */
  id: Scalars['String']['output'];
  /** URL for the advertiser logo */
  logo: Scalars['String']['output'];
  /** Name of the advertiser */
  name: Scalars['String']['output'];
  /** URL-friendly slug for the advertiser */
  slug: Scalars['String']['output'];
};

/** Site information */
export type Site = {
  __typename?: 'Site';
  /** The creation date of the site */
  createdAt: Scalars['DateTime']['output'];
  /** The description of the site */
  description?: Maybe<Scalars['String']['output']>;
  /** The domain of the site */
  domain?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the site */
  id: Scalars['String']['output'];
  /** The logo of the site */
  logo?: Maybe<Media>;
  /** The metadata for different languages */
  metadatas: Array<SiteMetadata>;
  /** The name of the site */
  name: Scalars['String']['output'];
  /** The last update date of the site */
  updatedAt: Scalars['DateTime']['output'];
};

/** Site metadata for a specific language */
export type SiteMetadata = {
  __typename?: 'SiteMetadata';
  /** The description of the site in the specific language */
  description?: Maybe<Scalars['String']['output']>;
  /** The language identifier for this metadata */
  languageId: LanguageEnum;
  /** The logo of the site for the specific language */
  logo?: Maybe<Media>;
  /** The name of the site in the specific language */
  name: Scalars['String']['output'];
};

/** Fields to sort advertiser campaigns by */
export enum SortByField {
  CreatedAt = 'CreatedAt',
  StartDate = 'StartDate'
}

/** Direction to sort advertiser campaigns */
export enum SortDirection {
  Asc = 'Asc',
  Desc = 'Desc'
}

export type UpdateAdvertiserCampaignInput = {
  /** The end date of the campaign */
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** The ID of the advertiser campaign to update */
  id: Scalars['String']['input'];
  /** The advertiser campaign metadata in different languages */
  metadatas?: InputMaybe<Array<UpdateAdvertiserCampaignMetadataInput>>;
  /** URL-friendly identifier for the campaign */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The start date of the campaign */
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** The status of the advertiser campaign */
  statusId?: InputMaybe<AdvertiserCampaignStatusEnum>;
  /** The URL of the advertiser campaign */
  url?: InputMaybe<Scalars['String']['input']>;
  /** The voucher codes for the campaign */
  voucherCodes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateAdvertiserCampaignMetadataInput = {
  /** The ID of the banner image for the advertiser campaign */
  bannerId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the advertiser campaign */
  description: Scalars['String']['input'];
  /** The language of the advertiser campaign metadata */
  languageId: LanguageEnum;
  /** The name of the advertiser campaign */
  name: Scalars['String']['input'];
};

export type UpdateAdvertiserCommissionIdentifierInput = {
  /** Advertiser ID to identify the commission when ID is not provided */
  advertiserId?: InputMaybe<Scalars['String']['input']>;
  /** ID of the advertiser commission to update */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Provider ID to identify the commission when ID is not provided */
  providerId?: InputMaybe<AffiliateProviderEnum>;
  /** Provider reference ID to identify the commission when ID is not provided */
  providerReferenceId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAdvertiserCommissionInput = {
  /** Advertiser ID that this commission belongs to */
  advertiserId?: InputMaybe<Scalars['String']['input']>;
  /** Commission rows that will completely replace all existing rows */
  commissionRows?: InputMaybe<Array<CreateCommissionRowInput>>;
  /** Commission share percentage */
  commissionShare?: InputMaybe<Scalars['Float']['input']>;
  /** Commission share type */
  commissionShareTypeId?: InputMaybe<AdvertiserCommissionShareTypeEnum>;
  /** Number of days to payout the commission */
  dayToPayout?: InputMaybe<Scalars['Float']['input']>;
  /** Number of days to validate the commission */
  dayToValidate?: InputMaybe<Scalars['Float']['input']>;
  /** Identifier for the advertiser commission to update */
  identifier: UpdateAdvertiserCommissionIdentifierInput;
  /** Affiliate provider ID */
  providerId?: InputMaybe<AffiliateProviderEnum>;
  /** Provider reference ID */
  providerReferenceId?: InputMaybe<Scalars['String']['input']>;
  /** Status of the commission */
  statusId?: InputMaybe<AdvertiserCommissionStatusEnum>;
  /** Affiliate URL */
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAdvertiserInput = {
  statusId?: InputMaybe<AdvertiserStatusEnum>;
};

export type UpdateAdvertiserProviderReferenceInput = {
  /** The advertiser ID */
  advertiserId: Scalars['String']['input'];
  /** The affiliate provider ID */
  providerId: AffiliateProviderEnum;
  /** The reference ID of the advertiser in the provider system */
  providerReferenceId: Scalars['String']['input'];
};

export type UpdateCarouselInput = {
  ctaPayloadAdvertiserId?: InputMaybe<Scalars['String']['input']>;
  ctaPayloadLink?: InputMaybe<Scalars['String']['input']>;
  ctaType?: InputMaybe<CarouselCtaEnum>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  metadatas?: InputMaybe<Array<CreateCarouselMetadataInput>>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<CarouselStatusEnum>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostInput = {
  /** The main content of the post */
  content?: InputMaybe<Scalars['String']['input']>;
  /** A short summary or description of the post */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Version of the editor used */
  editorVersion?: InputMaybe<Scalars['Int']['input']>;
  /** ID of the featured image associated with the post */
  featuredImageId?: InputMaybe<Scalars['ID']['input']>;
  /** The date the post was published or scheduled */
  postDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** The type of the post (e.g., blog, article) */
  postTypeId?: InputMaybe<PostTypeEnum>;
  /** URL-friendly identifier for the post */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the post (e.g., draft, published) */
  statusId?: InputMaybe<PostStatusEnum>;
  /** List of tags associated with the post */
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The title of the post */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Input for updating site information */
export type UpdateSiteInput = {
  /** The domain of the site */
  domain?: InputMaybe<Scalars['String']['input']>;
  /** The metadata for different languages */
  metadatas?: InputMaybe<Array<UpdateSiteMetadataInput>>;
};

/** Site metadata update for a specific language */
export type UpdateSiteMetadataInput = {
  /** The description of the site in the specific language */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The language identifier for this metadata */
  languageId: LanguageEnum;
  /** The logo ID of the site for the specific language */
  logoId?: InputMaybe<Scalars['String']['input']>;
  /** The name of the site in the specific language */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UploadMediaInput = {
  /** Caption for the media */
  caption?: InputMaybe<Scalars['String']['input']>;
  /** Base64 encoded file content */
  fileBase64: Scalars['String']['input'];
  /** Original filename */
  filename: Scalars['String']['input'];
  /** Mime type of the file */
  mimeType: Scalars['String']['input'];
};

export type CreateAdvertiserMutationVariables = Exact<{
  data: CreateAdvertiserInput;
}>;


export type CreateAdvertiserMutation = { __typename?: 'Mutation', createAdvertiser: { __typename?: 'Advertiser', id: string, name: string, slug: string, statusId: AdvertiserStatusEnum, logoId: string, description: string, createdAt: any, updatedAt: any } };

export type CreateAdvertiserCampaignMutationVariables = Exact<{
  data: CreateAdvertiserCampaignInput;
}>;


export type CreateAdvertiserCampaignMutation = { __typename?: 'Mutation', createAdvertiserCampaign: { __typename?: 'AdvertiserCampaign', id: string, advertiser: { __typename?: 'Advertiser', id: string, name: string, description: string, logo: { __typename?: 'Media', url: string }, commission?: { __typename?: 'AdvertiserCommission', commission: number } | null } } };

export type GetAdvertiserQueryVariables = Exact<{
  advertiserId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAdvertiserQuery = { __typename?: 'Query', advertiser: { __typename?: 'Advertiser', id: string, name: string, description: string, statusId: AdvertiserStatusEnum, logo: { __typename?: 'Media', url: string }, commission?: { __typename?: 'AdvertiserCommission', id: string, commission: number, dayToValidate: number, dayToPayout: number, url: string } | null } };

export type GetAdvertiserCampaignQueryVariables = Exact<{
  providerId: AffiliateProviderEnum;
  providerReferenceId: Scalars['String']['input'];
}>;


export type GetAdvertiserCampaignQuery = { __typename?: 'Query', advertiserCampaignByProvider?: { __typename?: 'AdvertiserCampaign', id: string } | null };

export type GetAdvertiserProviderReferencesQueryVariables = Exact<{
  providerId?: InputMaybe<AffiliateProviderEnum>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetAdvertiserProviderReferencesQuery = { __typename?: 'Query', advertiserProviderReferences: Array<{ __typename?: 'AdvertiserProviderReference', advertiserId: string, providerId: AffiliateProviderEnum, providerReferenceId: string }> };

export type GetInitialDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInitialDataQuery = { __typename?: 'Query', site: { __typename?: 'Site', id: string, name: string, logo?: { __typename?: 'Media', id: string, url: string } | null }, languages: Array<{ __typename?: 'Language', id: LanguageEnum }>, advertiserProviderReferences: Array<{ __typename?: 'AdvertiserProviderReference', advertiserId: string, providerId: AffiliateProviderEnum, providerReferenceId: string }> };

export type GetSupportedLanguagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSupportedLanguagesQuery = { __typename?: 'Query', languages: Array<{ __typename?: 'Language', id: LanguageEnum, name: string, code: string, shortName: string, isSupported: boolean, isDefault: boolean }> };

export type UpdateAdvertiserMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdateAdvertiserInput;
}>;


export type UpdateAdvertiserMutation = { __typename?: 'Mutation', updateAdvertiser: { __typename?: 'Advertiser', id: string, name: string, statusId: AdvertiserStatusEnum, updatedAt: any } };

export type UpdateAdvertiserCommissionMutationVariables = Exact<{
  data: UpdateAdvertiserCommissionInput;
}>;


export type UpdateAdvertiserCommissionMutation = { __typename?: 'Mutation', updateAdvertiserCommission?: { __typename?: 'AdvertiserCommission', id: string, commission: number, dayToValidate: number, dayToPayout: number, url: string, commissionRows: Array<{ __typename?: 'AdvertiserCommissionRow', id: string, name: string, commission: number, typeId: AdvertiserCommissionTypeEnum }> } | null };

export type UploadMediaMutationVariables = Exact<{
  data: UploadMediaInput;
}>;


export type UploadMediaMutation = { __typename?: 'Mutation', uploadMedia: { __typename?: 'Media', id: string } };


export const CreateAdvertiserDocument = gql`
    mutation CreateAdvertiser($data: CreateAdvertiserInput!) {
  createAdvertiser(data: $data) {
    id
    name
    slug
    statusId
    logoId
    description
    createdAt
    updatedAt
  }
}
    `;
export const CreateAdvertiserCampaignDocument = gql`
    mutation CreateAdvertiserCampaign($data: CreateAdvertiserCampaignInput!) {
  createAdvertiserCampaign(data: $data) {
    id
    advertiser {
      id
      name
      description
      logo {
        url
      }
      commission {
        commission
      }
    }
  }
}
    `;
export const GetAdvertiserDocument = gql`
    query GetAdvertiser($advertiserId: String) {
  advertiser(advertiserId: $advertiserId) {
    id
    name
    description
    logo {
      url
    }
    statusId
    commission {
      id
      commission
      dayToValidate
      dayToPayout
      url
    }
  }
}
    `;
export const GetAdvertiserCampaignDocument = gql`
    query GetAdvertiserCampaign($providerId: AffiliateProviderEnum!, $providerReferenceId: String!) {
  advertiserCampaignByProvider(
    providerId: $providerId
    providerReferenceId: $providerReferenceId
  ) {
    id
  }
}
    `;
export const GetAdvertiserProviderReferencesDocument = gql`
    query GetAdvertiserProviderReferences($providerId: AffiliateProviderEnum, $isActive: Boolean) {
  advertiserProviderReferences(providerId: $providerId, isActive: $isActive) {
    advertiserId
    providerId
    providerReferenceId
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
  languages(isSupported: true) {
    id
  }
  advertiserProviderReferences {
    advertiserId
    providerId
    providerReferenceId
  }
}
    `;
export const GetSupportedLanguagesDocument = gql`
    query GetSupportedLanguages {
  languages(isSupported: true) {
    id
    name
    code
    shortName
    isSupported
    isDefault
  }
}
    `;
export const UpdateAdvertiserDocument = gql`
    mutation UpdateAdvertiser($id: String!, $data: UpdateAdvertiserInput!) {
  updateAdvertiser(id: $id, data: $data) {
    id
    name
    statusId
    updatedAt
  }
}
    `;
export const UpdateAdvertiserCommissionDocument = gql`
    mutation UpdateAdvertiserCommission($data: UpdateAdvertiserCommissionInput!) {
  updateAdvertiserCommission(data: $data) {
    id
    commission
    dayToValidate
    dayToPayout
    url
    commissionRows {
      id
      name
      commission
      typeId
    }
  }
}
    `;
export const UploadMediaDocument = gql`
    mutation UploadMedia($data: UploadMediaInput!) {
  uploadMedia(data: $data) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();
const CreateAdvertiserDocumentString = print(CreateAdvertiserDocument);
const CreateAdvertiserCampaignDocumentString = print(CreateAdvertiserCampaignDocument);
const GetAdvertiserDocumentString = print(GetAdvertiserDocument);
const GetAdvertiserCampaignDocumentString = print(GetAdvertiserCampaignDocument);
const GetAdvertiserProviderReferencesDocumentString = print(GetAdvertiserProviderReferencesDocument);
const GetInitialDataDocumentString = print(GetInitialDataDocument);
const GetSupportedLanguagesDocumentString = print(GetSupportedLanguagesDocument);
const UpdateAdvertiserDocumentString = print(UpdateAdvertiserDocument);
const UpdateAdvertiserCommissionDocumentString = print(UpdateAdvertiserCommissionDocument);
const UploadMediaDocumentString = print(UploadMediaDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateAdvertiser(variables: CreateAdvertiserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: CreateAdvertiserMutation; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<CreateAdvertiserMutation>(CreateAdvertiserDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateAdvertiser', 'mutation', variables);
    },
    CreateAdvertiserCampaign(variables: CreateAdvertiserCampaignMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: CreateAdvertiserCampaignMutation; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<CreateAdvertiserCampaignMutation>(CreateAdvertiserCampaignDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateAdvertiserCampaign', 'mutation', variables);
    },
    GetAdvertiser(variables?: GetAdvertiserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetAdvertiserQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetAdvertiserQuery>(GetAdvertiserDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAdvertiser', 'query', variables);
    },
    GetAdvertiserCampaign(variables: GetAdvertiserCampaignQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetAdvertiserCampaignQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetAdvertiserCampaignQuery>(GetAdvertiserCampaignDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAdvertiserCampaign', 'query', variables);
    },
    GetAdvertiserProviderReferences(variables?: GetAdvertiserProviderReferencesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetAdvertiserProviderReferencesQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetAdvertiserProviderReferencesQuery>(GetAdvertiserProviderReferencesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAdvertiserProviderReferences', 'query', variables);
    },
    GetInitialData(variables?: GetInitialDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetInitialDataQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetInitialDataQuery>(GetInitialDataDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetInitialData', 'query', variables);
    },
    GetSupportedLanguages(variables?: GetSupportedLanguagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetSupportedLanguagesQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetSupportedLanguagesQuery>(GetSupportedLanguagesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetSupportedLanguages', 'query', variables);
    },
    UpdateAdvertiser(variables: UpdateAdvertiserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: UpdateAdvertiserMutation; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<UpdateAdvertiserMutation>(UpdateAdvertiserDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateAdvertiser', 'mutation', variables);
    },
    UpdateAdvertiserCommission(variables: UpdateAdvertiserCommissionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: UpdateAdvertiserCommissionMutation; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<UpdateAdvertiserCommissionMutation>(UpdateAdvertiserCommissionDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateAdvertiserCommission', 'mutation', variables);
    },
    UploadMedia(variables: UploadMediaMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: UploadMediaMutation; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<UploadMediaMutation>(UploadMediaDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UploadMedia', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;