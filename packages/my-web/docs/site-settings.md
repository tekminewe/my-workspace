# Site Settings Management

This document describes how to use the Site Settings feature for managing site-wide configuration and settings.

## Overview

The Site Settings system provides a centralized way to manage site-wide configuration including:

- **📊 Analytics & Tracking**: Google Analytics, GTM, Facebook Pixel IDs
- **🔍 SEO Settings**: Meta tags, sitemap, robots.txt configuration
- **📱 Social Media**: Centralized social media URL management
- **📞 Contact Information**: Centralized contact details
- **⚙️ Feature Flags**: Toggle site features (maintenance, registration, etc.)

## Important Note: Logo Management

**Logo management has been moved to per-language Site Metadata.** Logos are no longer managed through Site Settings.

For logo management documentation, please see: [`site-logo-management.md`](./site-logo-management.md)

## Accessing Site Settings

1. Navigate to **Admin Panel** → **Site** → **Site Settings** tab
2. The form is organized into 5 sections:
   - **Analytics & Tracking**: Configure tracking IDs
   - **SEO Settings**: Manage meta tags and SEO
   - **Social Media**: Set social media URLs
   - **Contact Info**: Manage contact details
   - **Feature Flags**: Toggle site features

## Logo Display in Components

### SiteLogo Component

Use the `SiteLogo` component which now automatically displays per-language logos with theme support:

```tsx
import { SiteLogo } from '@/components/site-logo';

// Displays appropriate logo for current language and theme
<SiteLogo currentLanguage="en-US" />

// With custom styling
<SiteLogo
  currentLanguage="en-US"
  className="h-12 w-auto"
  alt="My Company Logo"
/>
```

The `SiteLogo` component automatically handles:

- **Language selection**: Uses appropriate language metadata
- **Theme switching**: Shows dark logo in dark mode, light logo in light mode
- **Fallback logic**: Falls back to main site logo or text if needed

For detailed logo management documentation, see [`site-logo-management.md`](./site-logo-management.md).

## Backend API

### GraphQL Query

```graphql
query GetSiteSettings {
  siteSettings {
    id
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
```

### GraphQL Mutation

```graphql
mutation UpdateSiteSettings($input: UpdateSiteSettingsInput!) {
  updateSiteSettings(updateSiteSettingsInput: $input) {
    id
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
    updatedAt
  }
}
```

**Note**: Logo fields have been removed from SiteSettings. Use the Site metadata API for logo management.

## Feature Flags Usage

Access feature flags to conditionally render content:

```tsx
const { data } = useQuery(GET_SITE_SETTINGS);

// Maintenance mode check
if (data?.siteSettings?.maintenanceMode) {
  return <MaintenancePage />;
}

// Registration check
const registrationEnabled = data?.siteSettings?.allowUserRegistration;

// Comments check
const commentsEnabled = data?.siteSettings?.enableComments;

// Newsletter check
const newsletterEnabled = data?.siteSettings?.enableNewsletter;
```

## SEO Integration

Use the SEO settings in your layout components:

```tsx
import { useQuery } from '@apollo/client';
import Head from 'next/head';

const SEOHead = ({ customTitle, customDescription }) => {
  const { data } = useQuery(GET_SITE_SETTINGS);

  const title =
    customTitle || data?.siteSettings?.defaultMetaTitle || 'Default Title';
  const description =
    customDescription ||
    data?.siteSettings?.defaultMetaDescription ||
    'Default description';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
};
```

## Analytics Integration

Conditionally load analytics scripts based on settings:

```tsx
import { useQuery } from '@apollo/client';
import Script from 'next/script';

const AnalyticsScripts = () => {
  const { data } = useQuery(GET_SITE_SETTINGS);

  return (
    <>
      {data?.siteSettings?.googleAnalyticsId && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${data.siteSettings.googleAnalyticsId}`}
          strategy="afterInteractive"
        />
      )}

      {data?.siteSettings?.googleTagManagerId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){...})(window,document,'script','dataLayer','${data.siteSettings.googleTagManagerId}');`}
        </Script>
      )}

      {data?.siteSettings?.facebookPixelId && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){...}('${data.siteSettings.facebookPixelId}');`}
        </Script>
      )}
    </>
  );
};
```

## Database Schema

The SiteSettings model supports:

```prisma
model SiteSettings {
  id                      String   @id @default(cuid())

  // Logo settings
  lightLogoId             String?
  lightLogo               Media?   @relation("LightLogo", fields: [lightLogoId], references: [id])
  darkLogoId              String?
  darkLogo                Media?   @relation("DarkLogo", fields: [darkLogoId], references: [id])

  // Analytics & Tracking
  googleAnalyticsId       String   @default("")
  googleTagManagerId      String   @default("")
  facebookPixelId         String   @default("")

  // SEO Settings
  defaultMetaTitle        String   @default("")
  defaultMetaDescription  String   @default("")
  sitemapUrl              String   @default("")
  robotsTxt               String   @default("")

  // Social Media
  facebookUrl             String   @default("")
  twitterUrl              String   @default("")
  instagramUrl            String   @default("")
  linkedinUrl             String   @default("")

  // Contact Information
  contactEmail            String   @default("")
  supportEmail            String   @default("")
  phoneNumber             String   @default("")
  address                 String   @default("")

  // Feature Flags
  maintenanceMode         Boolean  @default(false)
  allowUserRegistration   Boolean  @default(true)
  enableComments          Boolean  @default(true)
  enableNewsletter        Boolean  @default(false)

  // Timestamps
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt

  // Relationships
  site                    Site     @relation(fields: [siteId], references: [id])
  siteId                  String   @unique

  @@map("site_settings")
}
```

## Best Practices

1. **Logo Specifications**:

   - Use SVG format for scalability
   - Ensure logos work well on both light and dark backgrounds
   - Keep file sizes under 5MB
   - Use similar dimensions for both light and dark logos

2. **Theme Consistency**:

   - Test logos in both light and dark themes
   - Ensure sufficient contrast for accessibility
   - Consider using the `SiteLogo` component for automatic theme switching

3. **Feature Flag Strategy**:

   - Use feature flags for gradual rollouts
   - Implement proper fallbacks when features are disabled
   - Document the impact of each feature flag

4. **SEO Considerations**:
   - Provide meaningful default meta titles and descriptions
   - Keep the sitemap URL updated
   - Use proper robots.txt directives

## Troubleshooting

**Logo not displaying**:

- Check if the logo URL is accessible
- Verify the logo was uploaded successfully
- Ensure the SiteLogo component has the correct currentLanguage prop

**Settings not saving**:

- Check network connectivity and authentication
- Verify the GraphQL mutation is being called correctly
- Check the browser console for error messages

**Theme switching not working**:

- Ensure the ThemeProvider is wrapping your app
- Check if both light and dark logos are uploaded
- Verify the useTheme hook is being used correctly
