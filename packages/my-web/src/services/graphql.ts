/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

/** Advertiser entity */
export type Advertiser = {
  __typename?: 'Advertiser';
  /** Categories the advertiser belongs to */
  categories?: Maybe<Array<AdvertiserCategory>>;
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
  /** Logo media for the advertiser */
  logo: Media;
  /** ID of the advertiser logo media */
  logoId: Scalars['String']['output'];
  /** Metadata for the advertiser in different languages */
  metadatas?: Maybe<Array<AdvertiserMetadata>>;
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

/** Status of advertiser campaigns */
export enum AdvertiserCampaignStatusEnum {
  Active = 'Active',
  Inactive = 'Inactive'
}

/** Advertiser category entity */
export type AdvertiserCategory = {
  __typename?: 'AdvertiserCategory';
  /** Description of the category */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the category */
  id: AdvertiserCategoryEnum;
  /** Localized name of the category */
  name: Scalars['String']['output'];
};

export enum AdvertiserCategoryEnum {
  DigitalServices = 'DigitalServices',
  Electronics = 'Electronics',
  Fashion = 'Fashion',
  Finance = 'Finance',
  FoodGrocery = 'Food_Grocery',
  HealthBeauty = 'Health_Beauty',
  HomeLiving = 'Home_Living',
  Marketplace = 'Marketplace',
  Others = 'Others',
  Travel = 'Travel'
}

/** Advertiser category with active advertiser count */
export type AdvertiserCategoryWithCount = {
  __typename?: 'AdvertiserCategoryWithCount';
  /** Number of active advertisers in this category */
  count: Scalars['Int']['output'];
  /** Description of the category */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the category */
  id: AdvertiserCategoryEnum;
  /** Localized name of the category */
  name: Scalars['String']['output'];
};

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

/** Advertiser metadata in a specific language */
export type AdvertiserMetadata = {
  __typename?: 'AdvertiserMetadata';
  /** ID of the advertiser this metadata belongs to */
  advertiserId: Scalars['String']['output'];
  /** Description of the advertiser in this language */
  description: Scalars['String']['output'];
  /** Language of this metadata */
  languageId: LanguageEnum;
  /** Name of the advertiser in this language */
  name: Scalars['String']['output'];
};

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

export type BonusEligibility = {
  __typename?: 'BonusEligibility';
  availableAt: Scalars['DateTime']['output'];
  bonusType?: Maybe<BonusType>;
  bonusTypeId: Scalars['String']['output'];
  bonusVersion: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  eligibilityMetadata?: Maybe<Scalars['String']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  statusId: BonusEligibilityStatusEnum;
  updatedAt: Scalars['DateTime']['output'];
  usedAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['String']['output'];
};

/** Bonus eligibility status */
export enum BonusEligibilityStatusEnum {
  Available = 'Available',
  Expired = 'Expired',
  Ineligible = 'Ineligible',
  Used = 'Used'
}

export type BonusTransaction = {
  __typename?: 'BonusTransaction';
  amount: Scalars['Float']['output'];
  bonusEligibility?: Maybe<BonusEligibility>;
  bonusEligibilityId: Scalars['String']['output'];
  bonusTypeId: Scalars['String']['output'];
  bonusVersion: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  currencyId: CurrencyEnum;
  id: Scalars['String']['output'];
  merchantCallbackId?: Maybe<Scalars['String']['output']>;
  processedAt: Scalars['DateTime']['output'];
  processingMetadata?: Maybe<Scalars['String']['output']>;
  sourceTransactionId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
  walletTransactionId?: Maybe<Scalars['String']['output']>;
};

export type BonusTransactionConnection = {
  __typename?: 'BonusTransactionConnection';
  items: Array<BonusTransaction>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type BonusType = {
  __typename?: 'BonusType';
  codeId: BonusTypeCodeEnum;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  effectiveFrom: Scalars['DateTime']['output'];
  effectiveTo?: Maybe<Scalars['DateTime']['output']>;
  expiryDays?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  maxUsagePerUser: Scalars['Float']['output'];
  metadata?: Maybe<BonusTypeMetadata>;
  metadatas?: Maybe<Array<BonusTypeMetadata>>;
  priority: Scalars['Float']['output'];
  ruleConfig: Scalars['String']['output'];
  statusId: BonusTypeStatusEnum;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  version: Scalars['Float']['output'];
};

/** Bonus type codes */
export enum BonusTypeCodeEnum {
  FirstCashbackMultiplier = 'FirstCashbackMultiplier',
  ReferralBonus = 'ReferralBonus',
  SeasonalBonus = 'SeasonalBonus',
  SpendingThreshold = 'SpendingThreshold'
}

export type BonusTypeMetadata = {
  __typename?: 'BonusTypeMetadata';
  bonusTypeId: Scalars['String']['output'];
  description: Scalars['String']['output'];
  featuredImage?: Maybe<Media>;
  featuredImageId?: Maybe<Scalars['String']['output']>;
  languageId: LanguageEnum;
  logo?: Maybe<Media>;
  logoId?: Maybe<Scalars['String']['output']>;
  termsAndConditions: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

/** Bonus type metadata for a specific language */
export type BonusTypeMetadataInput = {
  /** The description of the bonus type in the specific language */
  description: Scalars['String']['input'];
  /** The featured image ID for the specific language */
  featuredImageId?: InputMaybe<Scalars['String']['input']>;
  /** The language identifier for this metadata */
  languageId: LanguageEnum;
  /** The logo ID for the specific language */
  logoId?: InputMaybe<Scalars['String']['input']>;
  /** The terms and conditions in the specific language */
  termsAndConditions: Scalars['String']['input'];
  /** The title of the bonus type in the specific language */
  title: Scalars['String']['input'];
};

/** Bonus type status */
export enum BonusTypeStatusEnum {
  Active = 'Active',
  Archived = 'Archived',
  Draft = 'Draft'
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

export type CreateBonusTypeInput = {
  codeId: BonusTypeCodeEnum;
  effectiveFrom?: InputMaybe<Scalars['DateTime']['input']>;
  effectiveTo?: InputMaybe<Scalars['DateTime']['input']>;
  expiryDays?: InputMaybe<Scalars['Float']['input']>;
  maxUsagePerUser?: InputMaybe<Scalars['Float']['input']>;
  /** The metadata for different languages */
  metadatas?: InputMaybe<Array<BonusTypeMetadataInput>>;
  priority?: InputMaybe<Scalars['Float']['input']>;
  ruleConfig: Scalars['String']['input'];
  statusId?: BonusTypeStatusEnum;
  version?: InputMaybe<Scalars['Float']['input']>;
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

/** Currency types */
export enum CurrencyEnum {
  Myr = 'MYR',
  Sgd = 'SGD',
  Usd = 'USD'
}

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

export type ImageGenerationInput = {
  enableSafetyChecker?: InputMaybe<Scalars['Boolean']['input']>;
  guidanceScale?: InputMaybe<Scalars['Float']['input']>;
  imageSize?: InputMaybe<Scalars['String']['input']>;
  numImages?: InputMaybe<Scalars['Int']['input']>;
  numInferenceSteps?: InputMaybe<Scalars['Int']['input']>;
  outputFormat?: InputMaybe<Scalars['String']['input']>;
  prompt: Scalars['String']['input'];
  provider?: InputMaybe<ImageProviderType>;
  quality?: InputMaybe<Scalars['String']['input']>;
  referenceImages?: InputMaybe<Array<Scalars['String']['input']>>;
  seed?: InputMaybe<Scalars['Int']['input']>;
  style?: InputMaybe<Scalars['String']['input']>;
  systemPrompt?: InputMaybe<Scalars['String']['input']>;
};

export type ImageGenerationMetadata = {
  __typename?: 'ImageGenerationMetadata';
  estimatedCost?: Maybe<Scalars['Float']['output']>;
  generationTimeMs?: Maybe<Scalars['Int']['output']>;
  hasNsfwConcepts?: Maybe<Array<Scalars['Boolean']['output']>>;
  inputTokens?: Maybe<Scalars['Int']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  outputTokens?: Maybe<Scalars['Int']['output']>;
  requestId?: Maybe<Scalars['String']['output']>;
  seed?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
  timings?: Maybe<Scalars['String']['output']>;
};

export type ImageGenerationResponse = {
  __typename?: 'ImageGenerationResponse';
  error?: Maybe<Scalars['String']['output']>;
  imageBase64?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<ImageGenerationMetadata>;
  prompt: Scalars['String']['output'];
  provider: ImageProviderType;
  referenceImages?: Maybe<Array<Scalars['String']['output']>>;
  success: Scalars['Boolean']['output'];
};

/** Available image generation providers */
export enum ImageProviderType {
  FalAi = 'FAL_AI',
  Openai = 'OPENAI'
}

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
  createBonusType: BonusType;
  createCarousel: Carousel;
  createPost: Post;
  deleteBonusType: Scalars['Boolean']['output'];
  /** Fetch an advertiser from the provider API by name and trigger AWS Lambda function */
  fetchAdvertiser: FetchAdvertiserOutput;
  generateImage: ImageGenerationResponse;
  /** Refreshes the advertiser search index. If no advertiserId is provided, all active advertisers will be re-indexed. */
  refreshAdvertiserSearchIndex: RefreshAdvertiserSearchIndexOutput;
  updateAdvertiser: Advertiser;
  /** Update an existing advertiser campaign */
  updateAdvertiserCampaign: AdvertiserCampaign;
  /** Update an advertiser commission, including its commission rows */
  updateAdvertiserCommission?: Maybe<AdvertiserCommission>;
  /** Update an advertiser provider reference */
  updateAdvertiserProviderReference: AdvertiserProviderReference;
  updateBonusType: BonusType;
  updateCarousel: Carousel;
  updatePost: Post;
  /** Update the site information and metadata */
  updateSite: Site;
  /** Update the site settings including logos for light and dark modes */
  updateSiteSettings: SiteSettings;
  uploadMedia: Media;
};


export type MutationCreateAdvertiserArgs = {
  data: CreateAdvertiserInput;
};


export type MutationCreateAdvertiserCampaignArgs = {
  data: CreateAdvertiserCampaignInput;
};


export type MutationCreateBonusTypeArgs = {
  input: CreateBonusTypeInput;
};


export type MutationCreateCarouselArgs = {
  data: CreateCarouselInput;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationDeleteBonusTypeArgs = {
  id: Scalars['String']['input'];
};


export type MutationFetchAdvertiserArgs = {
  data: FetchAdvertiserInput;
};


export type MutationGenerateImageArgs = {
  input: ImageGenerationInput;
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


export type MutationUpdateBonusTypeArgs = {
  id: Scalars['String']['input'];
  input: UpdateBonusTypeInput;
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


export type MutationUpdateSiteSettingsArgs = {
  input: UpdateSiteSettingsInput;
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

export type ProviderInfoResponse = {
  __typename?: 'ProviderInfoResponse';
  configured: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  supportedFormats: Array<Scalars['String']['output']>;
  supportedSizes: Array<Scalars['String']['output']>;
  type: ImageProviderType;
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
  /** Get all available advertiser categories */
  advertiserCategories: Array<AdvertiserCategory>;
  /** Get all advertiser categories with active advertiser counts */
  advertiserCategoriesWithCounts: Array<AdvertiserCategoryWithCount>;
  advertiserProviderReferences: Array<AdvertiserProviderReference>;
  advertisers: Array<Advertiser>;
  advertisersPagination: AdvertisersPagination;
  bonusType?: Maybe<BonusType>;
  bonusTypes: Array<BonusType>;
  carousel: Carousel;
  carousels: Array<Carousel>;
  carouselsPagination: CarouselsPagination;
  getDefaultImageProvider?: Maybe<ImageProviderType>;
  getImageProviders: Array<ProviderInfoResponse>;
  /** Get all languages with optional filtering by support status */
  languages: Array<Language>;
  media: Media;
  myBonusTransactions: Array<BonusTransaction>;
  myBonusTransactionsPaginated: BonusTransactionConnection;
  myBonuses: Array<BonusEligibility>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  postsPagination: PostsPagination;
  searchAdvertisers: Array<SearchResultAdvertiser>;
  /** Get the site information */
  site: Site;
  /** Get the site settings */
  siteSettings?: Maybe<SiteSettings>;
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
  categoryIds?: InputMaybe<Array<AdvertiserCategoryEnum>>;
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  sortBy?: InputMaybe<SortByField>;
  sortDirection?: InputMaybe<SortDirection>;
  statusId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAdvertisersPaginationArgs = {
  categoryIds?: InputMaybe<Array<AdvertiserCategoryEnum>>;
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  sortBy?: InputMaybe<SortByField>;
  sortDirection?: InputMaybe<SortDirection>;
  statusId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBonusTypeArgs = {
  id: Scalars['String']['input'];
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


export type QueryMyBonusTransactionsPaginatedArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
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
  /** The dark theme logo of the site for the specific language */
  darkLogo?: Maybe<Media>;
  /** The description of the site in the specific language */
  description?: Maybe<Scalars['String']['output']>;
  /** The language identifier for this metadata */
  languageId: LanguageEnum;
  /** The logo of the site for the specific language */
  logo?: Maybe<Media>;
  /** The name of the site in the specific language */
  name: Scalars['String']['output'];
};

/** Site settings for theme-specific and general configurations */
export type SiteSettings = {
  __typename?: 'SiteSettings';
  /** Physical address */
  address?: Maybe<Scalars['String']['output']>;
  /** Whether user registration is allowed */
  allowUserRegistration: Scalars['Boolean']['output'];
  /** Contact email address */
  contactEmail?: Maybe<Scalars['String']['output']>;
  /** The creation date of the site settings */
  createdAt: Scalars['DateTime']['output'];
  /** Default meta description for pages */
  defaultMetaDescription?: Maybe<Scalars['String']['output']>;
  /** Default meta title for pages */
  defaultMetaTitle?: Maybe<Scalars['String']['output']>;
  /** Whether comments are enabled */
  enableComments: Scalars['Boolean']['output'];
  /** Whether newsletter signup is enabled */
  enableNewsletter: Scalars['Boolean']['output'];
  /** Facebook Pixel ID */
  facebookPixelId?: Maybe<Scalars['String']['output']>;
  /** Facebook page URL */
  facebookUrl?: Maybe<Scalars['String']['output']>;
  /** Google Analytics tracking ID */
  googleAnalyticsId?: Maybe<Scalars['String']['output']>;
  /** Google Tag Manager ID */
  googleTagManagerId?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the site settings */
  id: Scalars['String']['output'];
  /** Instagram profile URL */
  instagramUrl?: Maybe<Scalars['String']['output']>;
  /** LinkedIn profile URL */
  linkedinUrl?: Maybe<Scalars['String']['output']>;
  /** Whether the site is in maintenance mode */
  maintenanceMode: Scalars['Boolean']['output'];
  /** Phone number */
  phoneNumber?: Maybe<Scalars['String']['output']>;
  /** Robots.txt content */
  robotsTxt?: Maybe<Scalars['String']['output']>;
  /** The site ID these settings belong to */
  siteId: Scalars['String']['output'];
  /** Sitemap URL */
  sitemapUrl?: Maybe<Scalars['String']['output']>;
  /** Support email address */
  supportEmail?: Maybe<Scalars['String']['output']>;
  /** Twitter/X profile URL */
  twitterUrl?: Maybe<Scalars['String']['output']>;
  /** The last update date of the site settings */
  updatedAt: Scalars['DateTime']['output'];
};

/** Fields to sort by */
export enum SortByField {
  CreatedAt = 'CreatedAt',
  StartDate = 'StartDate'
}

/** Direction to sort */
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
  /** The category IDs to assign to the advertiser */
  categoryIds?: InputMaybe<Array<AdvertiserCategoryEnum>>;
  /** The advertiser metadata to update in different languages */
  metadatas?: InputMaybe<Array<UpdateAdvertiserMetadataInput>>;
  /** The unique slug for the advertiser */
  slug?: InputMaybe<Scalars['String']['input']>;
  statusId?: InputMaybe<AdvertiserStatusEnum>;
};

export type UpdateAdvertiserMetadataInput = {
  /** Language ID of the metadata */
  languageId: LanguageEnum;
  /** Name of the advertiser in the specified language */
  name: Scalars['String']['input'];
};

export type UpdateAdvertiserProviderReferenceInput = {
  /** The advertiser ID */
  advertiserId: Scalars['String']['input'];
  /** The affiliate provider ID */
  providerId: AffiliateProviderEnum;
  /** The reference ID of the advertiser in the provider system */
  providerReferenceId: Scalars['String']['input'];
};

export type UpdateBonusTypeInput = {
  effectiveFrom?: InputMaybe<Scalars['DateTime']['input']>;
  effectiveTo?: InputMaybe<Scalars['DateTime']['input']>;
  expiryDays?: InputMaybe<Scalars['Float']['input']>;
  maxUsagePerUser?: InputMaybe<Scalars['Float']['input']>;
  /** The metadata for different languages */
  metadatas?: InputMaybe<Array<BonusTypeMetadataInput>>;
  priority?: InputMaybe<Scalars['Float']['input']>;
  ruleConfig?: InputMaybe<Scalars['String']['input']>;
  statusId?: InputMaybe<BonusTypeStatusEnum>;
  version?: InputMaybe<Scalars['Float']['input']>;
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
  /** The dark theme logo ID of the site for the specific language */
  darkLogoId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the site in the specific language */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The language identifier for this metadata */
  languageId: LanguageEnum;
  /** The logo ID of the site for the specific language */
  logoId?: InputMaybe<Scalars['String']['input']>;
  /** The name of the site in the specific language */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Input for updating site settings */
export type UpdateSiteSettingsInput = {
  /** Physical address */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Whether user registration is allowed */
  allowUserRegistration?: InputMaybe<Scalars['Boolean']['input']>;
  /** Contact email address */
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  /** Default meta description for pages */
  defaultMetaDescription?: InputMaybe<Scalars['String']['input']>;
  /** Default meta title for pages */
  defaultMetaTitle?: InputMaybe<Scalars['String']['input']>;
  /** Whether comments are enabled */
  enableComments?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether newsletter signup is enabled */
  enableNewsletter?: InputMaybe<Scalars['Boolean']['input']>;
  /** Facebook Pixel ID */
  facebookPixelId?: InputMaybe<Scalars['String']['input']>;
  /** Facebook page URL */
  facebookUrl?: InputMaybe<Scalars['String']['input']>;
  /** Google Analytics tracking ID */
  googleAnalyticsId?: InputMaybe<Scalars['String']['input']>;
  /** Google Tag Manager ID */
  googleTagManagerId?: InputMaybe<Scalars['String']['input']>;
  /** Instagram profile URL */
  instagramUrl?: InputMaybe<Scalars['String']['input']>;
  /** LinkedIn profile URL */
  linkedinUrl?: InputMaybe<Scalars['String']['input']>;
  /** Whether the site is in maintenance mode */
  maintenanceMode?: InputMaybe<Scalars['Boolean']['input']>;
  /** Phone number */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  /** Robots.txt content */
  robotsTxt?: InputMaybe<Scalars['String']['input']>;
  /** Sitemap URL */
  sitemapUrl?: InputMaybe<Scalars['String']['input']>;
  /** Support email address */
  supportEmail?: InputMaybe<Scalars['String']['input']>;
  /** Twitter/X profile URL */
  twitterUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UploadMediaInput = {
  /** Caption for the media */
  caption?: InputMaybe<Scalars['String']['input']>;
  /** Custom filename pattern (e.g., "logo", "logo-dark"). If provided, will use this instead of original filename with timestamp. */
  customFilename?: InputMaybe<Scalars['String']['input']>;
  /** Base64 encoded file content */
  fileBase64: Scalars['String']['input'];
  /** Original filename */
  filename: Scalars['String']['input'];
  /** Mime type of the file */
  mimeType: Scalars['String']['input'];
};

export type AdminUpdateAdvertiserCampaignMutationVariables = Exact<{
  data: UpdateAdvertiserCampaignInput;
}>;


export type AdminUpdateAdvertiserCampaignMutation = { __typename?: 'Mutation', updateAdvertiserCampaign: { __typename?: 'AdvertiserCampaign', id: string, slug: string, statusId: AdvertiserCampaignStatusEnum, metadatas: Array<{ __typename?: 'AdvertiserCampaignMetadata', languageId: LanguageEnum, name: string, description: string, banner?: { __typename?: 'Media', id: string, url: string } | null }> } };

export type AdminUpdateAdvertiserMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdateAdvertiserInput;
}>;


export type AdminUpdateAdvertiserMutation = { __typename?: 'Mutation', updateAdvertiser: { __typename?: 'Advertiser', id: string, name: string, slug: string, statusId: AdvertiserStatusEnum, logo: { __typename?: 'Media', url: string }, metadatas?: Array<{ __typename?: 'AdvertiserMetadata', languageId: LanguageEnum, name: string, description: string }> | null, categories?: Array<{ __typename?: 'AdvertiserCategory', id: AdvertiserCategoryEnum, name: string, description?: string | null }> | null } };

export type AdminUpdateAdvertiserCommissionMutationVariables = Exact<{
  data: UpdateAdvertiserCommissionInput;
}>;


export type AdminUpdateAdvertiserCommissionMutation = { __typename?: 'Mutation', updateAdvertiserCommission?: { __typename?: 'AdvertiserCommission', id: string, commission: number, url: string, dayToValidate: number, dayToPayout: number, commissionRows: Array<{ __typename?: 'AdvertiserCommissionRow', id: string, name: string, commission: number, typeId: AdvertiserCommissionTypeEnum, metadatas?: Array<{ __typename?: 'AdvertiserCommissionRowMetadata', languageId: LanguageEnum, name: string }> | null }> } | null };

export type AdminAdvertiserLogoQueryVariables = Exact<{
  advertiserId: Scalars['String']['input'];
}>;


export type AdminAdvertiserLogoQuery = { __typename?: 'Query', advertiser: { __typename?: 'Advertiser', id: string, name: string, logo: { __typename?: 'Media', url: string } } };

export type AdminAdvertiserListQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  sortBy?: InputMaybe<SortByField>;
  sortDirection?: InputMaybe<SortDirection>;
}>;


export type AdminAdvertiserListQuery = { __typename?: 'Query', advertisers: Array<{ __typename?: 'Advertiser', id: string, name: string, statusId: AdvertiserStatusEnum, createdAt: any, logo: { __typename?: 'Media', url: string }, commission?: { __typename?: 'AdvertiserCommission', commission: number } | null, categories?: Array<{ __typename?: 'AdvertiserCategory', id: AdvertiserCategoryEnum, name: string }> | null }>, advertisersPagination: { __typename?: 'AdvertisersPagination', totalItems: number, pageSize: number, currentPage: number } };

export type AdminAdvertiserCampaignListQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminAdvertiserCampaignListQuery = { __typename?: 'Query', advertiserCampaigns: Array<{ __typename?: 'AdvertiserCampaign', id: string, advertiserId: string, providerId: AffiliateProviderEnum, providerReferenceId: string, startDate: any, endDate?: any | null, statusId: AdvertiserCampaignStatusEnum, name: string, banner?: { __typename?: 'Media', url: string } | null, advertiser: { __typename?: 'Advertiser', id: string, name: string } }> };

export type AdminCreateCarouselMutationVariables = Exact<{
  data: CreateCarouselInput;
}>;


export type AdminCreateCarouselMutation = { __typename?: 'Mutation', createCarousel: { __typename?: 'Carousel', id: string, title: string, startDate: any, endDate: any, status: CarouselStatusEnum, cta: { __typename?: 'CarouselCtaCashback', type: CarouselCtaEnum, payload: { __typename?: 'CarouselCtaCashbackPayload', advertiserId: string } } | { __typename?: 'CarouselCtaLink', type: CarouselCtaEnum, payload: { __typename?: 'CarouselCtaLinkPayload', link: string } }, metadatas: Array<{ __typename?: 'CarouselMetada', languageId: LanguageEnum, image: { __typename?: 'Media', id: string, url: string } }> } };

export type AdminUpdateCarouselMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdateCarouselInput;
}>;


export type AdminUpdateCarouselMutation = { __typename?: 'Mutation', updateCarousel: { __typename?: 'Carousel', id: string, title: string, startDate: any, endDate: any, status: CarouselStatusEnum, cta: { __typename?: 'CarouselCtaCashback', type: CarouselCtaEnum, payload: { __typename?: 'CarouselCtaCashbackPayload', advertiserId: string } } | { __typename?: 'CarouselCtaLink', type: CarouselCtaEnum, payload: { __typename?: 'CarouselCtaLinkPayload', link: string } }, metadatas: Array<{ __typename?: 'CarouselMetada', languageId: LanguageEnum, image: { __typename?: 'Media', id: string, url: string } }> } };

export type AdminPostDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdminPostDetailQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, title: string, content: string, postDate: any, slug: string, description?: string | null, editorVersion: number, createdAt: any, status: { __typename?: 'PostStatus', id: string, name: string }, tags?: Array<{ __typename?: 'PostTag', id: string, name: string }> | null, featuredImage?: { __typename?: 'Media', id: string, url: string } | null } | null };

export type AdminUpdatePostMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdatePostInput;
}>;


export type AdminUpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: string, title: string, content: string, postDate: any, slug: string, description?: string | null, editorVersion: number, status: { __typename?: 'PostStatus', id: string, name: string }, tags?: Array<{ __typename?: 'PostTag', id: string, name: string }> | null, featuredImage?: { __typename?: 'Media', id: string, url: string } | null } };

export type PostListQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type PostListQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, title: string, content: string, slug: string, postDate: any, editorVersion: number, featuredImage?: { __typename?: 'Media', url: string } | null, tags?: Array<{ __typename?: 'PostTag', name: string }> | null }>, postsPagination: { __typename?: 'PostsPagination', totalItems: number, pageSize: number, nextPage?: number | null, currentPage: number } };

export type AdminPostListTableQueryQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type AdminPostListTableQueryQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, title: string, postDate: any, slug: string, status: { __typename?: 'PostStatus', id: string, name: string } }>, postsPagination: { __typename?: 'PostsPagination', totalItems: number, pageSize: number, currentPage: number } };

