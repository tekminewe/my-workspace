'use client';

import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { object, string, boolean } from 'zod';
import { Button } from '@tekminewe/mint-ui/button';
import { Card } from '@tekminewe/mint-ui/card';
import { ControlledTextInput } from '@tekminewe/mint-ui/text-input';
import { ControlledTextArea } from '@tekminewe/mint-ui/text-area';
import { ControlledSwitch } from '@tekminewe/mint-ui/switch';
import { ControlledImageInput } from '@/components/controlled-image-input';
import { ControlledForm } from '@tekminewe/mint-ui/form';
import { ErrorMessage } from '@tekminewe/mint-ui/error-message';
import { Spinner } from '@tekminewe/mint-ui/spinner';
import { toast } from '@tekminewe/mint-ui/toast';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@tekminewe/mint-ui/tabs';
import {
  GET_SITE_SETTINGS,
  UPDATE_SITE_SETTINGS,
} from '@/graphql/queries/site-settings';
import {
  GetSiteSettingsQuery,
  UpdateSiteSettingsMutation,
  UpdateSiteSettingsMutationVariables,
} from '@/services/graphql';

type SiteSettingsFormValues = {
  // Analytics & Tracking
  googleAnalyticsId: string;
  googleTagManagerId: string;
  facebookPixelId: string;

  // SEO Settings
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  sitemapUrl: string;
  robotsTxt: string;

  // Social Media
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;

  // Contact Information
  contactEmail: string;
  supportEmail: string;
  phoneNumber: string;
  address: string;

  // Feature Flags
  maintenanceMode: boolean;
  allowUserRegistration: boolean;
  enableComments: boolean;
  enableNewsletter: boolean;
};

type SiteSettingsFormProps = {
  currentLanguage: string;
  dictionary: {
    title: string;
    analytics: string;
    googleAnalyticsId: string;
    googleTagManagerId: string;
    facebookPixelId: string;
    seoSettings: string;
    defaultMetaTitle: string;
    defaultMetaDescription: string;
    sitemapUrl: string;
    robotsTxt: string;
    socialMedia: string;
    facebookUrl: string;
    twitterUrl: string;
    instagramUrl: string;
    linkedinUrl: string;
    contactInfo: string;
    contactEmail: string;
    supportEmail: string;
    phoneNumber: string;
    address: string;
    featureFlags: string;
    maintenanceMode: string;
    maintenanceModeDescription: string;
    allowUserRegistration: string;
    allowUserRegistrationDescription: string;
    enableComments: string;
    enableCommentsDescription: string;
    enableNewsletter: string;
    enableNewsletterDescription: string;
    saveButton: string;
    updateSuccessMessage: string;
    updateErrorMessage: string;
  };
};

