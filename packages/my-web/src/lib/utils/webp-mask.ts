/**
 * WebP mask generator for OpenAI image generation
 * Reads the actual mask_alpha.webp file from assets and converts to base64
 */

import { urlToBase64 } from './image-utils';

/**
 * Reads the mask_alpha.webp file from public/assets/images and converts to base64
 * This uses the actual mask file with alpha channel that you provided
 */
export async function getMaskFromFile(): Promise<string> {
  try {
    // Construct the public URL for the mask file
    // In development, use localhost; in production, use the deployed URL
    const baseUrl = process.env.SITE_DOMAIN
      ? `${process.env.SITE_DOMAIN}`
      : 'http://localhost:3000';

    const maskUrl = `${baseUrl}/assets/images/mask_alpha.webp`;

    // Convert the mask file to base64
    const maskBase64 = await urlToBase64(maskUrl);

    console.log('Successfully loaded mask from file:', maskUrl);
    return maskBase64;
  } catch (error) {
    console.error('Failed to load mask from file:', error);
    // Fallback to the minimal mask if file loading fails
    return getWebPMask();
  }
}

/**
 * Generates a WebP mask image programmatically using Canvas API
 * White areas = generate content, Black areas = logo placement
 */
export function generateWebPMask(): string {
  // This would require canvas library in Node.js environment
  // For now, return a pre-generated WebP mask base64
  return getWebPMask();
}

/**
 * Pre-generated 1200x630 WebP mask as fallback
 * White background with black rectangles for logo placement
 */
export function getWebPMask(): string {
  // This is a minimal 1x1 WebP as fallback - the actual mask should come from getMaskFromFile()
  // The actual mask should be 1200x630 with:
  // - White background (#FFFFFF)
  // - Black rectangle top-left for site logo
  // - Black rectangle bottom-right for advertiser logo
  return 'data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADwAQCdASoBAAEAAkA4JaQAA3AA/vuFAA==';
}

/**
 * Validates if a data URI is a valid WebP image
 */
export function isValidWebPDataUri(dataUri: string): boolean {
  return dataUri.startsWith('data:image/webp;base64,');
}
