import * as deepl from "deepl-node";
import { LanguageEnum } from "../graphql";

// Map LanguageEnum to DeepL target language codes
const languageMapping: Record<LanguageEnum, deepl.TargetLanguageCode> = {
  [LanguageEnum.EnGb]: "en-GB",
  [LanguageEnum.EnMy]: "en-GB", // DeepL doesn't have specific Malaysian English, use British English
  [LanguageEnum.EnUs]: "en-US",
  [LanguageEnum.ZhCn]: "zh", // DeepL uses zh for simplified Chinese
  [LanguageEnum.ZhMy]: "zh", // For Malaysian Chinese, also use zh
};

export async function translateText(
  text: string,
  sourceLanguage: deepl.SourceLanguageCode,
  targetLanguage: LanguageEnum
): Promise<string> {
  if (!process.env.DEEPL_API_KEY) {
    console.warn("DEEPL_API_KEY is not set. Translation will not work.");
    return text;
  }

  try {
    const translator = new deepl.Translator(process.env.DEEPL_API_KEY);

    // Get DeepL target language code
    const targetLangCode = languageMapping[targetLanguage];

    // Skip translation if target language is English and source is English
    if (sourceLanguage.startsWith("en") && targetLangCode.startsWith("en")) {
      return text;
    }

    // Using the correct parameter format for DeepL SDK
    const result = await translator.translateText(
      text,
      sourceLanguage as deepl.SourceLanguageCode,
      targetLangCode
    );

    return result.text;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Return original text if translation fails
  }
}

export async function translateCampaignData(
  name: string,
  description: string,
  languages: { id: LanguageEnum }[]
): Promise<
  Array<{ name: string; description: string; languageId: LanguageEnum }>
> {
  // Assuming English as source language for campaign data from provider
  const sourceLanguage = "en";

  const translatedMetadata = await Promise.all(
    languages.map(async (language) => {
      const translatedName = await translateText(
        name,
        sourceLanguage,
        language.id
      );
      const translatedDescription = await translateText(
        description,
        sourceLanguage,
        language.id
      );

      return {
        name: translatedName,
        description: translatedDescription,
        languageId: language.id,
      };
    })
  );

  return translatedMetadata;
}

export async function translateCommissionRowName(
  name: string,
  languages: { id: LanguageEnum }[]
): Promise<Array<{ name: string; languageId: LanguageEnum }>> {
  // Assuming English as source language for commission row names
  const sourceLanguage = "en";

  const translatedMetadata = await Promise.all(
    languages.map(async (language) => {
      const translatedName = await translateText(
        name,
        sourceLanguage,
        language.id
      );

      return {
        name: translatedName,
        languageId: language.id,
      };
    })
  );

  return translatedMetadata;
}
