'use client';

import { Card } from '@tekminewe/mint-ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@tekminewe/mint-ui/tabs';
import { ControlledTextInput } from '@tekminewe/mint-ui/text-input';
import { ControlledForm } from '@tekminewe/mint-ui/form';
import { ControlledImageInput } from './controlled-image-input';
import { ApolloError, useMutation } from '@apollo/client';
import { toast } from '@tekminewe/mint-ui/toast';
import { UPDATE_SITE } from '@/graphql/mutations/update-site';
import { useSession } from 'next-auth/react';
import { LanguageEnum } from '@/services/graphql';
import { object, string, record } from 'zod';

type Language = {
  id: string;
  name: string;
  code: string;
  shortName: string;
  isSupported: boolean;
  isDefault: boolean;
};

type SiteMetadata = {
  name: string;
  description: string | null;
  logo: {
    id: string;
    url: string;
  } | null;
  darkLogo: {
    id: string;
    url: string;
  } | null;
  languageId: string;
};

type Site = {
  id: string;
  name: string;
  domain: string | null;
  description: string | null;
  logo: {
    id: string;
    url: string;
  } | null;
  metadatas: SiteMetadata[];
  createdAt: string;
  updatedAt: string;
};

type SiteFormValues = {
  domain: string;
  metadatas: Record<
    string,
    {
      name: string;
      description: string;
      logoId: string | null;
      logo: string | null;
      darkLogoId: string | null;
      darkLogo: string | null;
    }
  >;
};

type SiteFormProps = {
  site: Site;
  languages: Language[];
  currentLanguage: string;
  dictionary: {
    title: string;
    domainLabel: string;
    domainPlaceholder: string;
    generalInformation: string;
    tabNameLabel: string;
    tabNamePlaceholder: string;
    tabDescriptionLabel: string;
    tabDescriptionPlaceholder: string;
    tabLogoLabel: string;
    tabLogoDescription: string;
    tabDarkLogoLabel: string;
    tabDarkLogoDescription: string;
    saveButton: string;
    updateSuccessMessage: string;
    updateErrorMessage: string;
    languages: Record<string, string>;
    validation: {
      nameRequired: string;
    };
  };
};

export const SiteForm = ({
  site,
  languages,
  currentLanguage,
  dictionary,
}: SiteFormProps) => {
  const [updateSite] = useMutation(UPDATE_SITE);
  const { data: session } = useSession();

  const initialFormValues: SiteFormValues = {
    domain: site.domain || '',
    metadatas: {},
  };

  languages.forEach((language) => {
    const metadata = site.metadatas.find((m) => m.languageId === language.id);
    initialFormValues.metadatas[language.id] = {
      name: metadata?.name || '',
      description: metadata?.description || '',
      logoId: metadata?.logo?.id || null,
      logo: metadata?.logo?.url || null,
      darkLogoId: metadata?.darkLogo?.id || null,
      darkLogo: metadata?.darkLogo?.url || null,
    };
  });

  const formSchema = object({
    domain: string(),
    metadatas: record(
      string(),
      object({
        name: string().min(1, dictionary.validation.nameRequired),
        description: string(),
        logoId: string().nullable(),
        logo: string().nullable(),
        darkLogoId: string().nullable(),
        darkLogo: string().nullable(),
      }),
    ),
  });

  // Form submission handler
  const handleSubmit = async (data: SiteFormValues) => {
    try {
      const metadatas = Object.keys(data.metadatas).map((languageId) => {
        const metadata = data.metadatas[languageId];
        return {
          languageId: languageId as LanguageEnum,
          name: metadata.name,
          description: metadata.description,
          logoId: metadata.logoId,
          darkLogoId: metadata.darkLogoId,
        };
      });

      // Debug logging
      console.log('Submitting site update:', {
        metadatas,
        formData: data.metadatas,
      });

      const result = await updateSite({
        variables: {
          input: {
            domain: data.domain,
            metadatas,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Accept-Language': currentLanguage,
          },
        },
      });

      console.log('Update site result:', result.data?.updateSite);

      toast(dictionary.updateSuccessMessage, { type: 'success' });
    } catch (error) {
      console.error('Update site error:', error);
      toast((error as ApolloError).message || dictionary.updateErrorMessage, {
        type: 'error',
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      <ControlledForm<SiteFormValues>
        defaultValues={initialFormValues}
        onSubmit={handleSubmit}
        schema={formSchema}
        submitButtonLabel={dictionary.saveButton}
        keepValuesOnSubmit
      >
        {/* General Information Section */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {dictionary.generalInformation}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Configure basic site settings and domain information.
            </p>
          </div>

          <ControlledTextInput
            name="domain"
            label={dictionary.domainLabel}
            placeholder={dictionary.domainPlaceholder}
            className="max-w-lg"
          />
        </Card>

        {/* Language-Specific Content */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Language-Specific Content
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Configure site content and logos for each supported language.
            </p>
          </div>

          <Tabs defaultValue={languages[0]?.id} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              {languages.map((language) => (
                <TabsTrigger key={language.id} value={language.id}>
                  {dictionary.languages[language.id] || language.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {languages.map((language) => (
              <TabsContent
                key={language.id}
                value={language.id}
                className="mt-6"
              >
                <div className="space-y-6">
                  {/* Text Content */}
                  <div className="grid gap-6 lg:grid-cols-3">
                    <ControlledTextInput
                      name={`metadatas.${language.id}.name`}
                      label={dictionary.tabNameLabel}
                      placeholder={dictionary.tabNamePlaceholder}
                    />

                    <div className="lg:col-span-2">
                      <ControlledTextInput
                        name={`metadatas.${language.id}.description`}
                        label={dictionary.tabDescriptionLabel}
                        placeholder={dictionary.tabDescriptionPlaceholder}
                      />
                    </div>
                  </div>

                  {/* Logo Upload Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                      Logo Settings
                    </h3>

                    <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                      <div>
                        <ControlledImageInput
                          name={`metadatas.${language.id}.logo`}
                          label={dictionary.tabLogoLabel}
                          idKey={`metadatas.${language.id}.logoId`}
                          description={dictionary.tabLogoDescription}
                        />
                      </div>

                      <div>
                        <ControlledImageInput
                          name={`metadatas.${language.id}.darkLogo`}
                          label={dictionary.tabDarkLogoLabel}
                          idKey={`metadatas.${language.id}.darkLogoId`}
                          description={dictionary.tabDarkLogoDescription}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </ControlledForm>
    </div>
  );
};
