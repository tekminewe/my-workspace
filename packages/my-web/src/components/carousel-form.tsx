'use client';

import { ControlledForm, useFormContext } from '@tekminewe/mint-ui/form';
import { ControlledTextInput } from '@tekminewe/mint-ui/text-input';
import { useMemo } from 'react';
import {
  array,
  boolean,
  coerce,
  date,
  object,
  string,
  enum as zenum,
} from 'zod';
import { ControlledDateInput } from '@tekminewe/mint-ui/date-input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@tekminewe/mint-ui/tabs';
import { Card } from '@tekminewe/mint-ui/card';
import { ControlledImageInput } from '@/components/controlled-image-input';
import { ControlledSelect } from '@tekminewe/mint-ui/select';
import { ControlledSwitch } from '@tekminewe/mint-ui/switch';
import { toast } from '@tekminewe/mint-ui/toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Dictionary } from '@/dictionaries';
import {
  AdminCreateCarouselMutation,
  AdminUpdateCarouselMutation,
  CarouselCtaEnum,
  LanguageEnum,
} from '@/services/graphql';
import { ApolloError, gql, useMutation } from '@apollo/client';

const CREATE_MUTATION = gql(/* GraphQL */ `
  mutation AdminCreateCarousel($data: CreateCarouselInput!) {
    createCarousel(data: $data) {
      id
      title
      startDate
      endDate
      status
      cta {
        ... on CarouselCtaLink {
          type
          payload {
            link
          }
        }
        ... on CarouselCtaCashback {
          type
          payload {
            advertiserId
          }
        }
      }
      metadatas {
        image {
          id
          url
        }
        languageId
      }
    }
  }
`);

const UPDATE_MUTATION = gql(/* GraphQL */ `
  mutation AdminUpdateCarousel($id: String!, $data: UpdateCarouselInput!) {
    updateCarousel(id: $id, data: $data) {
      id
      title
      startDate
      endDate
      status
      cta {
        ... on CarouselCtaLink {
          type
          payload {
            link
          }
        }
        ... on CarouselCtaCashback {
          type
          payload {
            advertiserId
          }
        }
      }
      metadatas {
        image {
          id
          url
        }
        languageId
      }
    }
  }
`);

interface CarouselFormState {
  id?: string;
  title: string;
  startDate: Date;
  endDate: Date;
  sortOrder: number;
  ctaType: CarouselCtaEnum;
  ctaPayloadLink?: string;
  ctaPayloadAdvertiserId?: string;
  status: boolean;
  metadatas: {
    imageId: string;
    image: string;
    languageId: string;
  }[];
}

const CtaFields = ({
  advertisers,
  dictionary,
}: {
  advertisers: { name: string; id: string }[];
  dictionary: Dictionary['admin']['carousel']['manage'];
}) => {
  const { watch, trigger } = useFormContext();

  const ctaType = watch('ctaType');
  if (ctaType === CarouselCtaEnum.Link) {
    return (
      <ControlledTextInput
        required
        name="ctaPayloadLink"
        label={dictionary.ctaPayloadLinkLabel}
        placeholder={dictionary.ctaPayloadLinkPlaceholder}
        // onChange={async () => {
        //   // Trigger validation when the field changes
        //   await trigger('ctaPayloadLink');
        // }}
      />
    );
  }

  if (ctaType === CarouselCtaEnum.Cashback) {
    return (
      <ControlledSelect
        required
        clearable={false}
        name="ctaPayloadAdvertiserId"
        label={dictionary.ctaPayloadAdvertiserIdLabel}
        placeholder={dictionary.ctaPayloadAdvertiserIdPlaceholder}
        options={advertisers.map((advertiser) => ({
          label: advertiser.name,
          value: advertiser.id,
        }))}
        // onChange={async () => {
        //   // Trigger validation when the field changes
        //   await trigger('ctaPayloadAdvertiserId');
        // }}
      />
    );
  }

  return null;
};

