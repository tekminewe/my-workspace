import { registerEnumType } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';

registerEnumType(LanguageEnum, {
  name: 'LanguageEnum',
});