export type SearchQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type SearchQuery = { __typename?: 'Query', searchAdvertisers: Array<{ __typename?: 'SearchResultAdvertiser', id: string, name: string, categories: Array<string>, slug: string, logo: string, calculatedCommission: number }> };

export type CreateBonusTypeMutationVariables = Exact<{
  input: CreateBonusTypeInput;
}>;


export type CreateBonusTypeMutation = { __typename?: 'Mutation', createBonusType: { __typename?: 'BonusType', id: string, codeId: BonusTypeCodeEnum, version: number, priority: number, expiryDays?: number | null, maxUsagePerUser: number, ruleConfig: string, statusId: BonusTypeStatusEnum, effectiveFrom: any, effectiveTo?: any | null, createdAt: any, updatedAt: any, createdBy?: string | null, updatedBy?: string | null, metadatas?: Array<{ __typename?: 'BonusTypeMetadata', bonusTypeId: string, languageId: LanguageEnum, title: string, description: string, termsAndConditions: string, featuredImageId?: string | null, logoId?: string | null, featuredImage?: { __typename?: 'Media', id: string, url: string, caption?: string | null, mimeType?: string | null } | null, logo?: { __typename?: 'Media', id: string, url: string, caption?: string | null, mimeType?: string | null } | null }> | null } };

