import { LanguageEnum } from '@prisma/client';
import { LanguageData } from '../language.types';

export const enGb: LanguageData = {
  id: LanguageEnum.EN_GB,
  code: 'en-GB',
  name: 'English (United Kingdom)',
  shortName: 'EN',
  isSupported: false,
};
