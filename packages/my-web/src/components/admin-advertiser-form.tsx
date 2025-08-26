'use client';

import { Dictionary } from '@/dictionaries';
import {
  AdminUpdateAdvertiserCommissionMutation,
  AdminUpdateAdvertiserMutation,
  AdminUpdateAdvertiserProviderReferenceMutation,
  AdvertiserCommissionRowStatusEnum,
  AdvertiserCommissionStatusEnum,
  AdvertiserCommissionTypeEnum,
  AdvertiserStatusEnum,
  AffiliateProviderEnum,
  LanguageEnum,
  AdvertiserCategoryEnum,
} from '@/services/graphql';
import { useAdvertiserCategories } from '@/hooks/use-advertiser-categories';
import { ApolloError, gql, useMutation } from '@apollo/client';
import { Card } from '@tekminewe/mint-ui/card';
import { Callout } from '@tekminewe/mint-ui/callout';
import { ControlledForm } from '@tekminewe/mint-ui/form';
import { ControlledSelect } from '@tekminewe/mint-ui/select';
import { ControlledSwitch } from '@tekminewe/mint-ui/switch';
import { ControlledTextInput } from '@tekminewe/mint-ui/text-input';
import { Skeleton } from '@tekminewe/mint-ui/skeleton';
import { toast } from '@tekminewe/mint-ui/toast';
import { Title } from '@tekminewe/mint-ui/typography';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { boolean, object, string, array, enum as zenum, coerce } from 'zod';
import { ADMIN_UPDATE_ADVERTISER_PROVIDER_REFERENCE_MUTATION } from '@/graphql/mutations/admin-update-advertiser-provider-reference-mutation';
import { CategoriesField } from './categories-field';

interface CommissionRow {
  id: string;
  providerReferenceId: string;
  commission: number;
  typeId: AdvertiserCommissionTypeEnum;
  statusId: boolean;
  metadatas?: Array<{
    languageId: string;
    name: string;
  }>;
}

interface Commission {
  id: string;
  providerId: AffiliateProviderEnum;
  statusId: boolean;
  commissionRows: CommissionRow[];
}

interface ProviderReference {
  providerId: AffiliateProviderEnum;
  providerReferenceId: string;
}

interface AdvertiserMetadata {
  languageId: LanguageEnum;
  name: string;
}

interface AdvertiserFormState {
  id?: string;
  statusId: boolean;
  slug: string;
  metadatas?: AdvertiserMetadata[];
  commissions: Commission[];
  providerReferences?: ProviderReference[];
  categories?: string[];
}

const UPDATE_ADVERTISER_MUTATION = gql(/* GraphQL */ `
  mutation AdminUpdateAdvertiser($id: String!, $data: UpdateAdvertiserInput!) {
    updateAdvertiser(id: $id, data: $data) {
      id
      name
      slug
      statusId
      logo {
        url
      }
      metadatas {
        languageId
        name
        description
      }
      categories {
        id
        name
        description
      }
    }
  }
`);

const UPDATE_COMMISSION_MUTATION = gql(/* GraphQL */ `
  mutation AdminUpdateAdvertiserCommission(
    $data: UpdateAdvertiserCommissionInput!
  ) {
    updateAdvertiserCommission(data: $data) {
      id
      commission
      commissionRows {
        id
        name
        commission
        typeId
        metadatas {
          languageId
          name
        }
      }
      url
      dayToValidate
      dayToPayout
    }
  }
`);