const CtaTypeSelect = ({
  dictionary,
}: {
  dictionary: Dictionary['admin']['carousel']['manage'];
}) => {
  const { setValue } = useFormContext();

  return (
    <ControlledSelect
      clearable={false}
      name="ctaType"
      label={dictionary.ctaTypeLabel}
      options={[
        { label: dictionary.ctaTypeLink, value: CarouselCtaEnum.Link },
        { label: dictionary.ctaTypeCashback, value: CarouselCtaEnum.Cashback },
      ]}
      onChange={async () => {
        // Reset the CTA fields when the CTA type changes
        setValue('ctaPayloadLink', '', {
          shouldValidate: true,
        });
        setValue('ctaPayloadAdvertiserId', '', {
          shouldValidate: true,
        });
        // Trigger validation to update form state
        // await trigger();
      }}
    />
  );
};

export const CarouselForm = ({
  language,
  languages,
  defaultFormValues,
  advertisers,
  dictionary,
}: {
  language: string;
  languages: {
    id: LanguageEnum;
    name: string;
  }[];
  defaultFormValues?: Partial<CarouselFormState>;
  advertisers: { name: string; id: string }[];
  dictionary: Dictionary['admin']['carousel']['manage'] & Dictionary['common'];
}) => {
  const router = useRouter();
  const session = useSession();
  const [create] = useMutation<AdminCreateCarouselMutation>(CREATE_MUTATION);
  const [update] = useMutation<AdminUpdateCarouselMutation>(UPDATE_MUTATION);

  const schema = useMemo(() => {
    return object({
      id: string().optional(),
      title: string().min(1, dictionary.titleEmptyError),
      startDate: date(),
      endDate: date(),
      sortOrder: coerce.number().min(0, dictionary.sortOrderEmptyError),
      ctaType: zenum([CarouselCtaEnum.Link, CarouselCtaEnum.Cashback]),
      ctaPayloadLink: string().optional(),
      ctaPayloadAdvertiserId: string().optional(),
      status: boolean(),
      metadatas: array(
        object({
          image: string().min(1, dictionary.imageEmptyError),
          imageId: string().min(1, dictionary.imageEmptyError),
          languageId: string().min(1),
        }),
      ),
    }).superRefine((data, ctx) => {
      // Validate CTA payload based on type - using superRefine for better error handling
      if (data.ctaType === CarouselCtaEnum.Link) {
        if (!data.ctaPayloadLink || data.ctaPayloadLink.trim().length === 0) {
          ctx.addIssue({
            code: 'custom',
            message: 'Link URL is required when CTA type is Link',
            path: ['ctaPayloadLink'],
          });
        }
      } else if (data.ctaType === CarouselCtaEnum.Cashback) {
        if (
          !data.ctaPayloadAdvertiserId ||
          data.ctaPayloadAdvertiserId.trim().length === 0
        ) {
          ctx.addIssue({
            code: 'custom',
            message:
              'Advertiser selection is required when CTA type is Cashback',
            path: ['ctaPayloadAdvertiserId'],
          });
        }
      }
    });
  }, [
    dictionary.imageEmptyError,
    dictionary.sortOrderEmptyError,
    dictionary.titleEmptyError,
  ]);

  return (
    <Card>
      <ControlledForm<CarouselFormState>
        schema={schema}
        defaultValues={{
          id: defaultFormValues?.id,
          title: defaultFormValues?.title,
          startDate: defaultFormValues?.startDate ?? new Date(),
          endDate: defaultFormValues?.endDate ?? new Date(),
          ctaType: defaultFormValues?.ctaType ?? CarouselCtaEnum.Link,
          ctaPayloadLink: defaultFormValues?.ctaPayloadLink ?? '',
          ctaPayloadAdvertiserId:
            defaultFormValues?.ctaPayloadAdvertiserId ?? '',
          sortOrder: defaultFormValues?.sortOrder ?? 0,
          status: defaultFormValues?.status ?? false,
          metadatas: languages.map((language) => {
            const metadata = defaultFormValues?.metadatas?.find(
              (metadata) => metadata.languageId === language.id,
            );

            if (metadata) {
              return metadata;
            }

            return {
              image: '',
              languageId: language.id,
            };
          }),
        }}
        onSubmit={async (values) => {
          if (values.id) {
            try {
              await update({
                variables: {
                  id: values.id,
                  data: {
                    title: values.title,
                    startDate: values.startDate.toISOString(),
                    endDate: values.endDate.toISOString(),
                    sortOrder: values.sortOrder,
                    status: values.status ? 'Active' : 'Inactive',
                    ctaType: values.ctaType,
                    ctaPayloadLink: values.ctaPayloadLink,
                    ctaPayloadAdvertiserId: values.ctaPayloadAdvertiserId,
                    metadatas: values.metadatas.map((metadata) => ({
                      imageId: metadata.imageId,
                      languageId: metadata.languageId,
                    })),
                  },
                },
                context: {
                  headers: {
                    Authorization: `Bearer ${session?.data?.accessToken}`,
                    'Accept-Language': language,
                  },
                },
              });

              toast(dictionary.updateSuccessMessage, {
                type: 'success',
              });

              router.push(`/${language}/admin/carousel`);
            } catch (error) {
              toast((error as ApolloError).message, {
                type: 'error',
              });
            }
            return;
          }

          try {
            await create({
              variables: {
                data: {
                  title: values.title,
                  startDate: values.startDate.toISOString(),
                  endDate: values.endDate.toISOString(),
                  sortOrder: values.sortOrder,
                  status: values.status ? 'Active' : 'Inactive',
                  ctaType: values.ctaType,
                  ctaPayloadLink: values.ctaPayloadLink,
                  ctaPayloadAdvertiserId: values.ctaPayloadAdvertiserId,
                  metadatas: values.metadatas.map((metadata) => ({
                    imageId: metadata.imageId,
                    languageId: metadata.languageId,
                  })),
                },
              },
              context: {
                headers: {
                  Authorization: `Bearer ${session?.data?.accessToken}`,
                  'Accept-Language': language,
                },
              },
            });

            toast(dictionary.createSuccessMessage, {
              type: 'success',
            });

            router.push(`/${language}/admin/carousel`);
          } catch (error) {
            toast((error as ApolloError).message, {
              type: 'error',
            });
          }
        }}
      >
        <ControlledTextInput
          required
          name="title"
          label={dictionary.titleLabel}
          placeholder={dictionary.titlePlaceholder}
        />
        <ControlledDateInput
          clearable={false}
          required
          name="startDate"
          label={dictionary.startDateLabel}
        />
        <ControlledDateInput
          clearable={false}
          required
          name="endDate"
          label={dictionary.endDateLabel}
        />
        <CtaTypeSelect dictionary={dictionary} />
        <CtaFields dictionary={dictionary} advertisers={advertisers} />
        <ControlledSwitch label={dictionary.statusLabel} name="status" />
        <Tabs defaultValue={languages[0].id}>
          <TabsList>
            {languages.map((lang) => (
              <TabsTrigger key={lang.id} value={lang.id}>
                {lang.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {languages.map((lang, index) => (
            <TabsContent key={lang.id} value={lang.id} className="space-y-4">
              <ControlledImageInput
                required
                name={`metadatas[${index}].image`}
                label={dictionary.imageLabel}
                description={dictionary.imageDescription}
                idKey={`metadatas[${index}].imageId`}
              />
            </TabsContent>
          ))}
        </Tabs>
        <ControlledTextInput
          type="number"
          name="sortOrder"
          label={dictionary.sortOrderLabel}
          placeholder={dictionary.sortOrderPlaceholder}
        />
      </ControlledForm>
    </Card>
  );
};
