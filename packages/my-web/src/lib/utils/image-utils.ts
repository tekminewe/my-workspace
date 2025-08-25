/**
 * Utility functions for image processing and conversion
 */

/**
 * Converts an image URL to base64 format
 * @param imageUrl - The URL of the image to convert
 * @returns Promise<string> - Base64 encoded image data with data URI scheme
 */
export async function urlToBase64(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`,
      );
    }

    // Get content type from headers
    let contentType = response.headers.get('content-type');

    // If content type is not an image or is generic, detect from URL extension
    if (
      !contentType ||
      !contentType.startsWith('image/') ||
      contentType === 'application/octet-stream'
    ) {
      contentType = detectImageMimeTypeFromUrl(imageUrl);
    }

    // Validate that we have a proper image MIME type
    if (!contentType.startsWith('image/')) {
      throw new Error(
        `Invalid content type: ${contentType}. Expected an image MIME type.`,
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    console.log(
      `Converted ${imageUrl} to base64 with MIME type: ${contentType}`,
    );
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error('Error converting URL to base64:', error);
    throw new Error(
      `Failed to convert image URL to base64: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    );
  }
}

/**
 * Detects image MIME type from URL extension
 * @param url - The image URL
 * @returns string - The detected MIME type
 */
function detectImageMimeTypeFromUrl(url: string): string {
  const extension = url.split('.').pop()?.toLowerCase().split('?')[0]; // Remove query params

  switch (extension) {
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    case 'bmp':
      return 'image/bmp';
    case 'tiff':
    case 'tif':
      return 'image/tiff';
    default:
      console.warn(
        `Unknown image extension: ${extension}, defaulting to image/png`,
      );
      return 'image/png';
  }
}

/**
 * Converts multiple image URLs to base64 format in parallel
 * @param imageUrls - Array of image URLs to convert
 * @returns Promise<string[]> - Array of base64 encoded image data
 */
export async function urlsToBase64(imageUrls: string[]): Promise<string[]> {
  try {
    const conversions = imageUrls.map((url) => urlToBase64(url));
    return await Promise.all(conversions);
  } catch (error) {
    console.error('Error converting URLs to base64:', error);
    throw error;
  }
}

/**
 * Validates if a string is a valid base64 data URI
 * @param dataUri - The data URI to validate
 * @returns boolean - True if valid base64 data URI
 */
export function isValidBase64DataUri(dataUri: string): boolean {
  const base64Pattern = /^data:image\/(png|jpeg|jpg|gif|webp|svg\+xml);base64,/;
  return base64Pattern.test(dataUri);
}