export type UpdateBonusTypeMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateBonusTypeInput;
}>;


export type UpdateBonusTypeMutation = { __typename?: 'Mutation', updateBonusType: { __typename?: 'BonusType', id: string, codeId: BonusTypeCodeEnum, version: number, priority: number, expiryDays?: number | null, maxUsagePerUser: number, ruleConfig: string, statusId: BonusTypeStatusEnum, effectiveFrom: any, effectiveTo?: any | null, createdAt: any, updatedAt: any, createdBy?: string | null, updatedBy?: string | null, metadatas?: Array<{ __typename?: 'BonusTypeMetadata', bonusTypeId: string, languageId: LanguageEnum, title: string, description: string, termsAndConditions: string, featuredImageId?: string | null, logoId?: string | null, featuredImage?: { __typename?: 'Media', id: string, url: string, caption?: string | null, mimeType?: string | null } | null, logo?: { __typename?: 'Media', id: string, url: string, caption?: string | null, mimeType?: string | null } | null }> | null } };

export type DeleteBonusTypeMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteBonusTypeMutation = { __typename?: 'Mutation', deleteBonusType: boolean };

export type GetBonusTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBonusTypesQuery = { __typename?: 'Query', bonusTypes: Array<{ __typename?: 'BonusType', id: string, codeId: BonusTypeCodeEnum, version: number, priority: number, expiryDays?: number | null, maxUsagePerUser: number, ruleConfig: string, statusId: BonusTypeStatusEnum, effectiveFrom: any, effectiveTo?: any | null, createdAt: any, updatedAt: any, createdBy?: string | null, updatedBy?: string | null }> };

