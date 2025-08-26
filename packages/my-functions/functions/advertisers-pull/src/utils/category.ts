import { AdvertiserCategoryEnum } from "@prisma/client";

export const mapCategory = (category: string): AdvertiserCategoryEnum => {
  const providerCategoryMap: Record<string, AdvertiserCategoryEnum> = {
    "Delivery & Logistics": AdvertiserCategoryEnum.Food_Grocery,
    "Digital Services": AdvertiserCategoryEnum.DigitalServices,
    Education: AdvertiserCategoryEnum.DigitalServices,
    Electronics: AdvertiserCategoryEnum.Electronics,
    Fashion: AdvertiserCategoryEnum.Fashion,
    Finance: AdvertiserCategoryEnum.Finance,
    "Food & Grocery": AdvertiserCategoryEnum.Food_Grocery,
    "Gifting & Crafts": AdvertiserCategoryEnum.DigitalServices,
    "Health & Beauty": AdvertiserCategoryEnum.Health_Beauty,
    "Home & Living": AdvertiserCategoryEnum.Home_Living,
    "Involve Asia": AdvertiserCategoryEnum.Others,
    Marketplace: AdvertiserCategoryEnum.Marketplace,
    Others: AdvertiserCategoryEnum.Others,
    Services: AdvertiserCategoryEnum.DigitalServices,
    Travel: AdvertiserCategoryEnum.Travel,
  };

  return providerCategoryMap[category] ?? AdvertiserCategoryEnum.Others;
};
