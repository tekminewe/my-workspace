import { PrismaClient } from '@prisma/client';
import * as languages from './languages';
import { LanguageData } from './language.types';

export async function seedLanguage(prisma: PrismaClient) {
  // Get all language data objects
  const languageDataObjects = Object.values(languages) as LanguageData[];

  // Process each language data object
  for (const data of languageDataObjects) {
    // Use Prisma transaction to perform database operation
    await prisma.language.upsert({
      where: {
        id: data.id,
      },
      create: data,
      update: {}, // Empty update to prevent modifying existing data
    });
  }
}