export const AdminAdvertiserForm = ({
  advertiser,
  dictionary,
  language,
}: {
  language: string;
  advertiser: AdvertiserFormState & { name: string };
  dictionary: Dictionary['admin']['advertiser']['manage'];
}) => {
  const router = useRouter();
  const session = useSession();

  const [updateAdvertiser] = useMutation<AdminUpdateAdvertiserMutation>(
    UPDATE_ADVERTISER_MUTATION,
  );
  const [updateCommission] =
    useMutation<AdminUpdateAdvertiserCommissionMutation>(
      UPDATE_COMMISSION_MUTATION,
    );
  const [updateProviderReference] =
    useMutation<AdminUpdateAdvertiserProviderReferenceMutation>(
      ADMIN_UPDATE_ADVERTISER_PROVIDER_REFERENCE_MUTATION,
    );

  // Fetch categories data
  const { categories, loading: categoriesLoading, error: categoriesError } =
    useAdvertiserCategories(language);

  const schema = useMemo(() => {
    return object({
      id: string().optional(),
      statusId: boolean(),
      slug: string(),
      metadatas: array(
        object({
          languageId: zenum([
            LanguageEnum.EnMy,
            LanguageEnum.EnUs,
            LanguageEnum.EnGb,
            LanguageEnum.ZhCn,
            LanguageEnum.ZhMy,
          ]),
          name: string().min(1),
        }),
      ).optional(),
      commissions: array(
        object({
          id: string(),
          providerId: zenum([
            AffiliateProviderEnum.InvolveAsia,
            // Add other providers as needed
          ]),
          statusId: boolean(),
          commissionRows: array(
            object({
              id: string(),
              providerReferenceId: string(),
              commission: coerce.number().min(0),
              typeId: zenum([
                AdvertiserCommissionTypeEnum.Fixed,
                AdvertiserCommissionTypeEnum.Percentage,
              ]),
              statusId: boolean(),
              metadatas: array(
                object({
                  languageId: string(),
                  name: string().min(1),
                }),
              ).optional(),
            }),
          ),
        }),
      ),
      providerReferences: array(
        object({
          providerId: zenum([
            AffiliateProviderEnum.InvolveAsia,
            // Add other providers as needed
          ]),
          providerReferenceId: string(),
        }),
      ).optional(),
      categories: array(string()).optional(),
    });
  }, []);

  const handleSubmit: SubmitHandler<AdvertiserFormState> = async (data) => {
    try {
      // Update advertiser status, slug, metadatas, and categories
      await updateAdvertiser({
        variables: {
          id: data.id,
          data: {
            statusId: data.statusId
              ? AdvertiserStatusEnum.Active
              : AdvertiserStatusEnum.Inactive,
            slug: data.slug,
            metadatas: data.metadatas?.map((metadata) => ({
              languageId: metadata.languageId,
              name: metadata.name,
            })),
            categoryIds: data.categories?.map(
              (categoryId) => categoryId as AdvertiserCategoryEnum,
            ),
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${session?.data?.accessToken}`,
            'Accept-Language': language,
          },
        },
      });

      // Update commissions
      if (data.commissions && data.commissions.length > 0) {
        for (const commission of data.commissions) {
          await updateCommission({
            variables: {
              data: {
                identifier: {
                  id: commission.id,
                },
                statusId: commission.statusId
                  ? AdvertiserCommissionStatusEnum.Active
                  : AdvertiserCommissionStatusEnum.Inactive,
                providerId: commission.providerId,
                commissionRows: commission.commissionRows.map((row) => {
                  return {
                    providerReferenceId: row.providerReferenceId,
                    typeId: row.typeId,
                    commission: row.commission,
                    statusId: row.statusId
                      ? AdvertiserCommissionRowStatusEnum.Active
                      : AdvertiserCommissionRowStatusEnum.Inactive,
                    metadatas: row.metadatas?.map((metadata) => ({
                      languageId: metadata.languageId as LanguageEnum,
                      name: metadata.name,
                    })),
                  };
                }),
              },
            },
            context: {
              headers: {
                Authorization: `Bearer ${session?.data?.accessToken}`,
                'Accept-Language': language,
              },
            },
          });
        }
      }

      // Update provider references if available
      if (data.providerReferences && data.providerReferences.length > 0) {
        for (const reference of data.providerReferences) {
          await updateProviderReference({
            variables: {
              advertiserId: data.id,
              providerId: reference.providerId,
              providerReferenceId: reference.providerReferenceId,
            },
            context: {
              headers: {
                Authorization: `Bearer ${session?.data?.accessToken}`,
                'Accept-Language': language,
              },
            },
          });
        }
      }

      toast(dictionary.updateSuccessMessage, {
        type: 'success',
      });

      router.push(`/${language}/admin/advertiser`);
    } catch (error) {
      toast((error as ApolloError).message, {
        type: 'error',
      });
    }
  };

  const getProviderDisplayName = (providerId: AffiliateProviderEnum) => {
    switch (providerId) {
      case AffiliateProviderEnum.InvolveAsia:
        return 'Involve Asia';
      default:
        return providerId;
    }
  };

  return (
    <Card>
      <ControlledForm<AdvertiserFormState>
        submitButtonLabel={dictionary.updateAdvertiser}
        schema={schema}
        defaultValues={advertiser}
        onSubmit={handleSubmit}
      >
        <Title>{advertiser.name}</Title>
        <br />
        <ControlledSwitch label={dictionary.statusLabel} name="statusId" />

        {/* Slug field */}
        <div className="mt-4">
          <ControlledTextInput label={dictionary.slugLabel} name="slug" />
        </div>

        {/* Advertiser metadatas for different languages */}
        {advertiser.metadatas && advertiser.metadatas.length > 0 && (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-medium">{dictionary.metadataLabel}</h2>

            {advertiser.metadatas.map((metadata, index) => (
              <div
                key={metadata.languageId}
                className="p-4 border border-neutral-200 rounded-md"
              >
                <h3 className="text-lg font-medium mb-3">
                  {metadata.languageId}
                </h3>

                <ControlledTextInput
                  label={dictionary.commissionNameLabel}
                  name={`metadatas.${index}.name`}
                />
              </div>
            ))}
          </div>
        )}

        {advertiser.commissions?.map((commission, commissionIndex) => (
          <div
            key={commission.id}
            className="space-y-4 mt-6 p-5 border border-neutral-200 rounded-md"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {getProviderDisplayName(commission.providerId)}
              </h3>
              <ControlledSwitch
                label={dictionary.commissionStatusLabel}
                name={`commissions.${commissionIndex}.statusId`}
              />
            </div>

            {commission.commissionRows.map((row, rowIndex) => (
              <div
                key={row.id}
                className="space-y-4 mt-4 p-4 border border-neutral-100 rounded-md bg-neutral-50"
              >
                <h4 className="text-sm font-medium mb-2">
                  {dictionary.commissionNameLabel}
                </h4>

                <ControlledTextInput
                  label={dictionary.providerReferenceIdLabel}
                  name={`commissions.${commissionIndex}.commissionRows.${rowIndex}.providerReferenceId`}
                />

                {/* Display all languages including the current one */}
                <div className="space-y-2">
                  {row.metadatas?.map((metadata, metadataIndex) => (
                    <ControlledTextInput
                      key={metadata.languageId}
                      label={`${metadata.languageId}`}
                      name={`commissions.${commissionIndex}.commissionRows.${rowIndex}.metadatas.${metadataIndex}.name`}
                    />
                  ))}
                </div>

                <ControlledTextInput
                  label={`${dictionary.commissionValueLabel} (%)`}
                  name={`commissions.${commissionIndex}.commissionRows.${rowIndex}.commission`}
                  type="number"
                  step="0.01"
                  min="0"
                />

                <div className="mt-4">
                  <ControlledSelect
                    label={dictionary.commissionTypeLabel}
                    name={`commissions.${commissionIndex}.commissionRows.${rowIndex}.typeId`}
                    options={[
                      {
                        label: dictionary.percentageLabel,
                        value: AdvertiserCommissionTypeEnum.Percentage,
                      },
                      {
                        label: dictionary.fixedLabel,
                        value: AdvertiserCommissionTypeEnum.Fixed,
                      },
                    ]}
                  />
                </div>

                <div className="mt-2">
                  <ControlledSwitch
                    label={dictionary.commissionRowStatusLabel}
                    name={`commissions.${commissionIndex}.commissionRows.${rowIndex}.statusId`}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Provider References Section */}
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-medium">
            {dictionary.providerReferencesLabel}
          </h2>

          {advertiser.providerReferences?.map((reference, index) => (
            <div
              key={reference.providerId}
              className="p-4 border border-neutral-200 rounded-md"
            >
              <h3 className="text-lg font-medium mb-3">
                {getProviderDisplayName(reference.providerId)}
              </h3>

              <ControlledTextInput
                label={dictionary.providerReferenceIdLabel}
                name={`providerReferences.${index}.providerReferenceId`}
              />
            </div>
          ))}
        </div>

        {/* Categories Section */}
        <div className="mt-8 space-y-4">
          {categoriesLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : categoriesError ? (
            <Callout type="error">
              {dictionary.categoriesLoadError}
            </Callout>
          ) : (
            <div className="space-y-4">
              <CategoriesField
                categories={categories}
                name="categories"
                dictionary={dictionary}
              />
            </div>
          )}
        </div>
      </ControlledForm>
    </Card>
  );
};
