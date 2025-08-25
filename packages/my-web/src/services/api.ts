/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface PermissionDto {
  id: string;
  name:
    | "AdminPanel"
    | "ViewRole"
    | "ManageRole"
    | "ViewPermission"
    | "ManagePermission"
    | "ViewCarousel"
    | "ManageCarousel"
    | "ViewAdvertiser"
    | "ManageAdvertiser"
    | "ViewPost"
    | "ManagePost"
    | "ViewSite"
    | "ManageSite"
    | "ViewBonuses"
    | "ManageBonuses";
}

export interface UserRoleDto {
  id: string;
  name: string;
  permissions: PermissionDto[];
}

export interface OkResponseDto {
  data: object;
}

export interface ProfileDto {
  firstName: string;
  lastName: string;
  photoUrl: string;
  languageId: "EN_MY" | "EN_US" | "EN_GB" | "ZH_CN" | "ZH_MY";
}

export interface UserEntity {
  id: string;
  email: string;
  profile: ProfileDto;
  /** @format date-time */
  createdAt: string;
}

export interface CreateUserDto {
  email: string;
  providerAccountId: string;
  firstName: string;
  lastName: string;
}

export interface VerifyEmailDto {
  email: string;
}

export interface CreateProfileDto {
  companyName?: string;
  firstName: string;
  lastName: string;
  languageId: "EN_MY" | "EN_US" | "EN_GB" | "ZH_CN" | "ZH_MY";
}

export interface UpdateProfileDto {
  companyName?: string;
  firstName?: string;
  lastName?: string;
  languageId?: "EN_MY" | "EN_US" | "EN_GB" | "ZH_CN" | "ZH_MY";
}

export interface PaginationDto {
  nextPage: number;
  previousPage: number;
  totalPages: number;
  totalItems: number;
  currentPage: number;
  pageSize: number;
}

export interface PaginatedOkResponse {
  data: object;
  pagination: PaginationDto;
}

export interface CompanyEntity {
  id: string;
  name: string;
}

export interface TagDto {
  id: string;
  name: string;
}

export interface MediaDto {
  id: string;
  url: string;
  caption?: string;
  mimeType: string;
  /** @format date-time */
  createdAt: string;
}

export interface PageDto {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  /** @format date-time */
  publishDate: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  editorVersion: number;
  description?: string;
}

export interface AdvertiserCommissionRowDto {
  id: string;
  name: string;
  commission: number;
  calculatedCommission: number;
  type: "Percentage" | "Fixed";
  advertiserCommissionId: string;
}

export interface AdvertiserCommissionDto {
  id: string;
  commission: number;
  calculatedCommission: number;
  commissionRows: AdvertiserCommissionRowDto[];
  dayToValidate: number;
  dayToPayout: number;
  url: string;
}

