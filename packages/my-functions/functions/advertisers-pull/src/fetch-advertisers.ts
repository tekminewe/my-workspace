import { InvolveAsiaProvider } from "./providers/involveasia-provider";
import { GraphQLClient } from "graphql-request";
import {
  AdvertiserStatusEnum,
  AffiliateProviderEnum,
  AdvertiserCommissionStatusEnum,
  getSdk,
} from "./graphql";
import { createAdvertiserByName } from "./create-advertiser-by-name";

const endpoint = `${process.env.API_BASE_URL}/graphql`;
const client = new GraphQLClient(endpoint);
const sdk = getSdk(client);
const providerId = AffiliateProviderEnum.InvolveAsia;

/**
 * Handler for fetching advertisers and optionally creating one by name
 */
export const handler = async (event?: {
  advertiserName?: string;
}): Promise<{ message: string }> => {
  try {
    console.log("Starting fetch advertisers process");
    const provider = new InvolveAsiaProvider(
      process.env.INVOLVEASIA_KEY || "",
      process.env.INVOLVEASIA_SECRET || ""
    );

    // Check if advertiserName is provided in the event
    if (event?.advertiserName) {
      return createAdvertiserByName(event.advertiserName);
    }

    // Get all advertiser provider references
    const res = await sdk.GetAdvertiserProviderReferences({
      providerId,
      isActive: true,
    });

    const { advertiserProviderReferences } = res.data;
    console.log(
      `Found ${advertiserProviderReferences.length} advertiser provider references`
    );

    for (const reference of advertiserProviderReferences) {
      try {
        // Get advertiser details from provider
        const advertiserDetails = await provider.getAdvertiser({
          providerReferenceId: reference.providerReferenceId,
          isActive: true,
        });

        if (!advertiserDetails) {
          // If provider can't find the advertiser, mark as inactive
          await sdk.UpdateAdvertiser({
            id: reference.advertiserId,
            data: {
              statusId: AdvertiserStatusEnum.Inactive,
            },
          });

          console.log(
            `Advertiser ${reference.advertiserId} marked as inactive - not found in provider`
          );
          continue;
        }

        // If advertiser exists, update commission information
        if (advertiserDetails.commission) {
          await sdk.UpdateAdvertiserCommission({
            data: {
              identifier: {
                providerId,
                providerReferenceId: reference.providerReferenceId,
                advertiserId: reference.advertiserId,
              },
              dayToValidate: advertiserDetails.commission.daysToValidate,
              dayToPayout: advertiserDetails.commission.daysToPayout,
              url: advertiserDetails.trackingUrl || "",
              statusId: AdvertiserCommissionStatusEnum.Active,
              commissionRows:
                advertiserDetails.commission.commissionRows?.map((row) => ({
                  providerReferenceId: row.providerReferenceId,
                  name: row.name,
                  commission: row.rate,
                  typeId: row.typeId,
                })) || [],
            },
          });

          console.log(
            `Updated commission for advertiser ${reference.advertiserId}`
          );
        }
      } catch (error) {
        console.error(
          `Error processing advertiser ${reference.advertiserId}:`,
          error
        );
      }
    }

    return {
      message: "Successfully processed advertisers",
    };
  } catch (error) {
    console.error("Error in fetch advertisers:", error);
    throw error;
  }
};
