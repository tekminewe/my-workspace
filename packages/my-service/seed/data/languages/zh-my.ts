import { LanguageEnum } from '@prisma/client';
import { LanguageData } from '../language.types';

export const zhMy: LanguageData = {
  id: LanguageEnum.ZH_MY,
  code: 'zh-MY',
  name: '中文',
  shortName: '中文',
  isSupported: false,
};
