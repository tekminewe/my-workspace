'use client';

import { useMemo, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  CREATE_BONUS_TYPE,
  UPDATE_BONUS_TYPE,
} from '@/graphql/bonus/admin-bonus-mutations';
import {
  CreateBonusTypeMutation,
  CreateBonusTypeMutationVariables,
  UpdateBonusTypeMutation,
  UpdateBonusTypeMutationVariables,
  BonusTypeCodeEnum,
  BonusTypeStatusEnum,
} from '@/services/graphql';
import { Card } from '@tekminewe/mint-ui/card';
import { ControlledForm } from '@tekminewe/mint-ui/form';
import { ControlledTextInput } from '@tekminewe/mint-ui/text-input';
import { ControlledTextArea } from '@tekminewe/mint-ui/text-area';
import { ControlledRichTextEditor } from '@tekminewe/mint-ui/rich-text-editor';
import { ControlledSelect } from '@tekminewe/mint-ui/select';
import { ControlledDateRangePicker } from '@tekminewe/mint-ui/date-range-picker';
import { toast } from '@tekminewe/mint-ui/toast';
import { object, string, number, enum as enum_, array, any, date } from 'zod';
import { ApolloError } from '@apollo/client';
import { ControlledImageInput } from '@/components/controlled-image-input';
import { LanguageEnum } from '@/services/graphql';

interface BonusTypeMetadataFormData {
  languageId: string; // Changed from LanguageEnum to string to support dynamic languages
  title: string;
  description: string; // JSON string from RichTextEditor
  termsAndConditions: string; // JSON string from RichTextEditor
  featuredImageId?: string;
  featuredImageUrl?: string; // Add URL field for display
  logoId?: string;
  logoUrl?: string; // Add URL field for display
}

interface BonusTypeFormData {
  codeId: BonusTypeCodeEnum;
  version: number;
  statusId: BonusTypeStatusEnum;
  priority: number;
  expiryDays?: number;
  maxUsagePerUser: number;
  effectivePeriod?: {
    from?: Date;
    to?: Date;
  };
  ruleConfig: string;
  metadatas?: BonusTypeMetadataFormData[];
}

const getBonusCodeOptions = () => [
  {
    value: BonusTypeCodeEnum.FirstCashbackMultiplier,
    label: 'First Cashback Multiplier',
  },
  { value: BonusTypeCodeEnum.ReferralBonus, label: 'Referral Bonus' },
  { value: BonusTypeCodeEnum.SeasonalBonus, label: 'Seasonal Bonus' },
  { value: BonusTypeCodeEnum.SpendingThreshold, label: 'Spending Threshold' },
];

const getBonusStatusOptions = () => [
  { value: BonusTypeStatusEnum.Active, label: 'Active' },
  { value: BonusTypeStatusEnum.Draft, label: 'Draft' },
  { value: BonusTypeStatusEnum.Archived, label: 'Archived' },
];

const metadataSchema = object({
  languageId: string().min(1),
  title: string().min(1),
  description: string().refine(
    (val) => val !== undefined && val !== null && val.trim() !== '',
    'Description is required',
  ), // JSON string from RichTextEditor
  termsAndConditions: string().refine(
    (val) => val !== undefined && val !== null && val.trim() !== '',
    'Terms and conditions are required',
  ), // JSON string from RichTextEditor
  featuredImageId: string().optional(),
  featuredImageUrl: string().optional(), // Add URL field validation
  logoId: string().optional(),
  logoUrl: string().optional(), // Add URL field validation
});

const schema = object({
  codeId: enum_([
    BonusTypeCodeEnum.FirstCashbackMultiplier,
    BonusTypeCodeEnum.ReferralBonus,
    BonusTypeCodeEnum.SeasonalBonus,
    BonusTypeCodeEnum.SpendingThreshold,
  ]),
  version: number().min(1),
  statusId: enum_([
    BonusTypeStatusEnum.Active,
    BonusTypeStatusEnum.Draft,
    BonusTypeStatusEnum.Archived,
  ]),
  priority: number().min(1),
  expiryDays: number().min(1).optional(),
  maxUsagePerUser: number().min(1),
  effectivePeriod: object({
    from: date().optional(),
    to: date().optional(),
  }).optional(),
  ruleConfig: string().min(1),
  metadatas: array(metadataSchema).optional(),
});

