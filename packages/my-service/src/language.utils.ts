import { LanguageEnum } from '@prisma/client';

export const toLocaleCode = (languageEnum: LanguageEnum): string => {
  const split = languageEnum.split('_');
  return split[0].toLowerCase() + '-' + split[1].toUpperCase();
};