export type GetBonusTypeQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetBonusTypeQuery = { __typename?: 'Query', bonusType?: { __typename?: 'BonusType', id: string, codeId: BonusTypeCodeEnum, version: number, priority: number, expiryDays?: number | null, maxUsagePerUser: number, ruleConfig: string, statusId: BonusTypeStatusEnum, effectiveFrom: any, effectiveTo?: any | null, createdAt: any, updatedAt: any, createdBy?: string | null, updatedBy?: string | null } | null };

export type GetMyBonusesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyBonusesQuery = { __typename?: 'Query', myBonuses: Array<{ __typename?: 'BonusEligibility', id: string, userId: string, bonusTypeId: string, bonusVersion: number, statusId: BonusEligibilityStatusEnum, availableAt: any, expiresAt?: any | null, usedAt?: any | null, eligibilityMetadata?: string | null, createdAt: any, updatedAt: any, bonusType?: { __typename?: 'BonusType', id: string, codeId: BonusTypeCodeEnum, metadata?: { __typename?: 'BonusTypeMetadata', title: string, description: string, termsAndConditions: string, logo?: { __typename?: 'Media', id: string, url: string } | null, featuredImage?: { __typename?: 'Media', id: string, url: string } | null } | null } | null }> };

export type GetMyBonusTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyBonusTransactionsQuery = { __typename?: 'Query', myBonusTransactions: Array<{ __typename?: 'BonusTransaction', id: string, userId: string, bonusEligibilityId: string, bonusTypeId: string, bonusVersion: number, amount: number, currencyId: CurrencyEnum, sourceTransactionId?: string | null, merchantCallbackId?: string | null, processedAt: any, walletTransactionId?: string | null, processingMetadata?: string | null, createdAt: any, updatedAt: any }> };

export type GetMyBonusTransactionsPaginatedQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetMyBonusTransactionsPaginatedQuery = { __typename?: 'Query', myBonusTransactionsPaginated: { __typename?: 'BonusTransactionConnection', totalCount: number, page: number, pageSize: number, items: Array<{ __typename?: 'BonusTransaction', id: string, userId: string, bonusEligibilityId: string, bonusTypeId: string, bonusVersion: number, amount: number, currencyId: CurrencyEnum, sourceTransactionId?: string | null, merchantCallbackId?: string | null, processedAt: any, walletTransactionId?: string | null, processingMetadata?: string | null, createdAt: any, updatedAt: any, bonusEligibility?: { __typename?: 'BonusEligibility', bonusType?: { __typename?: 'BonusType', id: string, codeId: BonusTypeCodeEnum, metadata?: { __typename?: 'BonusTypeMetadata', title: string, description: string } | null } | null } | null }> } };

export type AdminUpdateAdvertiserProviderReferenceMutationVariables = Exact<{
  advertiserId: Scalars['String']['input'];
  providerId: AffiliateProviderEnum;
  providerReferenceId: Scalars['String']['input'];
}>;


export type AdminUpdateAdvertiserProviderReferenceMutation = { __typename?: 'Mutation', updateAdvertiserProviderReference: { __typename?: 'AdvertiserProviderReference', advertiserId: string, providerId: AffiliateProviderEnum, providerReferenceId: string } };

export type FetchAdvertiserMutationVariables = Exact<{
  data: FetchAdvertiserInput;
}>;


