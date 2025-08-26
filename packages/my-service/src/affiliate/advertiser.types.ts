import { LanguageEnum } from '@prisma/client';

export interface AdvertiserIndexObject {
  objectID: string;
  name: { languageId: LanguageEnum; name: string }[]; // array of names in different languages
  slug: string;
  categories: { id: string; languageId: LanguageEnum; name: string }[];
  commission: number;
  calculatedCommission: number;
  logo: string;
}