interface AdminBonusTypeFormProps {
  /**
   * Dictionary for translations
   * @example { admin: { bonuses: { createBonusType: "Create Bonus Type" } } }
   */
  dictionary: any;
  /**
   * Language code for localization
   * @example "en"
   */
  lang: string;
  /**
   * Existing bonus type data for editing
   * @default undefined
   * @example { id: "bonus_123", codeId: "REFERRAL_BONUS", version: 1 }
   */
  bonusType?: any;
  /**
   * Supported languages from the database
   * @example [{ id: "EN_MY", name: "English (Malaysia)" }]
   */
  supportedLanguages: Array<{
    id: string;
    name: string;
    code: string;
    shortName: string;
    isSupported: boolean;
    isDefault: boolean;
  }>;
  /**
   * Callback function called after successful form submission
   * @default undefined
   */
  onSuccess?: () => void;
}

export const AdminBonusTypeForm = ({
  dictionary,
  lang,
  bonusType,
  supportedLanguages,
  onSuccess,
}: AdminBonusTypeFormProps) => {
  const router = useRouter();
  const session = useSession();

  const [createBonusType] = useMutation<
    CreateBonusTypeMutation,
    CreateBonusTypeMutationVariables
  >(CREATE_BONUS_TYPE);

  const [updateBonusType] = useMutation<
    UpdateBonusTypeMutation,
    UpdateBonusTypeMutationVariables
  >(UPDATE_BONUS_TYPE);

  const isEditing = !!bonusType;

  // Convert passed languages to options format
  const languageOptions = useMemo(() => {
    return supportedLanguages.map((lang) => ({
      value: lang.id,
      label: lang.name,
    }));
  }, [supportedLanguages]);

  // Helper function to get default metadata for all supported languages
  const getDefaultValues = useCallback(
    (bonusType?: any): BonusTypeFormData => {
      if (!supportedLanguages || supportedLanguages.length === 0) {
        return {
          codeId:
            bonusType?.codeId ?? BonusTypeCodeEnum.FirstCashbackMultiplier,
          version: bonusType?.version ?? 1,
          statusId: bonusType?.statusId ?? BonusTypeStatusEnum.Active,
          priority: bonusType?.priority ?? 1,
          expiryDays: bonusType?.expiryDays ?? undefined,
          maxUsagePerUser: bonusType?.maxUsagePerUser ?? 1,
          effectivePeriod: {
            from: bonusType?.effectiveFrom
              ? new Date(bonusType.effectiveFrom)
              : undefined,
            to: bonusType?.effectiveTo
              ? new Date(bonusType.effectiveTo)
              : undefined,
          },
          ruleConfig: bonusType?.ruleConfig ?? '{}',
          metadatas: [],
        };
      }

      const defaultMetadata = supportedLanguages.map((lang) => {
        const existingMetadata = bonusType?.metadatas?.find(
          (m: any) => m.languageId === lang.id,
        );
        return {
          languageId: lang.id,
          title: existingMetadata?.title ?? '',
          description: existingMetadata?.description
            ? typeof existingMetadata.description === 'string'
              ? existingMetadata.description
              : JSON.stringify(existingMetadata.description)
            : '',
          termsAndConditions: existingMetadata?.termsAndConditions
            ? typeof existingMetadata.termsAndConditions === 'string'
              ? existingMetadata.termsAndConditions
              : JSON.stringify(existingMetadata.termsAndConditions)
            : '',
          featuredImageId: existingMetadata?.featuredImageId ?? '',
          featuredImageUrl: existingMetadata?.featuredImage?.url ?? '', // Add URL for display
          logoId: existingMetadata?.logoId ?? '',
          logoUrl: existingMetadata?.logo?.url ?? '', // Add URL for display
        };
      });

      return {
        codeId: bonusType?.codeId ?? BonusTypeCodeEnum.FirstCashbackMultiplier,
        version: bonusType?.version ?? 1,
        statusId: bonusType?.statusId ?? BonusTypeStatusEnum.Active,
        priority: bonusType?.priority ?? 1,
        expiryDays: bonusType?.expiryDays ?? undefined,
        maxUsagePerUser: bonusType?.maxUsagePerUser ?? 1,
        effectivePeriod: {
          from: bonusType?.effectiveFrom
            ? new Date(bonusType.effectiveFrom)
            : undefined,
          to: bonusType?.effectiveTo
            ? new Date(bonusType.effectiveTo)
            : undefined,
        },
        ruleConfig: bonusType?.ruleConfig ?? '{}',
        metadatas: defaultMetadata,
      };
    },
    [bonusType, supportedLanguages],
  );

  const bonusCodeOptions = useMemo(() => getBonusCodeOptions(), []);
  const bonusStatusOptions = useMemo(() => getBonusStatusOptions(), []);
  const defaultValues = useMemo(
    () => getDefaultValues(bonusType),
    [getDefaultValues, bonusType],
  );

  const handleSubmit = useCallback(
    async (values: BonusTypeFormData) => {
      // For updates, we need to include all metadata even if text fields are empty
      // to preserve/update image IDs
      const processedMetadatas = isEditing
        ? values.metadatas?.map((metadata) => ({
            languageId: metadata.languageId as LanguageEnum,
            title: metadata.title || '', // Allow empty strings for updates
            description: metadata.description || '',
            termsAndConditions: metadata.termsAndConditions || '',
            ...(metadata.featuredImageId && {
              featuredImageId: metadata.featuredImageId,
            }),
            ...(metadata.logoId && { logoId: metadata.logoId }),
          }))
        : values.metadatas
            ?.filter((metadata) => {
              // Check if the JSON strings have actual content (not just empty rich text)
              const hasDescription =
                metadata.description && metadata.description.trim() !== '';
              const hasTerms =
                metadata.termsAndConditions &&
                metadata.termsAndConditions.trim() !== '';
              return metadata.title.trim() && hasDescription && hasTerms;
            })
            .map((metadata) => ({
              languageId: metadata.languageId as LanguageEnum,
              title: metadata.title,
              description: metadata.description || '',
              termsAndConditions: metadata.termsAndConditions || '',
              ...(metadata.featuredImageId && {
                featuredImageId: metadata.featuredImageId,
              }),
              ...(metadata.logoId && { logoId: metadata.logoId }),
            }));

      const baseData = {
        version: values.version,
        statusId: values.statusId,
        priority: values.priority,
        expiryDays: values.expiryDays || null,
        maxUsagePerUser: values.maxUsagePerUser,
        effectiveFrom: values.effectivePeriod?.from
          ? values.effectivePeriod.from.toISOString()
          : null,
        effectiveTo: values.effectivePeriod?.to
          ? values.effectivePeriod.to.toISOString()
          : null,
        ruleConfig: values.ruleConfig,
        ...(processedMetadatas?.length && { metadatas: processedMetadatas }),
      };

      const requestContext = {
        headers: {
          Authorization: `Bearer ${session?.data?.accessToken}`,
          'Accept-Language': lang,
        },
      };

      const successToastConfig = {
        type: 'success' as const,
      };

      const errorToastConfig = {
        type: 'error' as const,
      };

      try {
        if (isEditing) {
          await updateBonusType({
            variables: {
              id: bonusType.id,
              input: baseData, // Use baseData without codeId for updates
            },
            context: requestContext,
          });

          toast(
            dictionary?.admin?.bonuses?.updateSuccess ||
              'Bonus type updated successfully',
            successToastConfig,
          );
        } else {
          const createData = {
            codeId: values.codeId,
            ...baseData,
          };

          await createBonusType({
            variables: {
              input: createData, // Use createData with codeId for creation
            },
            context: requestContext,
          });

          toast(
            dictionary?.admin?.bonuses?.createSuccess ||
              'Bonus type created successfully',
            successToastConfig,
          );
        }

        // Navigate back to list or use callback
        if (onSuccess) {
          onSuccess();
        } else {
          router.push(`/${lang}/admin/bonus`);
        }
      } catch (error) {
        toast((error as ApolloError).message, errorToastConfig);
      }
    },
    [
      createBonusType,
      updateBonusType,
      bonusType,
      isEditing,
      session?.data?.accessToken,
      lang,
      dictionary?.admin?.bonuses?.updateSuccess,
      dictionary?.admin?.bonuses?.createSuccess,
      onSuccess,
      router,
    ],
  );

  // Show error state if no languages are available
  if (!supportedLanguages || supportedLanguages.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600">
            No supported languages available. Please check system configuration.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <ControlledForm<any>
        schema={schema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <h2 className="text-lg font-semibold">
          {isEditing
            ? dictionary?.admin?.bonuses?.editBonusType || 'Edit Bonus Type'
            : dictionary?.admin?.bonuses?.createBonusType ||
              'Create Bonus Type'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ControlledSelect
            name="codeId"
            label={dictionary?.admin?.bonuses?.code || 'Code'}
            options={bonusCodeOptions}
            required
          />

          <ControlledTextInput
            name="version"
            label={dictionary?.admin?.bonuses?.version || 'Version'}
            type="number"
            required
          />

          <ControlledSelect
            name="statusId"
            label={dictionary?.admin?.bonuses?.status || 'Status'}
            options={bonusStatusOptions}
          />

          <ControlledTextInput
            name="priority"
            label={dictionary?.admin?.bonuses?.priority || 'Priority'}
            type="number"
            required
          />

          <ControlledTextInput
            name="expiryDays"
            label={dictionary?.admin?.bonuses?.expiryDays || 'Expiry Days'}
            type="number"
          />

          <ControlledTextInput
            name="maxUsagePerUser"
            label={
              dictionary?.admin?.bonuses?.maxUsagePerUser ||
              'Max Usage Per User'
            }
            type="number"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <ControlledDateRangePicker
            name="effectivePeriod"
            label={
              dictionary?.admin?.bonuses?.effectivePeriod || 'Effective Period'
            }
            placeholder={
              dictionary?.admin?.bonuses?.selectEffectivePeriod ||
              'Select effective period'
            }
            minDate={new Date()}
            clearable
          />
        </div>

        <ControlledTextArea
          name="ruleConfig"
          label={dictionary?.admin?.bonuses?.ruleConfig || 'Rule Configuration'}
          rows={4}
          placeholder="Enter JSON configuration for bonus rules"
          required
        />

        {/* Metadata Section */}
        <div className="space-y-6">
          <h3 className="text-md font-medium border-b pb-2">
            {dictionary?.admin?.bonuses?.metadata || 'Content & Images'}
          </h3>

          {supportedLanguages.map((language, index) => (
            <Card key={language.id} className="p-4 bg-gray-50">
              <h4 className="font-medium mb-4 text-sm text-gray-700">
                {language.name}
              </h4>

              <div className="grid grid-cols-1 gap-4">
                <ControlledTextInput
                  name={`metadatas.${index}.title`}
                  label={dictionary?.admin?.bonuses?.title || 'Title'}
                  required
                />

                <ControlledRichTextEditor
                  name={`metadatas.${index}.description`}
                  label={
                    dictionary?.admin?.bonuses?.description || 'Description'
                  }
                  placeholder="Enter bonus type description..."
                  required
                />

                <ControlledRichTextEditor
                  name={`metadatas.${index}.termsAndConditions`}
                  label={
                    dictionary?.admin?.bonuses?.termsAndConditions ||
                    'Terms & Conditions'
                  }
                  placeholder="Enter terms and conditions..."
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ControlledImageInput
                    name={`metadatas.${index}.featuredImageUrl` as any}
                    idKey={`metadatas.${index}.featuredImageId` as any}
                    label={
                      dictionary?.admin?.bonuses?.featuredImage ||
                      'Featured Image'
                    }
                    description="Upload a featured image for this bonus type"
                  />

                  <ControlledImageInput
                    name={`metadatas.${index}.logoUrl` as any}
                    idKey={`metadatas.${index}.logoId` as any}
                    label={dictionary?.admin?.bonuses?.logo || 'Logo'}
                    description="Upload a logo for this bonus type"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ControlledForm>
    </Card>
  );
};