export type FetchAdvertiserMutation = { __typename?: 'Mutation', fetchAdvertiser: { __typename?: 'FetchAdvertiserOutput', success: boolean, advertiserName?: string | null, slug?: string | null, message?: string | null } };

export type GenerateImageMutationVariables = Exact<{
  input: ImageGenerationInput;
}>;


export type GenerateImageMutation = { __typename?: 'Mutation', generateImage: { __typename?: 'ImageGenerationResponse', success: boolean, imageUrl?: string | null, imageBase64?: string | null, prompt: string, provider: ImageProviderType, referenceImages?: Array<string> | null, error?: string | null, metadata?: { __typename?: 'ImageGenerationMetadata', model?: string | null, size?: string | null, seed?: number | null, timings?: string | null, hasNsfwConcepts?: Array<boolean> | null } | null } };

export type UpdateSiteMutationVariables = Exact<{
  input: UpdateSiteInput;
}>;


export type UpdateSiteMutation = { __typename?: 'Mutation', updateSite: { __typename?: 'Site', id: string, name: string, domain?: string | null, description?: string | null, createdAt: any, updatedAt: any, logo?: { __typename?: 'Media', id: string, url: string } | null, metadatas: Array<{ __typename?: 'SiteMetadata', name: string, description?: string | null, languageId: LanguageEnum, logo?: { __typename?: 'Media', id: string, url: string } | null, darkLogo?: { __typename?: 'Media', id: string, url: string } | null }> } };

export type UploadMediaMutationVariables = Exact<{
  data: UploadMediaInput;
}>;


export type UploadMediaMutation = { __typename?: 'Mutation', uploadMedia: { __typename?: 'Media', id: string, url: string, mimeType?: string | null, caption?: string | null, createdAt?: any | null } };

export type AdminAdvertiserCampaignDetailPageQueryQueryVariables = Exact<{
  id: Scalars['String']['input'];
  isSupported?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type AdminAdvertiserCampaignDetailPageQueryQuery = { __typename?: 'Query', advertiserCampaign?: { __typename?: 'AdvertiserCampaign', id: string, slug: string, statusId: AdvertiserCampaignStatusEnum, advertiserId: string, providerId: AffiliateProviderEnum, providerReferenceId: string, startDate: any, endDate?: any | null, url: string, metadatas: Array<{ __typename?: 'AdvertiserCampaignMetadata', languageId: LanguageEnum, name: string, description: string, banner?: { __typename?: 'Media', id: string, url: string } | null }> } | null, languages: Array<{ __typename?: 'Language', id: LanguageEnum, name: string, code: string }> };

export type AdminAdvertiserMultiCommissionsQueryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdminAdvertiserMultiCommissionsQueryQuery = { __typename?: 'Query', advertiser: { __typename?: 'Advertiser', id: string, name: string, slug: string, statusId: AdvertiserStatusEnum, logo: { __typename?: 'Media', id: string, url: string }, metadatas?: Array<{ __typename?: 'AdvertiserMetadata', languageId: LanguageEnum, name: string, description: string }> | null, commissions?: Array<{ __typename?: 'AdvertiserCommission', id: string, dayToValidate: number, dayToPayout: number, url: string, statusId: AdvertiserCommissionStatusEnum, providerId: AffiliateProviderEnum, commissionRows: Array<{ __typename?: 'AdvertiserCommissionRow', id: string, commission: number, typeId: AdvertiserCommissionTypeEnum, statusId: AdvertiserCommissionRowStatusEnum, providerReferenceId: string, metadatas?: Array<{ __typename?: 'AdvertiserCommissionRowMetadata', languageId: LanguageEnum, name: string }> | null }> }> | null, providerReferences?: Array<{ __typename?: 'AdvertiserProviderReference', providerId: AffiliateProviderEnum, providerReferenceId: string }> | null, categories?: Array<{ __typename?: 'AdvertiserCategory', id: AdvertiserCategoryEnum, name: string, description?: string | null }> | null } };

export type AdminCarouselDetailPageQueryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdminCarouselDetailPageQueryQuery = { __typename?: 'Query', carousel: { __typename?: 'Carousel', id: string, title: string, startDate: any, endDate: any, status: CarouselStatusEnum, cta: { __typename?: 'CarouselCtaCashback', type: CarouselCtaEnum, payload: { __typename?: 'CarouselCtaCashbackPayload', advertiserId: string } } | { __typename?: 'CarouselCtaLink', type: CarouselCtaEnum, payload: { __typename?: 'CarouselCtaLinkPayload', link: string } }, metadatas: Array<{ __typename?: 'CarouselMetada', languageId: LanguageEnum, image: { __typename?: 'Media', id: string, url: string } }> } };

export type EditCarouselQueryQueryVariables = Exact<{
  id: Scalars['String']['input'];
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  statusId?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditCarouselQueryQuery = { __typename?: 'Query', carousel: { __typename?: 'Carousel', id: string, title: string, startDate: any, endDate: any, status: CarouselStatusEnum, cta: { __typename?: 'CarouselCtaCashback', type: CarouselCtaEnum, payload: { __typename?: 'CarouselCtaCashbackPayload', advertiserId: string } } | { __typename?: 'CarouselCtaLink', type: CarouselCtaEnum, payload: { __typename?: 'CarouselCtaLinkPayload', link: string } }, metadatas: Array<{ __typename?: 'CarouselMetada', languageId: LanguageEnum, image: { __typename?: 'Media', id: string, url: string } }> }, languages: Array<{ __typename?: 'Language', id: LanguageEnum, name: string }>, advertisers: Array<{ __typename?: 'Advertiser', id: string, name: string, slug: string, description: string, createdAt: any, updatedAt: any, logo: { __typename?: 'Media', id: string, url: string } }>, advertisersPagination: { __typename?: 'AdvertisersPagination', totalItems: number, totalPages: number } };

export type GetAdminCarouselListQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetAdminCarouselListQuery = { __typename?: 'Query', carousels: Array<{ __typename?: 'Carousel', id: string, title: string, startDate: any, endDate: any, status: CarouselStatusEnum, image: { __typename?: 'Media', id: string, url: string } }>, carouselsPagination: { __typename?: 'CarouselsPagination', totalItems: number, pageSize: number, currentPage: number } };

export type GetAdvertiserCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdvertiserCategoriesQuery = { __typename?: 'Query', advertiserCategories: Array<{ __typename?: 'AdvertiserCategory', id: AdvertiserCategoryEnum, name: string, description?: string | null }> };

export type GetAllAdvertisersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  statusId?: InputMaybe<Scalars['String']['input']>;
  categoryIds?: InputMaybe<Array<AdvertiserCategoryEnum> | AdvertiserCategoryEnum>;
}>;


export type GetAllAdvertisersQuery = { __typename?: 'Query', advertisers: Array<{ __typename?: 'Advertiser', id: string, name: string, slug: string, logo: { __typename?: 'Media', id: string, url: string }, categories?: Array<{ __typename?: 'AdvertiserCategory', id: AdvertiserCategoryEnum, name: string, description?: string | null }> | null, commission?: { __typename?: 'AdvertiserCommission', calculatedCommission: number } | null }>, advertisersPagination: { __typename?: 'AdvertisersPagination', nextPage?: number | null, currentPage: number } };

export type GetHomeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomeQuery = { __typename?: 'Query', carousels: Array<{ __typename?: 'Carousel', id: string, cta: { __typename?: 'CarouselCtaCashback', type: CarouselCtaEnum, payload: { __typename?: 'CarouselCtaCashbackPayload', advertiserSlug: string, advertiserRedirectUrl: string, advertiserName: string, advertiserLogoUrl: string, advertiserCashbackRate: number } } | { __typename?: 'CarouselCtaLink', type: CarouselCtaEnum, payload: { __typename?: 'CarouselCtaLinkPayload', link: string } }, image: { __typename?: 'Media', id: string, url: string } }> };

export type GetSiteAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSiteAdminQuery = { __typename?: 'Query', site: { __typename?: 'Site', id: string, name: string, domain?: string | null, description?: string | null, createdAt: any, updatedAt: any, logo?: { __typename?: 'Media', id: string, url: string } | null, metadatas: Array<{ __typename?: 'SiteMetadata', name: string, description?: string | null, languageId: LanguageEnum, logo?: { __typename?: 'Media', id: string, url: string } | null, darkLogo?: { __typename?: 'Media', id: string, url: string } | null }> }, languages: Array<{ __typename?: 'Language', id: LanguageEnum, name: string, code: string, shortName: string, isSupported: boolean, isDefault: boolean }> };

export type GetSiteAndAdvertiserQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetSiteAndAdvertiserQuery = { __typename?: 'Query', site: { __typename?: 'Site', id: string, name: string, domain?: string | null, description?: string | null, createdAt: any, updatedAt: any, logo?: { __typename?: 'Media', url: string } | null }, advertiser: { __typename?: 'Advertiser', id: string, name: string, slug: string, description: string, statusId: AdvertiserStatusEnum, createdAt: any, updatedAt: any, logo: { __typename?: 'Media', id: string, url: string }, commission?: { __typename?: 'AdvertiserCommission', calculatedCommission: number, dayToValidate: number, dayToPayout: number, url: string } | null } };

export type GetSiteAndAdvertisersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  statusId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetSiteAndAdvertisersQuery = { __typename?: 'Query', languages: Array<{ __typename?: 'Language', id: LanguageEnum, name: string }>, advertisers: Array<{ __typename?: 'Advertiser', id: string, name: string, slug: string, description: string, createdAt: any, updatedAt: any, logo: { __typename?: 'Media', id: string, url: string } }>, advertisersPagination: { __typename?: 'AdvertisersPagination', totalItems: number, totalPages: number } };

export type GetSiteWithMetadataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSiteWithMetadataQuery = { __typename?: 'Query', site: { __typename?: 'Site', id: string, name: string, domain?: string | null, description?: string | null, createdAt: any, updatedAt: any, logo?: { __typename?: 'Media', id: string, url: string } | null, metadatas: Array<{ __typename?: 'SiteMetadata', name: string, description?: string | null, languageId: LanguageEnum, logo?: { __typename?: 'Media', id: string, url: string } | null, darkLogo?: { __typename?: 'Media', id: string, url: string } | null }> }, languages: Array<{ __typename?: 'Language', id: LanguageEnum, name: string, code: string, shortName: string, isSupported: boolean, isDefault: boolean }> };

export type GetSiteQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSiteQuery = { __typename?: 'Query', site: { __typename?: 'Site', id: string, name: string, domain?: string | null, description?: string | null, createdAt: any, updatedAt: any, logo?: { __typename?: 'Media', url: string } | null } };

export type GetSupportedLanguagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSupportedLanguagesQuery = { __typename?: 'Query', languages: Array<{ __typename?: 'Language', id: LanguageEnum, name: string, code: string, shortName: string, isSupported: boolean, isDefault: boolean }> };

export type PostDetailQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type PostDetailQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, title: string, content: string, description?: string | null, slug: string, postDate: any, createdAt: any, updatedAt: any, editorVersion: number, featuredImage?: { __typename?: 'Media', url: string } | null, tags?: Array<{ __typename?: 'PostTag', name: string }> | null } | null };

