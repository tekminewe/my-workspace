import { LanguageEnum } from '@prisma/client';
import { LanguageData } from '../language.types';

export const enMy: LanguageData = {
  id: LanguageEnum.EN_MY,
  code: 'en-MY',
  name: 'English (Malaysia)',
  shortName: 'EN',
  isSupported: false,
};
