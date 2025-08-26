'use client';

import { useTheme } from '@tekminewe/mint-ui/theme';
import Image from 'next/image';

interface SiteLogoProps {
  /**
   * Alternative text for the logo
   * @default "Site Logo"
   */
  alt?: string;

  /**
   * CSS class name for styling
   * @example "h-7 w-auto"
   */
  className?: string;

  /**
   * Current language for the request
   * @example "en-US"
   */
  currentLanguage: string;

  /**
   * Site data with logo metadata
   */
  site: {
    id: string;
    name: string;
    logo?: { id: string; url: string } | null;
    metadatas: Array<{
      name: string;
      description?: string | null;
      logo?: { id: string; url: string } | null;
      darkLogo?: { id: string; url: string } | null;
      languageId: string;
    }>;
  };

  /**
   * Available languages
   */
  languages: Array<{
    id: string;
    name: string;
    code: string;
    shortName: string;
    isSupported: boolean;
    isDefault: boolean;
  }>;
}

/**
 * SiteLogo component that automatically displays the correct logo
 * based on the current theme (light/dark mode) and language.
 *
 * This component receives site data as props and displays:
 * - Dark logo in dark theme (if available)
 * - Light logo in light theme or as fallback
 * - Site name as text fallback if no logos are available
 *
 * @example
 * ```tsx
 * <SiteLogo
 *   currentLanguage="en-US"
 *   className="h-7 w-auto"
 *   alt="My Site Logo"
 *   site={site}
 *   languages={languages}
 * />
 * ```
 */
export const SiteLogo = ({
  alt = 'Site Logo',
  className = 'h-7 w-auto',
  currentLanguage,
  site,
  languages,
}: SiteLogoProps) => {
  const { theme } = useTheme();

  // Find the current language ID based on the language code
  const currentLang = languages.find((lang) =>
    currentLanguage.startsWith(lang.code),
  );
  const currentLanguageId = currentLang?.id;

  // Find metadata for the current language
  const currentMetadata = site.metadatas?.find(
    (metadata) => metadata.languageId === currentLanguageId,
  );

  // Determine which logo to show based on theme
  let logoToShow = null;

  // Ensure theme is properly detected (handle SSR/hydration)
  const currentTheme = theme || 'light'; // Fallback to light if theme not ready

  if (currentTheme === 'dark' && currentMetadata?.darkLogo) {
    // Use dark logo if in dark theme and available
    logoToShow = currentMetadata.darkLogo;
  } else if (currentMetadata?.logo) {
    // Use light logo from metadata
    logoToShow = currentMetadata.logo;
  } else if (site.logo) {
    // Fallback to main site logo
    logoToShow = site.logo;
  }

  if (!logoToShow) {
    // No logo available, show site name as text fallback
    return (
      <span className={`font-bold text-primary-600 ${className}`}>
        {currentMetadata?.name || site.name || alt}
      </span>
    );
  }

  return (
    <Image
      src={logoToShow.url}
      alt={alt}
      width={200}
      height={50}
      className={className}
      priority
    />
  );
};
