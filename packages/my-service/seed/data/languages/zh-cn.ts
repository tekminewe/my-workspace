import { LanguageEnum } from '@prisma/client';
import { LanguageData } from '../language.types';

export const zhCn: LanguageData = {
  id: LanguageEnum.ZH_CN,
  code: 'zh-CN',
  name: '简体中文',
  shortName: '中文',
  isSupported: false,
};