export type PostListSitemapQueryVariables = Exact<{ [key: string]: never; }>;


export type PostListSitemapQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, title: string, postDate: any, slug: string, updatedAt: any }> };

export type RefreshAdvertiserSearchIndexMutationVariables = Exact<{
  data: RefreshAdvertiserSearchIndexInput;
}>;


export type RefreshAdvertiserSearchIndexMutation = { __typename?: 'Mutation', refreshAdvertiserSearchIndex: { __typename?: 'RefreshAdvertiserSearchIndexOutput', success: boolean } };

export type GetSiteSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSiteSettingsQuery = { __typename?: 'Query', siteSettings?: { __typename?: 'SiteSettings', id: string, siteId: string, googleAnalyticsId?: string | null, googleTagManagerId?: string | null, facebookPixelId?: string | null, defaultMetaTitle?: string | null, defaultMetaDescription?: string | null, sitemapUrl?: string | null, robotsTxt?: string | null, facebookUrl?: string | null, twitterUrl?: string | null, instagramUrl?: string | null, linkedinUrl?: string | null, contactEmail?: string | null, supportEmail?: string | null, phoneNumber?: string | null, address?: string | null, maintenanceMode: boolean, allowUserRegistration: boolean, enableComments: boolean, enableNewsletter: boolean, createdAt: any, updatedAt: any } | null };

export type UpdateSiteSettingsMutationVariables = Exact<{
  input: UpdateSiteSettingsInput;
}>;


export type UpdateSiteSettingsMutation = { __typename?: 'Mutation', updateSiteSettings: { __typename?: 'SiteSettings', id: string, siteId: string, googleAnalyticsId?: string | null, googleTagManagerId?: string | null, facebookPixelId?: string | null, defaultMetaTitle?: string | null, defaultMetaDescription?: string | null, sitemapUrl?: string | null, robotsTxt?: string | null, facebookUrl?: string | null, twitterUrl?: string | null, instagramUrl?: string | null, linkedinUrl?: string | null, contactEmail?: string | null, supportEmail?: string | null, phoneNumber?: string | null, address?: string | null, maintenanceMode: boolean, allowUserRegistration: boolean, enableComments: boolean, enableNewsletter: boolean, createdAt: any, updatedAt: any } };

export type AdvertiserCategoriesWithCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdvertiserCategoriesWithCountsQuery = { __typename?: 'Query', advertiserCategoriesWithCounts: Array<{ __typename?: 'AdvertiserCategoryWithCount', id: AdvertiserCategoryEnum, name: string, description?: string | null, count: number }> };

export type GetAdvertiserBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  endDateGt: Scalars['DateTime']['input'];
  campaignStatusId: AdvertiserCampaignStatusEnum;
}>;


export type GetAdvertiserBySlugQuery = { __typename?: 'Query', advertiser: { __typename?: 'Advertiser', id: string, name: string, slug: string, description: string, statusId: AdvertiserStatusEnum, createdAt: any, updatedAt: any, logo: { __typename?: 'Media', id: string, url: string }, categories?: Array<{ __typename?: 'AdvertiserCategory', id: AdvertiserCategoryEnum, name: string }> | null, commission?: { __typename?: 'AdvertiserCommission', calculatedCommission: number, dayToValidate: number, dayToPayout: number, url: string, commissionRows: Array<{ __typename?: 'AdvertiserCommissionRow', id: string, name: string, calculatedCommission: number, typeId: AdvertiserCommissionTypeEnum }> } | null }, advertiserCampaigns: Array<{ __typename?: 'AdvertiserCampaign', id: string, name: string, startDate: any, endDate?: any | null, description: string, voucherCodes: Array<string>, url: string, banner?: { __typename?: 'Media', url: string } | null }> };


export const AdminUpdateAdvertiserCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateAdvertiserCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAdvertiserCampaignInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdvertiserCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"metadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"languageId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"banner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminUpdateAdvertiserCampaignMutation, AdminUpdateAdvertiserCampaignMutationVariables>;
export const AdminUpdateAdvertiserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateAdvertiser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAdvertiserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdvertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"languageId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<AdminUpdateAdvertiserMutation, AdminUpdateAdvertiserMutationVariables>;
export const AdminUpdateAdvertiserCommissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateAdvertiserCommission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAdvertiserCommissionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdvertiserCommission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"commissionRows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"typeId"}},{"kind":"Field","name":{"kind":"Name","value":"metadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"languageId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"dayToValidate"}},{"kind":"Field","name":{"kind":"Name","value":"dayToPayout"}}]}}]}}]} as unknown as DocumentNode<AdminUpdateAdvertiserCommissionMutation, AdminUpdateAdvertiserCommissionMutationVariables>;
export const AdminAdvertiserLogoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminAdvertiserLogo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"advertiserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"advertiserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"advertiserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<AdminAdvertiserLogoQuery, AdminAdvertiserLogoQueryVariables>;
export const AdminAdvertiserListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminAdvertiserList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortByField"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertisers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commission"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"advertisersPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}}]}}]}}]} as unknown as DocumentNode<AdminAdvertiserListQuery, AdminAdvertiserListQueryVariables>;
export const AdminAdvertiserCampaignListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminAdvertiserCampaignList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiserCampaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"advertiserId"}},{"kind":"Field","name":{"kind":"Name","value":"providerId"}},{"kind":"Field","name":{"kind":"Name","value":"providerReferenceId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"banner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AdminAdvertiserCampaignListQuery, AdminAdvertiserCampaignListQueryVariables>;
export const AdminCreateCarouselDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminCreateCarousel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCarouselInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCarousel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarouselCtaLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarouselCtaCashback"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiserId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageId"}}]}}]}}]}}]} as unknown as DocumentNode<AdminCreateCarouselMutation, AdminCreateCarouselMutationVariables>;
export const AdminUpdateCarouselDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateCarousel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCarouselInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCarousel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarouselCtaLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarouselCtaCashback"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiserId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageId"}}]}}]}}]}}]} as unknown as DocumentNode<AdminUpdateCarouselMutation, AdminUpdateCarouselMutationVariables>;
export const AdminPostDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminPostDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"postDate"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"editorVersion"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AdminPostDetailQuery, AdminPostDetailQueryVariables>;
export const AdminUpdatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"postDate"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"editorVersion"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<AdminUpdatePostMutation, AdminUpdatePostMutationVariables>;
export const PostListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"statusId"},"value":{"kind":"StringValue","value":"Published","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"postDate"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"editorVersion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"postsPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"statusId"},"value":{"kind":"StringValue","value":"Published","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"nextPage"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}}]}}]}}]} as unknown as DocumentNode<PostListQuery, PostListQueryVariables>;
export const AdminPostListTableQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminPostListTableQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"postDate"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"postsPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}}]}}]}}]} as unknown as DocumentNode<AdminPostListTableQueryQuery, AdminPostListTableQueryQueryVariables>;
export const SearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Search"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchAdvertisers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"calculatedCommission"}}]}}]}}]} as unknown as DocumentNode<SearchQuery, SearchQueryVariables>;
export const CreateBonusTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBonusType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBonusTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBonusType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"codeId"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"expiryDays"}},{"kind":"Field","name":{"kind":"Name","value":"maxUsagePerUser"}},{"kind":"Field","name":{"kind":"Name","value":"ruleConfig"}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"effectiveFrom"}},{"kind":"Field","name":{"kind":"Name","value":"effectiveTo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"metadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bonusTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"languageId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"termsAndConditions"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImageId"}},{"kind":"Field","name":{"kind":"Name","value":"logoId"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateBonusTypeMutation, CreateBonusTypeMutationVariables>;
export const UpdateBonusTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBonusType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBonusTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBonusType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"codeId"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"expiryDays"}},{"kind":"Field","name":{"kind":"Name","value":"maxUsagePerUser"}},{"kind":"Field","name":{"kind":"Name","value":"ruleConfig"}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"effectiveFrom"}},{"kind":"Field","name":{"kind":"Name","value":"effectiveTo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"metadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bonusTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"languageId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"termsAndConditions"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImageId"}},{"kind":"Field","name":{"kind":"Name","value":"logoId"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateBonusTypeMutation, UpdateBonusTypeMutationVariables>;
export const DeleteBonusTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBonusType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBonusType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteBonusTypeMutation, DeleteBonusTypeMutationVariables>;
export const GetBonusTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBonusTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bonusTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"codeId"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"expiryDays"}},{"kind":"Field","name":{"kind":"Name","value":"maxUsagePerUser"}},{"kind":"Field","name":{"kind":"Name","value":"ruleConfig"}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"effectiveFrom"}},{"kind":"Field","name":{"kind":"Name","value":"effectiveTo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]}}]} as unknown as DocumentNode<GetBonusTypesQuery, GetBonusTypesQueryVariables>;
export const GetBonusTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBonusType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bonusType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"codeId"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"expiryDays"}},{"kind":"Field","name":{"kind":"Name","value":"maxUsagePerUser"}},{"kind":"Field","name":{"kind":"Name","value":"ruleConfig"}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"effectiveFrom"}},{"kind":"Field","name":{"kind":"Name","value":"effectiveTo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]}}]} as unknown as DocumentNode<GetBonusTypeQuery, GetBonusTypeQueryVariables>;
export const GetMyBonusesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyBonuses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myBonuses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"bonusTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"bonusVersion"}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"availableAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"usedAt"}},{"kind":"Field","name":{"kind":"Name","value":"eligibilityMetadata"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"bonusType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"codeId"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"termsAndConditions"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMyBonusesQuery, GetMyBonusesQueryVariables>;
export const GetMyBonusTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyBonusTransactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myBonusTransactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"bonusEligibilityId"}},{"kind":"Field","name":{"kind":"Name","value":"bonusTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"bonusVersion"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyId"}},{"kind":"Field","name":{"kind":"Name","value":"sourceTransactionId"}},{"kind":"Field","name":{"kind":"Name","value":"merchantCallbackId"}},{"kind":"Field","name":{"kind":"Name","value":"processedAt"}},{"kind":"Field","name":{"kind":"Name","value":"walletTransactionId"}},{"kind":"Field","name":{"kind":"Name","value":"processingMetadata"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMyBonusTransactionsQuery, GetMyBonusTransactionsQueryVariables>;
export const GetMyBonusTransactionsPaginatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyBonusTransactionsPaginated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myBonusTransactionsPaginated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"bonusEligibilityId"}},{"kind":"Field","name":{"kind":"Name","value":"bonusTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"bonusVersion"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyId"}},{"kind":"Field","name":{"kind":"Name","value":"sourceTransactionId"}},{"kind":"Field","name":{"kind":"Name","value":"merchantCallbackId"}},{"kind":"Field","name":{"kind":"Name","value":"processedAt"}},{"kind":"Field","name":{"kind":"Name","value":"walletTransactionId"}},{"kind":"Field","name":{"kind":"Name","value":"processingMetadata"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"bonusEligibility"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bonusType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"codeId"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}}]}}]}}]} as unknown as DocumentNode<GetMyBonusTransactionsPaginatedQuery, GetMyBonusTransactionsPaginatedQueryVariables>;
export const AdminUpdateAdvertiserProviderReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateAdvertiserProviderReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"advertiserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"providerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AffiliateProviderEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"providerReferenceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdvertiserProviderReference"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"advertiserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"advertiserId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"providerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"providerId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"providerReferenceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"providerReferenceId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiserId"}},{"kind":"Field","name":{"kind":"Name","value":"providerId"}},{"kind":"Field","name":{"kind":"Name","value":"providerReferenceId"}}]}}]}}]} as unknown as DocumentNode<AdminUpdateAdvertiserProviderReferenceMutation, AdminUpdateAdvertiserProviderReferenceMutationVariables>;
export const FetchAdvertiserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FetchAdvertiser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FetchAdvertiserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchAdvertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"advertiserName"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<FetchAdvertiserMutation, FetchAdvertiserMutationVariables>;
export const GenerateImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImageGenerationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageBase64"}},{"kind":"Field","name":{"kind":"Name","value":"prompt"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"referenceImages"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"seed"}},{"kind":"Field","name":{"kind":"Name","value":"timings"}},{"kind":"Field","name":{"kind":"Name","value":"hasNsfwConcepts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<GenerateImageMutation, GenerateImageMutationVariables>;
export const UpdateSiteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSiteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"darkLogo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateSiteMutation, UpdateSiteMutationVariables>;
export const UploadMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadMediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UploadMediaMutation, UploadMediaMutationVariables>;
export const AdminAdvertiserCampaignDetailPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminAdvertiserCampaignDetailPageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isSupported"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiserCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"advertiserId"}},{"kind":"Field","name":{"kind":"Name","value":"providerId"}},{"kind":"Field","name":{"kind":"Name","value":"providerReferenceId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"metadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"languageId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"banner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"languages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isSupported"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isSupported"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<AdminAdvertiserCampaignDetailPageQueryQuery, AdminAdvertiserCampaignDetailPageQueryQueryVariables>;
export const AdminAdvertiserMultiCommissionsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminAdvertiserMultiCommissionsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"advertiserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"metadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"languageId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"commissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dayToValidate"}},{"kind":"Field","name":{"kind":"Name","value":"dayToPayout"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"providerId"}},{"kind":"Field","name":{"kind":"Name","value":"commissionRows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"typeId"}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"providerReferenceId"}},{"kind":"Field","name":{"kind":"Name","value":"metadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"languageId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"providerReferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"providerId"}},{"kind":"Field","name":{"kind":"Name","value":"providerReferenceId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<AdminAdvertiserMultiCommissionsQueryQuery, AdminAdvertiserMultiCommissionsQueryQueryVariables>;
export const AdminCarouselDetailPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminCarouselDetailPageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"carousel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarouselCtaLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarouselCtaCashback"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiserId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageId"}}]}}]}}]}}]} as unknown as DocumentNode<AdminCarouselDetailPageQueryQuery, AdminCarouselDetailPageQueryQueryVariables>;
export const EditCarouselQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EditCarouselQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"carousel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarouselCtaLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarouselCtaCashback"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiserId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"languages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isSupported"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"advertisers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"statusId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"advertisersPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"statusId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<EditCarouselQueryQuery, EditCarouselQueryQueryVariables>;
export const GetAdminCarouselListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAdminCarouselList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"carousels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"carouselsPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}}]}}]}}]} as unknown as DocumentNode<GetAdminCarouselListQuery, GetAdminCarouselListQueryVariables>;
export const GetAdvertiserCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAdvertiserCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiserCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetAdvertiserCategoriesQuery, GetAdvertiserCategoriesQueryVariables>;
export const GetAllAdvertisersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAdvertisers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdvertiserCategoryEnum"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertisers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"statusId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"statusId"},"value":{"kind":"EnumValue","value":"Active"}},{"kind":"Argument","name":{"kind":"Name","value":"rowStatusId"},"value":{"kind":"EnumValue","value":"Active"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calculatedCommission"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"advertisersPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"statusId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nextPage"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}}]}}]}}]} as unknown as DocumentNode<GetAllAdvertisersQuery, GetAllAdvertisersQueryVariables>;
export const GetHomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHome"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"carousels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"StringValue","value":"Active","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarouselCtaLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarouselCtaCashback"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiserSlug"}},{"kind":"Field","name":{"kind":"Name","value":"advertiserRedirectUrl"}},{"kind":"Field","name":{"kind":"Name","value":"advertiserName"}},{"kind":"Field","name":{"kind":"Name","value":"advertiserLogoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"advertiserCashbackRate"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetHomeQuery, GetHomeQueryVariables>;
export const GetSiteAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSiteAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"darkLogo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isSupported"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"isSupported"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}}]}}]}}]} as unknown as DocumentNode<GetSiteAdminQuery, GetSiteAdminQueryVariables>;
export const GetSiteAndAdvertiserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSiteAndAdvertiser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calculatedCommission"}},{"kind":"Field","name":{"kind":"Name","value":"dayToValidate"}},{"kind":"Field","name":{"kind":"Name","value":"dayToPayout"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetSiteAndAdvertiserQuery, GetSiteAndAdvertiserQueryVariables>;
export const GetSiteAndAdvertisersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSiteAndAdvertisers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"languages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isSupported"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"advertisers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"statusId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"advertisersPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"statusId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<GetSiteAndAdvertisersQuery, GetSiteAndAdvertisersQueryVariables>;
export const GetSiteWithMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSiteWithMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"darkLogo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isSupported"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"isSupported"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}}]}}]}}]} as unknown as DocumentNode<GetSiteWithMetadataQuery, GetSiteWithMetadataQueryVariables>;
export const GetSiteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSite"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetSiteQuery, GetSiteQueryVariables>;
export const GetSupportedLanguagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSupportedLanguages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"languages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isSupported"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"isSupported"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}}]}}]}}]} as unknown as DocumentNode<GetSupportedLanguagesQuery, GetSupportedLanguagesQueryVariables>;
export const PostDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"postDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"editorVersion"}}]}}]}}]} as unknown as DocumentNode<PostDetailQuery, PostDetailQueryVariables>;
export const PostListSitemapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostListSitemap"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"5000"}},{"kind":"Argument","name":{"kind":"Name","value":"statusId"},"value":{"kind":"StringValue","value":"Published","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"postDate"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<PostListSitemapQuery, PostListSitemapQueryVariables>;
export const RefreshAdvertiserSearchIndexDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshAdvertiserSearchIndex"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshAdvertiserSearchIndexInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshAdvertiserSearchIndex"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RefreshAdvertiserSearchIndexMutation, RefreshAdvertiserSearchIndexMutationVariables>;
export const GetSiteSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSiteSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"siteId"}},{"kind":"Field","name":{"kind":"Name","value":"googleAnalyticsId"}},{"kind":"Field","name":{"kind":"Name","value":"googleTagManagerId"}},{"kind":"Field","name":{"kind":"Name","value":"facebookPixelId"}},{"kind":"Field","name":{"kind":"Name","value":"defaultMetaTitle"}},{"kind":"Field","name":{"kind":"Name","value":"defaultMetaDescription"}},{"kind":"Field","name":{"kind":"Name","value":"sitemapUrl"}},{"kind":"Field","name":{"kind":"Name","value":"robotsTxt"}},{"kind":"Field","name":{"kind":"Name","value":"facebookUrl"}},{"kind":"Field","name":{"kind":"Name","value":"twitterUrl"}},{"kind":"Field","name":{"kind":"Name","value":"instagramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinUrl"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"supportEmail"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"maintenanceMode"}},{"kind":"Field","name":{"kind":"Name","value":"allowUserRegistration"}},{"kind":"Field","name":{"kind":"Name","value":"enableComments"}},{"kind":"Field","name":{"kind":"Name","value":"enableNewsletter"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetSiteSettingsQuery, GetSiteSettingsQueryVariables>;
export const UpdateSiteSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSiteSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSiteSettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSiteSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"siteId"}},{"kind":"Field","name":{"kind":"Name","value":"googleAnalyticsId"}},{"kind":"Field","name":{"kind":"Name","value":"googleTagManagerId"}},{"kind":"Field","name":{"kind":"Name","value":"facebookPixelId"}},{"kind":"Field","name":{"kind":"Name","value":"defaultMetaTitle"}},{"kind":"Field","name":{"kind":"Name","value":"defaultMetaDescription"}},{"kind":"Field","name":{"kind":"Name","value":"sitemapUrl"}},{"kind":"Field","name":{"kind":"Name","value":"robotsTxt"}},{"kind":"Field","name":{"kind":"Name","value":"facebookUrl"}},{"kind":"Field","name":{"kind":"Name","value":"twitterUrl"}},{"kind":"Field","name":{"kind":"Name","value":"instagramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinUrl"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"supportEmail"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"maintenanceMode"}},{"kind":"Field","name":{"kind":"Name","value":"allowUserRegistration"}},{"kind":"Field","name":{"kind":"Name","value":"enableComments"}},{"kind":"Field","name":{"kind":"Name","value":"enableNewsletter"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateSiteSettingsMutation, UpdateSiteSettingsMutationVariables>;
export const AdvertiserCategoriesWithCountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdvertiserCategoriesWithCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiserCategoriesWithCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<AdvertiserCategoriesWithCountsQuery, AdvertiserCategoriesWithCountsQueryVariables>;
export const GetAdvertiserBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAdvertiserBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDateGt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignStatusId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdvertiserCampaignStatusEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertiser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"statusId"},"value":{"kind":"EnumValue","value":"Active"}},{"kind":"Argument","name":{"kind":"Name","value":"rowStatusId"},"value":{"kind":"EnumValue","value":"Active"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calculatedCommission"}},{"kind":"Field","name":{"kind":"Name","value":"dayToValidate"}},{"kind":"Field","name":{"kind":"Name","value":"dayToPayout"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"commissionRows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calculatedCommission"}},{"kind":"Field","name":{"kind":"Name","value":"typeId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"advertiserCampaigns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"advertiserSlug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDateGt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDateGt"}}},{"kind":"Argument","name":{"kind":"Name","value":"statusId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignStatusId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"voucherCodes"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"banner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetAdvertiserBySlugQuery, GetAdvertiserBySlugQueryVariables>;