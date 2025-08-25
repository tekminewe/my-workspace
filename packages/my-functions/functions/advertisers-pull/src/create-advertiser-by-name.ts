import { InvolveAsiaProvider } from "./providers/involveasia-provider";
import { GraphQLClient } from "graphql-request";
import {
  AdvertiserStatusEnum,
  AffiliateProviderEnum,
  AdvertiserCommissionStatusEnum,
  AdvertiserCommissionShareTypeEnum,
  AdvertiserCommissionTypeEnum,
  getSdk,
} from "./graphql";
import { downloadImageBase64FromUrl } from "./utils/image";
import {
  translateCampaignData,
  translateCommissionRowName,
} from "./utils/translation";

const endpoint = `${process.env.API_BASE_URL}/graphql`;
const client = new GraphQLClient(endpoint);
const sdk = getSdk(client);

/**
 * Creates a new advertiser by name by fetching it from InvolveAsia
 * @param advertiserName The name of the advertiser to create
 * @returns A message indicating the result of the operation
 */
export const createAdvertiserByName = async (
  advertiserName: string
): Promise<{ message: string }> => {
  try {
    console.log(`Fetching advertiser by name: ${advertiserName}`);

    // Get all supported languages
    const supportedLanguagesResponse = await sdk.GetSupportedLanguages();
    const supportedLanguages = supportedLanguagesResponse.data.languages;

    console.log(`Found ${supportedLanguages.length} supported languages`);

    const provider = new InvolveAsiaProvider(
      process.env.INVOLVEASIA_KEY || "",
      process.env.INVOLVEASIA_SECRET || ""
    );

    const advertiserDetails = await provider.getAdvertiser({
      name: advertiserName,
      isActive: true,
    });

    if (!advertiserDetails) {
      console.log(`No advertiser found with name: ${advertiserName}`);
      return {
        message: `No advertiser found with name: ${advertiserName}`,
      };
    }

    // Check if the advertiser already exists using the provider reference ID
    console.log(
      `Checking if advertiser with provider reference ID ${advertiserDetails.id} already exists`
    );
    const advertiserProviderReferencesResponse =
      await sdk.GetAdvertiserProviderReferences({
        providerId: AffiliateProviderEnum.InvolveAsia,
      });

    const existingReference =
      advertiserProviderReferencesResponse.data.advertiserProviderReferences.find(
        (reference) => reference.providerReferenceId === advertiserDetails.id
      );

    if (existingReference) {
      console.log(
        `Advertiser already exists with ID: ${existingReference.advertiserId}`
      );
      return {
        message: `Advertiser already exists with provider reference ID: ${advertiserDetails.id}`,
      };
    }

    // Upload the logo to media service
    console.log(`Uploading logo for advertiser: ${advertiserDetails.name}`);
    const { fileBase64, mimeType } = await downloadImageBase64FromUrl(
      advertiserDetails.logoUrl
    );

    const uploadMediaResponse = await sdk.UploadMedia({
      data: {
        fileBase64,
        mimeType,
        caption: `${advertiserDetails.name} logo`,
        filename: `${advertiserDetails.name
          .toLowerCase()
          .replace(/\s+/g, "-")}.${mimeType.split("/")[1]}`,
      },
    });

    const logoId = uploadMediaResponse.data.uploadMedia.id;
    console.log(`Logo uploaded successfully with ID: ${logoId}`);

    // Generate slug from name
    const slug = advertiserDetails.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    // Prepare commission rows if available with translation
    const commissionRows = advertiserDetails.commission?.commissionRows
      ? await Promise.all(
          advertiserDetails.commission.commissionRows.map(
            async (row: {
              providerReferenceId: string;
              rate: number;
              typeId: AdvertiserCommissionTypeEnum;
              name: string;
            }) => {
              const translatedMetadata = await translateCommissionRowName(
                row.name,
                supportedLanguages
              );

              return {
                providerReferenceId: row.providerReferenceId,
                commission: row.rate,
                typeId: row.typeId,
                metadatas: translatedMetadata,
              };
            }
          )
        )
      : [];

    // Create advertiser metadatas for all supported languages with translation
    console.log(
      `Translating advertiser metadata for ${supportedLanguages.length} languages`
    );
    const metadatas = await translateCampaignData(
      advertiserDetails.name,
      advertiserDetails.description || `${advertiserDetails.name} offers.`,
      supportedLanguages
    );

    // Create the advertiser
    const createAdvertiserResponse = await sdk.CreateAdvertiser({
      data: {
        slug,
        logoId,
        statusId: AdvertiserStatusEnum.Inactive,
        metadatas,
        providerReferences: [
          {
            providerId: AffiliateProviderEnum.InvolveAsia,
            providerReferenceId: advertiserDetails.id,
          },
        ],
        commissions: advertiserDetails.commission
          ? [
              {
                advertiserId: "",
                providerId: AffiliateProviderEnum.InvolveAsia,
                providerReferenceId: advertiserDetails.id,
                dayToValidate: advertiserDetails.commission.daysToValidate,
                dayToPayout: advertiserDetails.commission.daysToPayout,
                url: advertiserDetails.trackingUrl || "",
                statusId: AdvertiserCommissionStatusEnum.Inactive,
                commissionShare: 10,
                commissionShareTypeId:
                  AdvertiserCommissionShareTypeEnum.Percentage,
                commissionRows,
              },
            ]
          : undefined,
      },
    });

    console.log(
      `Advertiser created successfully with ID: ${createAdvertiserResponse.data.createAdvertiser.id}`
    );

    return {
      message: `Successfully created advertiser: ${createAdvertiserResponse.data.createAdvertiser.name}`,
    };
  } catch (error) {
    console.error("Error creating advertiser by name:", error);
    throw error;
  }
};
