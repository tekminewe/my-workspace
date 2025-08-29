import { AdvertiserCategoryEnum } from '@/services/graphql';

/**
 * Get feature image styling based on merchant category
 * Currently returns gray placeholder backgrounds
 * TODO: Replace with actual category-specific images when provided
 */
export function getFeatureImageForCategory(
  categoryId?: AdvertiserCategoryEnum,
): string {
  // For now, return different shades of gray based on category
  // This will be replaced with actual background images
  switch (categoryId) {
    case AdvertiserCategoryEnum.Electronics:
      return 'bg-neutral-400'; // Technology gray
    case AdvertiserCategoryEnum.Fashion:
      return 'bg-neutral-300'; // Fashion light gray
    case AdvertiserCategoryEnum.HealthBeauty:
      return 'bg-neutral-500'; // Beauty medium gray
    case AdvertiserCategoryEnum.FoodGrocery:
      return 'bg-neutral-300'; // Food light gray
    case AdvertiserCategoryEnum.HomeLiving:
      return 'bg-neutral-400'; // Home medium-dark gray
    case AdvertiserCategoryEnum.Travel:
      return 'bg-neutral-500'; // Travel blue-gray
    case AdvertiserCategoryEnum.Finance:
      return 'bg-neutral-400'; // Finance dark gray
    case AdvertiserCategoryEnum.Marketplace:
      return 'bg-neutral-300'; // Marketplace light gray
    case AdvertiserCategoryEnum.DigitalServices:
      return 'bg-neutral-500'; // Digital medium gray
    case AdvertiserCategoryEnum.Others:
    default:
      return 'bg-neutral-300'; // Default gray
  }
}

/**
 * Get category display name for UI
 */
export function getCategoryDisplayName(
  category: AdvertiserCategoryEnum,
): string {
  switch (category) {
    case AdvertiserCategoryEnum.Electronics:
      return 'Electronics';
    case AdvertiserCategoryEnum.Fashion:
      return 'Fashion';
    case AdvertiserCategoryEnum.HealthBeauty:
      return 'Health & Beauty';
    case AdvertiserCategoryEnum.FoodGrocery:
      return 'Food & Grocery';
    case AdvertiserCategoryEnum.HomeLiving:
      return 'Home & Living';
    case AdvertiserCategoryEnum.Travel:
      return 'Travel';
    case AdvertiserCategoryEnum.Finance:
      return 'Finance';
    case AdvertiserCategoryEnum.Marketplace:
      return 'Marketplace';
    case AdvertiserCategoryEnum.DigitalServices:
      return 'Digital Services';
    case AdvertiserCategoryEnum.Others:
      return 'Others';
    default:
      return 'Others';
  }
}
