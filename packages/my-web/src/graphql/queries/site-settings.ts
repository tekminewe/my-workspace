import { gql } from '@apollo/client';

export const GET_SITE_SETTINGS = gql`
  query GetSiteSettings {
    siteSettings {
      id
      siteId
      googleAnalyticsId
      googleTagManagerId
      facebookPixelId
      defaultMetaTitle
      defaultMetaDescription
      sitemapUrl
      robotsTxt
      facebookUrl
      twitterUrl
      instagramUrl
      linkedinUrl
      contactEmail
      supportEmail
      phoneNumber
      address
      maintenanceMode
      allowUserRegistration
      enableComments
      enableNewsletter
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_SITE_SETTINGS = gql`
  mutation UpdateSiteSettings($input: UpdateSiteSettingsInput!) {
    updateSiteSettings(input: $input) {
      id
      siteId
      googleAnalyticsId
      googleTagManagerId
      facebookPixelId
      defaultMetaTitle
      defaultMetaDescription
      sitemapUrl
      robotsTxt
      facebookUrl
      twitterUrl
      instagramUrl
      linkedinUrl
      contactEmail
      supportEmail
      phoneNumber
      address
      maintenanceMode
      allowUserRegistration
      enableComments
      enableNewsletter
      createdAt
      updatedAt
    }
  }
`;