export interface AdvertiserDto {
  id: string;
  name: string;
  slug: string;
  logo: MediaDto;
  description: string;
  campaigns: string[];
  commission: AdvertiserCommissionDto;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface CreateAdvertiserClickResponseDto {
  url: string;
}

export interface AffiliateProviderDto {
  id: string;
  name: string;
}

export interface CreateAffiliateProviderDto {
  name: string;
  id: number;
}

export interface UpdateAffiliateProviderDto {
  name?: string;
  id?: number;
}

export interface UserAdvertiserClickAdvertiserDto {
  name: string;
}

export interface UserAdvertiserClickDto {
  id: string;
  advertiser: UserAdvertiserClickAdvertiserDto;
  /** @format date-time */
  clickedAt: string;
}

export interface UserCashbackAdvertiserDto {
  id: string;
  name: string;
}

export interface UserCashbackDto {
  id: string;
  advertiser: UserCashbackAdvertiserDto;
  advertiserOrderId: string;
  netAmount: number;
  statusId: "Pending" | "Approved" | "Rejected";
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface PendingBalanceDto {
  pendingBalance: string;
}

export interface AdvertiserCampaignMetadataDto {
  name: string;
  description?: string;
  banner?: MediaDto;
}

export interface AdvertiserCampaignDto {
  id: string;
  advertiserId: string;
  providerReferenceId: string;
  providerId: string;
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string;
  statusId: "Inactive" | "Active";
  url: string;
  slug: string;
  metadatas: AdvertiserCampaignMetadataDto[];
}

export interface CreateAdvertiserCampaignMetadataDto {
  name: string;
  description?: string;
  bannerFilePath?: string;
  bannerFileMimeType?: string;
  languageId: "EN_MY" | "EN_US" | "EN_GB" | "ZH_CN" | "ZH_MY";
}

export interface CreateAdvertiserCampaignDto {
  advertiserId: string;
  providerReferenceId: string;
  providerId: "InvolveAsia";
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string;
  statusId: "Inactive" | "Active";
  url: string;
  slug: string;
  voucherCodes?: string[];
  metadatas: CreateAdvertiserCampaignMetadataDto[];
}

export interface ProcessUserCashbackDto {
  userClickId: string;
  providerReferenceId: string;
  status: string;
  advertiserOrderId: string;
  currencyId: "MYR" | "SGD" | "USD";
  amount: number;
  date: string;
}

export interface SendEmailResponseDto {
  emailLogId: string;
}

export interface SendEmailDto {
  emailLogId?: string;
  userId?: string;
  subject?: string;
  htmlContent?: string;
}

export interface CustomSendEmailDto {
  email: string;
  providerAccountId: string;
  encryptedCode?: string;
}

export interface UpdateEmailStatusDto {
  email?: string;
  messageId: string;
  status:
    | "ACCEPTED"
    | "PENDING"
    | "FAILED"
    | "DELIVERED"
    | "BOUNCED"
    | "SOFT_BOUNCED"
    | "COMPLAINT"
    | "REJECTED";
}

export interface WalletDto {
  id: string;
  currencyCode: string;
  balance: string;
}

export interface UserWithdrawalDto {
  id: string;
  amount: number;
  statusId: "Pending" | "Completed" | "Rejected" | "Canceled";
  /** @format date-time */
  createdAt: string;
  paymentMethod: UserWithdrawalPaymentMethodDto;
}

export interface CreateUserWithdrawalDto {
  amount: number;
  userPaymentMethodId: string;
}

export interface UserPaymentMethodPaymentChannelDto {
  id: string;
  name: string;
  logo?: MediaDto;
  minAmount: number;
  maxAmount: number;
}

export interface UserPaymentMethodDto {
  id: string;
  paymentChannel: UserPaymentMethodPaymentChannelDto;
  direction: "Deposit" | "Withdrawal" | "Both";
  accountName: string;
  accountNumber: string;
}

export interface CreateUserPaymentMethodDto {
  paymentChannelId: string;
  direction: "Deposit" | "Withdrawal" | "Both";
  accountName: string;
  accountNumber?: string;
  swiftCode?: string;
  paypalEmail?: string;
  isDefault?: boolean;
  extra?: object;
}

export type DeletePaymentMethodResponseDto = object;

export interface PaymentChannelDto {
  id: string;
  name: string;
  type: string;
  direction: string;
  logo?: MediaDto;
}

export interface UserWithdrawalPaymentMethodPaymentChannelDto {
  id: string;
  name: string;
  type: "BankTransfer";
  direction: "Deposit" | "Withdrawal" | "Both";
}

export interface UserWithdrawalPaymentMethodDto {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  paypalEmail: string;
  isDefault: boolean;
  paymentChannel: UserWithdrawalPaymentMethodPaymentChannelDto;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      return data;
    });
  };
}