export const SiteSettingsForm = ({
  currentLanguage,
  dictionary,
}: SiteSettingsFormProps) => {
  const [updateSiteSettings] = useMutation<
    UpdateSiteSettingsMutation,
    UpdateSiteSettingsMutationVariables
  >(UPDATE_SITE_SETTINGS);
  const { data: session } = useSession();

  const { data, loading, error } = useQuery<GetSiteSettingsQuery>(
    GET_SITE_SETTINGS,
    {
      context: {
        headers: {
          'Accept-Language': currentLanguage,
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    },
  );

  const settings = data?.siteSettings;

  const formSchema = object({
    googleAnalyticsId: string(),
    googleTagManagerId: string(),
    facebookPixelId: string(),
    defaultMetaTitle: string(),
    defaultMetaDescription: string(),
    sitemapUrl: string(),
    robotsTxt: string(),
    facebookUrl: string(),
    twitterUrl: string(),
    instagramUrl: string(),
    linkedinUrl: string(),
    contactEmail: string(),
    supportEmail: string(),
    phoneNumber: string(),
    address: string(),
    maintenanceMode: boolean(),
    allowUserRegistration: boolean(),
    enableComments: boolean(),
    enableNewsletter: boolean(),
  });

  const defaultValues: SiteSettingsFormValues = {
    googleAnalyticsId: settings?.googleAnalyticsId || '',
    googleTagManagerId: settings?.googleTagManagerId || '',
    facebookPixelId: settings?.facebookPixelId || '',
    defaultMetaTitle: settings?.defaultMetaTitle || '',
    defaultMetaDescription: settings?.defaultMetaDescription || '',
    sitemapUrl: settings?.sitemapUrl || '',
    robotsTxt: settings?.robotsTxt || '',
    facebookUrl: settings?.facebookUrl || '',
    twitterUrl: settings?.twitterUrl || '',
    instagramUrl: settings?.instagramUrl || '',
    linkedinUrl: settings?.linkedinUrl || '',
    contactEmail: settings?.contactEmail || '',
    supportEmail: settings?.supportEmail || '',
    phoneNumber: settings?.phoneNumber || '',
    address: settings?.address || '',
    maintenanceMode: settings?.maintenanceMode || false,
    allowUserRegistration: settings?.allowUserRegistration || true,
    enableComments: settings?.enableComments || true,
    enableNewsletter: settings?.enableNewsletter || false,
  };

  // Form submission handler
  const handleSubmit = async (data: SiteSettingsFormValues) => {
    try {
      await updateSiteSettings({
        variables: {
          input: {
            googleAnalyticsId: data.googleAnalyticsId,
            googleTagManagerId: data.googleTagManagerId,
            facebookPixelId: data.facebookPixelId,
            defaultMetaTitle: data.defaultMetaTitle,
            defaultMetaDescription: data.defaultMetaDescription,
            sitemapUrl: data.sitemapUrl,
            robotsTxt: data.robotsTxt,
            facebookUrl: data.facebookUrl,
            twitterUrl: data.twitterUrl,
            instagramUrl: data.instagramUrl,
            linkedinUrl: data.linkedinUrl,
            contactEmail: data.contactEmail,
            supportEmail: data.supportEmail,
            phoneNumber: data.phoneNumber,
            address: data.address,
            maintenanceMode: data.maintenanceMode,
            allowUserRegistration: data.allowUserRegistration,
            enableComments: data.enableComments,
            enableNewsletter: data.enableNewsletter,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Accept-Language': currentLanguage,
          },
        },
      });

      toast(dictionary.updateSuccessMessage, { type: 'success' });
    } catch (error) {
      console.error('Error updating site settings:', error);
      toast(dictionary.updateErrorMessage, { type: 'error' });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorMessage title="Error" message="Failed to load site settings" />
    );
  }

  return (
    <ControlledForm defaultValues={defaultValues} onSubmit={handleSubmit}>
      <Tabs defaultValue="analytics">
        <TabsList>
          <TabsTrigger value="analytics">{dictionary.analytics}</TabsTrigger>
          <TabsTrigger value="seo">{dictionary.seoSettings}</TabsTrigger>
          <TabsTrigger value="social">{dictionary.socialMedia}</TabsTrigger>
          <TabsTrigger value="contact">{dictionary.contactInfo}</TabsTrigger>
          <TabsTrigger value="features">{dictionary.featureFlags}</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <Card className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">{dictionary.analytics}</h3>
              <div className="grid grid-cols-1 gap-4">
                <ControlledTextInput
                  name="googleAnalyticsId"
                  label={dictionary.googleAnalyticsId}
                  placeholder="GA-XXXXXXXXX-X"
                />
                <ControlledTextInput
                  name="googleTagManagerId"
                  label={dictionary.googleTagManagerId}
                  placeholder="GTM-XXXXXXX"
                />
                <ControlledTextInput
                  name="facebookPixelId"
                  label={dictionary.facebookPixelId}
                  placeholder="123456789012345"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">{dictionary.seoSettings}</h3>
              <div className="grid grid-cols-1 gap-4">
                <ControlledTextInput
                  name="defaultMetaTitle"
                  label={dictionary.defaultMetaTitle}
                />
                <ControlledTextArea
                  name="defaultMetaDescription"
                  label={dictionary.defaultMetaDescription}
                  rows={3}
                />
                <ControlledTextInput
                  name="sitemapUrl"
                  label={dictionary.sitemapUrl}
                  placeholder="https://example.com/sitemap.xml"
                />
                <ControlledTextArea
                  name="robotsTxt"
                  label={dictionary.robotsTxt}
                  rows={6}
                  placeholder="User-agent: *&#10;Disallow: /admin/"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">{dictionary.socialMedia}</h3>
              <div className="grid grid-cols-1 gap-4">
                <ControlledTextInput
                  name="facebookUrl"
                  label={dictionary.facebookUrl}
                  placeholder="https://facebook.com/yourpage"
                />
                <ControlledTextInput
                  name="twitterUrl"
                  label={dictionary.twitterUrl}
                  placeholder="https://twitter.com/youraccount"
                />
                <ControlledTextInput
                  name="instagramUrl"
                  label={dictionary.instagramUrl}
                  placeholder="https://instagram.com/youraccount"
                />
                <ControlledTextInput
                  name="linkedinUrl"
                  label={dictionary.linkedinUrl}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">{dictionary.contactInfo}</h3>
              <div className="grid grid-cols-1 gap-4">
                <ControlledTextInput
                  name="contactEmail"
                  label={dictionary.contactEmail}
                  placeholder="contact@example.com"
                  type="email"
                />
                <ControlledTextInput
                  name="supportEmail"
                  label={dictionary.supportEmail}
                  placeholder="support@example.com"
                  type="email"
                />
                <ControlledTextInput
                  name="phoneNumber"
                  label={dictionary.phoneNumber}
                  placeholder="+1 (555) 123-4567"
                />
                <ControlledTextArea
                  name="address"
                  label={dictionary.address}
                  rows={3}
                  placeholder="123 Main St&#10;City, State 12345&#10;Country"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">{dictionary.featureFlags}</h3>
              <div className="space-y-4">
                <ControlledSwitch
                  name="maintenanceMode"
                  label={dictionary.maintenanceMode}
                  description={dictionary.maintenanceModeDescription}
                />
                <ControlledSwitch
                  name="allowUserRegistration"
                  label={dictionary.allowUserRegistration}
                  description={dictionary.allowUserRegistrationDescription}
                />
                <ControlledSwitch
                  name="enableComments"
                  label={dictionary.enableComments}
                  description={dictionary.enableCommentsDescription}
                />
                <ControlledSwitch
                  name="enableNewsletter"
                  label={dictionary.enableNewsletter}
                  description={dictionary.enableNewsletterDescription}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button type="submit" className="min-w-[120px]">
          {dictionary.saveButton}
        </Button>
      </div>
    </ControlledForm>
  );
};
