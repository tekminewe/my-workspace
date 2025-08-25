import { LanguageEnum } from '@prisma/client';
import { LanguageData } from '../language.types';

export const enUs: LanguageData = {
  id: LanguageEnum.EN_US,
  code: 'en-US',
  name: 'English (United States)',
  shortName: 'EN',
  isSupported: false,
};
