'use client';

import { SiteSettingsForm } from './site-settings-form';

interface SiteSettingsSectionProps {
  currentLanguage: string;
  dictionary: {
    settings: {
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
      settingsSaveButton: string;
      settingsUpdateSuccessMessage: string;
      settingsUpdateErrorMessage: string;
    };
  };
}

export const SiteSettingsSection = ({
  currentLanguage,
  dictionary,
}: SiteSettingsSectionProps) => {
  return (
    <SiteSettingsForm
      currentLanguage={currentLanguage}
      dictionary={{
        title: dictionary.settings.title,
        analytics: dictionary.settings.analytics,
        googleAnalyticsId: dictionary.settings.googleAnalyticsId,
        googleTagManagerId: dictionary.settings.googleTagManagerId,
        facebookPixelId: dictionary.settings.facebookPixelId,
        seoSettings: dictionary.settings.seoSettings,
        defaultMetaTitle: dictionary.settings.defaultMetaTitle,
        defaultMetaDescription: dictionary.settings.defaultMetaDescription,
        sitemapUrl: dictionary.settings.sitemapUrl,
        robotsTxt: dictionary.settings.robotsTxt,
        socialMedia: dictionary.settings.socialMedia,
        facebookUrl: dictionary.settings.facebookUrl,
        twitterUrl: dictionary.settings.twitterUrl,
        instagramUrl: dictionary.settings.instagramUrl,
        linkedinUrl: dictionary.settings.linkedinUrl,
        contactInfo: dictionary.settings.contactInfo,
        contactEmail: dictionary.settings.contactEmail,
        supportEmail: dictionary.settings.supportEmail,
        phoneNumber: dictionary.settings.phoneNumber,
        address: dictionary.settings.address,
        featureFlags: dictionary.settings.featureFlags,
        maintenanceMode: dictionary.settings.maintenanceMode,
        maintenanceModeDescription:
          dictionary.settings.maintenanceModeDescription,
        allowUserRegistration: dictionary.settings.allowUserRegistration,
        allowUserRegistrationDescription:
          dictionary.settings.allowUserRegistrationDescription,
        enableComments: dictionary.settings.enableComments,
        enableCommentsDescription:
          dictionary.settings.enableCommentsDescription,
        enableNewsletter: dictionary.settings.enableNewsletter,
        enableNewsletterDescription:
          dictionary.settings.enableNewsletterDescription,
        saveButton: dictionary.settings.settingsSaveButton,
        updateSuccessMessage: dictionary.settings.settingsUpdateSuccessMessage,
        updateErrorMessage: dictionary.settings.settingsUpdateErrorMessage,
      }}
    />
  );
};
