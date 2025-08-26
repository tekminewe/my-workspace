import { LanguageEnum } from '@prisma/client';

export interface LanguageData {
  id: LanguageEnum;
  code: string;
  name: string;
  shortName: string;
  isSupported?: boolean;
}