/**
 * @title API Services
 * @version 1.0.0
 * @contact
 *
 * The API Services
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  roles = {
    /**
     * No description
     *
     * @tags Role
     * @name GetUserRolesAndPermissions
     * @request GET:/roles/me
     * @secure
     */
    getUserRolesAndPermissions: (params: RequestParams = {}) =>
      this.request<
        PaginatedOkResponse & {
          data: UserRoleDto[];
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/roles/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  s2S = {
    /**
     * No description
     *
     * @tags AuthS2S
     * @name CreateUser
     * @request POST:/s2s/auth/createUser
     * @secure
     */
    createUser: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: UserEntity;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/s2s/auth/createUser`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AuthS2S
     * @name VerifyEmail
     * @request POST:/s2s/auth/verifyEmail
     * @secure
     */
    verifyEmail: (data: VerifyEmailDto, params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: UserEntity;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/s2s/auth/verifyEmail`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AdvertiserCampaign
     * @name GetAdvertiserCampaign
     * @request GET:/s2s/affiliate/advertisers/campaigns
     * @secure
     */
    getAdvertiserCampaign: (
      query: {
        providerReferenceId: string;
        providerId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        OkResponseDto & {
          data: AdvertiserCampaignDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/s2s/affiliate/advertisers/campaigns`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AdvertiserCampaign
     * @name CreateAdvertiserCampaign
     * @request POST:/s2s/affiliate/advertisers/campaigns
     * @secure
     */
    createAdvertiserCampaign: (
      data: CreateAdvertiserCampaignDto,
      params: RequestParams = {},
    ) =>
      this.request<
        OkResponseDto & {
          data: AdvertiserCampaignDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/s2s/affiliate/advertisers/campaigns`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AdvertiserCampaign
     * @name DeleteAdvertiserCampaign
     * @request DELETE:/s2s/affiliate/advertisers/campaigns/{id}
     * @secure
     */
    deleteAdvertiserCampaign: (id: string, params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: AdvertiserCampaignDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/s2s/affiliate/advertisers/campaigns/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AffiliateS2S
     * @name ProcessUserCashback
     * @request POST:/s2s/affiliate/cashback
     * @secure
     */
    processUserCashback: (
      data: ProcessUserCashbackDto,
      params: RequestParams = {},
    ) =>
      this.request<
        OkResponseDto & {
          data: UserCashbackDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/s2s/affiliate/cashback`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags EmailS2S
     * @name SendEmail
     * @request POST:/s2s/email
     * @secure
     */
    sendEmail: (data: SendEmailDto, params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: SendEmailResponseDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/s2s/email`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags EmailS2S
     * @name UpdateEmailStatus
     * @request PUT:/s2s/email
     * @secure
     */
    updateEmailStatus: (
      data: UpdateEmailStatusDto,
      params: RequestParams = {},
    ) =>
      this.request<
        OkResponseDto & {
          data: SendEmailResponseDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/s2s/email`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags EmailS2S
     * @name SendUserSignUpWelcomeEmail
     * @request POST:/s2s/email/sendUserSignUpWelcomeEmail
     * @secure
     */
    sendUserSignUpWelcomeEmail: (
      data: CustomSendEmailDto,
      params: RequestParams = {},
    ) =>
      this.request<
        OkResponseDto & {
          data: SendEmailResponseDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/s2s/email/sendUserSignUpWelcomeEmail`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags EmailS2S
     * @name SendForgotPasswordEmail
     * @request POST:/s2s/email/sendForgotPasswordEmail
     * @secure
     */
    sendForgotPasswordEmail: (
      data: CustomSendEmailDto,
      params: RequestParams = {},
    ) =>
      this.request<
        OkResponseDto & {
          data: SendEmailResponseDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/s2s/email/sendForgotPasswordEmail`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags EmailS2S
     * @name ProcessEmailQueue
     * @request POST:/s2s/email/process
     * @secure
     */
    processEmailQueue: (data: SendEmailDto, params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: SendEmailResponseDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/s2s/email/process`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  profiles = {
    /**
     * No description
     *
     * @tags Profile
     * @name CreateProfile
     * @request POST:/profiles
     * @secure
     */
    createProfile: (data: CreateProfileDto, params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: {
            company: CompanyEntity;
            profile: ProfileDto;
          };
        },
        any
      >({
        path: `/profiles`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name GetMyProfile
     * @request GET:/profiles/me
     * @secure
     */
    getMyProfile: (params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: ProfileDto;
        },
        any
      >({
        path: `/profiles/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name UpdateMyProfile
     * @request PATCH:/profiles/me
     * @secure
     */
    updateMyProfile: (data: UpdateProfileDto, params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: ProfileDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/profiles/me`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  companies = {
    /**
     * No description
     *
     * @tags Company User
     * @name GetMyCompanyUsers
     * @request GET:/companies/me/users
     * @secure
     */
    getMyCompanyUsers: (
      query?: {
        page?: number;
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedOkResponse & {
          data?: UserEntity[];
        },
        any
      >({
        path: `/companies/me/users`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  company = {
    /**
     * No description
     *
     * @tags Company
     * @name GetMyCompany
     * @request GET:/company/me
     * @secure
     */
    getMyCompany: (params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: CompanyEntity;
        },
        any
      >({
        path: `/company/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  tags = {
    /**
     * No description
     *
     * @tags Tags
     * @name GetTags
     * @request GET:/tags
     */
    getTags: (
      query?: {
        name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedOkResponse & {
          data: TagDto[];
        },
        any
      >({
        path: `/tags`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  media = {
    /**
     * No description
     *
     * @tags Media
     * @name UploadMedia
     * @request POST:/media
     * @secure
     */
    uploadMedia: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        OkResponseDto & {
          data: MediaDto;
        },
        any
      >({
        path: `/media`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  page = {
    /**
     * No description
     *
     * @tags Page
     * @name GetPageBySlug
     * @request GET:/page/slug/{slug}
     */
    getPageBySlug: (slug: string, params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: PageDto;
        },
        any
      >({
        path: `/page/slug/${slug}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  affiliate = {
    /**
     * No description
     *
     * @tags Affiliate
     * @name GetPopularAdvertisers
     * @request GET:/affiliate/advertisers/popular
     * @secure
     */
    getPopularAdvertisers: (params: RequestParams = {}) =>
      this.request<
        PaginatedOkResponse & {
          data: AdvertiserDto[];
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/affiliate/advertisers/popular`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliate
     * @name GetAdvertiser
     * @request GET:/affiliate/advertisers/{id}
     * @secure
     */
    getAdvertiser: (id: string, params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: AdvertiserDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/affiliate/advertisers/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliate
     * @name GetAdvertiserBySlug
     * @request GET:/affiliate/advertisers/slug/{slug}
     * @secure
     */
    getAdvertiserBySlug: (slug: string, params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: AdvertiserDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/affiliate/advertisers/slug/${slug}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliate
     * @name CreateUserAdvertiserClick
     * @request POST:/affiliate/advertisers/{id}/click
     * @secure
     */
    createUserAdvertiserClick: (id: string, params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: CreateAdvertiserClickResponseDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/affiliate/advertisers/${id}/click`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliate
     * @name GetAllAdvertisers
     * @request GET:/affiliate/advertisers
     * @secure
     */
    getAllAdvertisers: (
      query: {
        page: number;
        pageSize: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedOkResponse & {
          data: AdvertiserDto[];
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/affiliate/advertisers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliate
     * @name CreateProvider
     * @request POST:/affiliate/providers
     * @secure
     */
    createProvider: (
      data: CreateAffiliateProviderDto,
      params: RequestParams = {},
    ) =>
      this.request<
        OkResponseDto & {
          data: AffiliateProviderDto;
        },
        any
      >({
        path: `/affiliate/providers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliate
     * @name GetAllProviders
     * @request GET:/affiliate/providers
     * @secure
     */
    getAllProviders: (params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: AffiliateProviderDto[];
        },
        any
      >({
        path: `/affiliate/providers`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliate
     * @name GetProvider
     * @request GET:/affiliate/providers/{id}
     * @secure
     */
    getProvider: (id: string, params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: AffiliateProviderDto;
        },
        any
      >({
        path: `/affiliate/providers/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliate
     * @name UpdateProvider
     * @request PATCH:/affiliate/providers/{id}
     * @secure
     */
    updateProvider: (
      id: string,
      data: UpdateAffiliateProviderDto,
      params: RequestParams = {},
    ) =>
      this.request<
        OkResponseDto & {
          data: AffiliateProviderDto;
        },
        any
      >({
        path: `/affiliate/providers/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliate
     * @name DeleteProvider
     * @request DELETE:/affiliate/providers/{id}
     * @secure
     */
    deleteProvider: (id: string, params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: AffiliateProviderDto;
        },
        any
      >({
        path: `/affiliate/providers/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliate
     * @name GetMyClicks
     * @request GET:/affiliate/user-clicks/me
     * @secure
     */
    getMyClicks: (
      query: {
        page: number;
        pageSize: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedOkResponse & {
          data: UserAdvertiserClickDto[];
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/affiliate/user-clicks/me`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliate
     * @name GetMyCashbacks
     * @request GET:/affiliate/cashback/me
     * @secure
     */
    getMyCashbacks: (
      query: {
        page: number;
        pageSize: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedOkResponse & {
          data: UserCashbackDto[];
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/affiliate/cashback/me`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliate
     * @name GetPendingBalance
     * @request GET:/affiliate/cashback/pending-balance
     * @secure
     */
    getPendingBalance: (params: RequestParams = {}) =>
      this.request<
        OkResponseDto & {
          data: PendingBalanceDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/affiliate/cashback/pending-balance`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  wallet = {
    /**
     * No description
     *
     * @tags Wallet
     * @name GetWalletByCurrencyCode
     * @request GET:/wallet/{currencyCode}
     * @secure
     */
    getWalletByCurrencyCode: (
      currencyCode: string,
      params: RequestParams = {},
    ) =>
      this.request<
        OkResponseDto & {
          data: WalletDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/wallet/${currencyCode}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallet
     * @name CreateUserWithdrawal
     * @request POST:/wallet/{userWalletId}/withdrawals
     * @secure
     */
    createUserWithdrawal: (
      userWalletId: string,
      data: CreateUserWithdrawalDto,
      params: RequestParams = {},
    ) =>
      this.request<
        OkResponseDto & {
          data: UserWithdrawalDto;
        },
        {
          error: {
            message:
              | "invalidWallet"
              | "invalidPaymentMethod"
              | "insufficientBalance"
              | "exceedMaximumAmount"
              | "belowMinimumAmount"
              | "unsupportedCurrency";
          };
        }
      >({
        path: `/wallet/${userWalletId}/withdrawals`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  paymentMethods = {
    /**
     * No description
     *
     * @tags PaymentMethod
     * @name GetMyPaymentMethods
     * @request GET:/payment-methods/me
     * @secure
     */
    getMyPaymentMethods: (
      query?: {
        paymentChannelType?: "BankTransfer";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedOkResponse & {
          data: UserPaymentMethodDto[];
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/payment-methods/me`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PaymentMethod
     * @name CreateUserPaymentMethod
     * @request POST:/payment-methods
     * @secure
     */
    createUserPaymentMethod: (
      data: CreateUserPaymentMethodDto,
      params: RequestParams = {},
    ) =>
      this.request<
        OkResponseDto & {
          data: UserPaymentMethodDto;
        },
        {
          error: {
            message:
              | "invalidPaymentChannel"
              | "invalidPaymentDirection"
              | "exceedNumOfUserPaymentMethod";
          };
        }
      >({
        path: `/payment-methods`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PaymentMethod
     * @name DeletePaymentMethod
     * @request DELETE:/payment-methods/{paymentMethodId}
     * @secure
     */
    deletePaymentMethod: (
      paymentMethodId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        OkResponseDto & {
          data: DeletePaymentMethodResponseDto;
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/payment-methods/${paymentMethodId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  paymentChannels = {
    /**
     * No description
     *
     * @tags PaymentChannel
     * @name GetActivePaymentChannels
     * @request GET:/payment-channels
     * @secure
     */
    getActivePaymentChannels: (params: RequestParams = {}) =>
      this.request<
        PaginatedOkResponse & {
          data: PaymentChannelDto[];
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/payment-channels`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  withdrawals = {
    /**
     * No description
     *
     * @tags Withdrawal
     * @name GetUserWithdrawals
     * @request GET:/withdrawals
     * @secure
     */
    getUserWithdrawals: (
      query: {
        page: number;
        pageSize: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedOkResponse & {
          data: UserWithdrawalDto[];
        },
        {
          error: {
            message: "unknownError";
          };
        }
      >({
        path: `/withdrawals`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
