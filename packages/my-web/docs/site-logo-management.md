# Site Logo Management Documentation

## Overview

This document describes the site logo management system which supports per-language logos with both light and dark mode variants.

## Architecture

### Backend Models

#### SiteMetadata (Prisma Model)

```prisma
model SiteMetadata {
  id          String    @id @default(cuid())
  name        String
  description String?

  // Light mode logo (primary logo)
  logoId      String?
  logo        Media?    @relation("SiteMetadataLogo", fields: [logoId], references: [id])

  // Dark mode logo (optional)
  darkLogoId  String?
  darkLogo    Media?    @relation("SiteMetadataDarkLogo", fields: [darkLogoId], references: [id])

  siteId      String
  site        Site      @relation(fields: [siteId], references: [id], onDelete: Cascade)
  languageId  String
  language    Language  @relation(fields: [languageId], references: [id])

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@unique([siteId, languageId])
}
```

#### Key Changes from Previous Architecture

- **REMOVED**: Logo fields from `SiteSettings` model
- **ADDED**: `darkLogoId` and `darkLogo` fields to `SiteMetadata`
- **MAINTAINED**: Per-language support through `SiteMetadata.languageId`

### GraphQL Schema

#### Queries

- `GET_SITE_WITH_METADATA`: Fetches site with all language metadata including logos
- `GET_SITE_ADMIN`: Admin query that includes both light and dark logos per language

#### Mutations

- `UPDATE_SITE`: Updates site metadata including both `logoId` and `darkLogoId` per language

#### Types

```typescript
type SiteMetadata {
  name: String!
  description: String
  logo: Media
  darkLogo: Media
  languageId: String!
}

input SiteMetadataInput {
  languageId: LanguageEnum!
  name: String!
  description: String
  logoId: String
  darkLogoId: String
}
```

## Frontend Implementation

### Logo Display Component (`SiteLogo`)

The `SiteLogo` component automatically selects the appropriate logo based on:

1. **Current language**: Finds matching `SiteMetadata` by `languageId`
2. **Current theme**: Uses `darkLogo` in dark mode, `logo` otherwise
3. **Fallback logic**:
   - Dark theme: `darkLogo` → `logo` → site.logo → text fallback
   - Light theme: `logo` → site.logo → text fallback

```tsx
<SiteLogo currentLanguage="en-US" className="h-8 w-auto" alt="Site Logo" />
```

### Admin Interface (`SiteForm`)

The admin interface provides per-language logo management:

- **Light Logo**: Primary logo used in light mode and as fallback
- **Dark Logo**: Optional logo specifically for dark mode
- **Multi-language**: Separate logo settings for each supported language
- **Form validation**: Proper form handling with Zod schema validation

#### Form Structure

```tsx
// Form fields per language:
metadatas.{languageId}.logoId        // Light logo ID
metadatas.{languageId}.logo          // Light logo URL (display)
metadatas.{languageId}.darkLogoId    // Dark logo ID
metadatas.{languageId}.darkLogo      // Dark logo URL (display)
```

## Usage Examples

### Display Logo in Components

```tsx
import { SiteLogo } from '@/components/site-logo';

// In any component that needs the logo
<SiteLogo
  currentLanguage={params.lang}
  className="h-8 w-auto"
  alt="Site Logo"
/>;
```

### Built-in Navigation Components

The following components automatically use the theme-aware, per-language logos:

- **Shared Navbar** (`shared-navbar.tsx`): Main navigation bar for desktop
- **Mobile Navbar** (`navbar.mobile.tsx`): Navigation bar for mobile devices
- **Navigation Drawer** (`navbar-drawer.tsx`): Side drawer navigation menu

These components automatically:

- Select the correct language-specific logo
- Switch between light and dark logos based on theme
- Handle fallback logic when logos are missing

No additional configuration is needed - they work automatically with the logo management system.

### Admin Logo Management

1. Navigate to Admin → Site → General Information
2. Select language tab
3. Upload logos:
   - **Logo**: Primary logo (required)
   - **Dark Mode Logo**: Dark theme variant (optional)
4. Save changes

## Migration from Previous System

### What Changed

1. **Logo management moved** from SiteSettings to SiteMetadata
2. **Per-language support** for both light and dark logos
3. **Automatic theme switching** based on user's theme preference
4. **Fallback logic** ensures logos always display appropriately

### Backward Compatibility

- Existing main site logos still work as fallbacks
- Old SiteSettings no longer contain logo fields
- All logo management is now centralized in SiteMetadata

## Best Practices

### Logo Guidelines

1. **Light Logo**: Should work well on light backgrounds
2. **Dark Logo**: Should work well on dark backgrounds
3. **File Size**: Keep under 5MB for optimal performance
4. **Format**: SVG preferred, PNG/JPG acceptable
5. **Dimensions**: Consistent aspect ratio across languages

### Implementation Guidelines

1. **Always provide light logo** - it serves as fallback
2. **Dark logo is optional** - only provide if needed for brand clarity
3. **Test both themes** - Verify logo visibility in light and dark modes
4. **Consistent branding** - Maintain brand consistency across languages
5. **Performance**: Use appropriate image sizes and formats

## Troubleshooting

### Logo Not Displaying

1. Check if SiteMetadata exists for the current language
2. Verify logo files are uploaded and accessible
3. Check browser console for image loading errors
4. Ensure proper fallback chain is working

### Admin Interface Issues

1. Verify GraphQL permissions for site editing
2. Check form validation errors
3. Ensure image upload service is working
4. Verify language configuration

### Theme Switching Issues

1. Check if dark logo is uploaded for the current language
2. Verify theme detection is working properly
3. Test fallback to light logo in dark mode
4. Check CSS theme variables

## API Reference

### GraphQL Operations

#### Fetch Site with Metadata

```graphql
query GetSiteWithMetadata {
  site {
    id
    name
    logo {
      id
      url
    }
    metadatas {
      name
      description
      logo {
        id
        url
      }
      darkLogo {
        id
        url
      }
      languageId
    }
  }
  languages(isSupported: true) {
    id
    code
    name
  }
}
```

#### Update Site Metadata

```graphql
mutation UpdateSite($input: UpdateSiteInput!) {
  updateSite(input: $input) {
    id
    metadatas {
      name
      logo {
        id
        url
      }
      darkLogo {
        id
        url
      }
      languageId
    }
  }
}
```

## Testing

### Manual Testing Checklist

- [ ] Upload light logo for each language
- [ ] Upload dark logo for each language
- [ ] Test logo display in light theme
- [ ] Test logo display in dark theme
- [ ] Test language switching
- [ ] Test fallback behavior
- [ ] Test admin interface form submission
- [ ] Test logo removal/deletion
- [ ] Test with missing logos
- [ ] Test responsive behavior
- [ ] Test navbar logo in desktop view
- [ ] Test navbar logo in mobile view
- [ ] Test navigation drawer logo
- [ ] Test theme switching in navbar
- [ ] Test language switching with navbar logos

### Automated Testing Considerations

- Component rendering with different logo states
- Theme switching behavior
- Language switching behavior
- Form validation and submission
- Fallback logic verification
