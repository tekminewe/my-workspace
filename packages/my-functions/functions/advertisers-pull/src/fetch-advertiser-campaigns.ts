import { InvolveAsiaProvider } from "./providers/involveasia-provider";
import { GraphQLClient } from "graphql-request";
import {
  AdvertiserCampaignStatusEnum,
  AffiliateProviderEnum,
  getSdk,
} from "./graphql";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { downloadImageBase64FromUrl } from "./utils/image";
import { translateCampaignData } from "./utils/translation";

const snsClient = new SNSClient({
  region: process.env.AWS_REGION,
});

const lambdaClient = new LambdaClient({
  region: process.env.AWS_REGION,
});

const endpoint = `${process.env.API_BASE_URL}/graphql`;
const client = new GraphQLClient(endpoint);
const sdk = getSdk(client);
const providerId = AffiliateProviderEnum.InvolveAsia;

export const handler = async (): Promise<{ message: string }> => {
  try {
    console.log("Starting fetch advertiser campaigns process");
    const provider = new InvolveAsiaProvider(
      process.env.INVOLVEASIA_KEY || "",
      process.env.INVOLVEASIA_SECRET || ""
    );
    const res = await sdk.GetInitialData();
    const { site, languages, advertiserProviderReferences } = res.data;

    for (const reference of advertiserProviderReferences) {
      const campaigns = await provider.getAdvertiserCampaigns({
        advertiserId: reference.providerReferenceId,
      });

      for (const campaign of campaigns) {
        const existingCampaignRes = await sdk.GetAdvertiserCampaign({
          providerReferenceId: campaign.providerReferenceId,
          providerId: providerId,
        });

        if (existingCampaignRes.data.advertiserCampaignByProvider) {
          console.log("Campaign already exists, skipping");
          continue;
        }

        let bannerId: string | null = null;
        if (campaign.bannerUrl) {
          const banner = await downloadImageBase64FromUrl(campaign.bannerUrl);
          const uploadRes = await sdk.UploadMedia({
            data: {
              fileBase64: banner.fileBase64,
              filename: `${Date.now()}_${campaign.bannerUrl.split("/").pop()}`,
              mimeType: banner.mimeType,
              caption: campaign.name,
            },
          });
          bannerId = uploadRes.data.uploadMedia.id;
        }

        // Translate the campaign name and description for each supported language
        const translatedMetadata = await translateCampaignData(
          campaign.name,
          campaign.description,
          languages
        );

        const createRes = await sdk.CreateAdvertiserCampaign({
          data: {
            advertiserId: reference.advertiserId,
            startDate: campaign.startDate,
            endDate: campaign.endDate,
            url: campaign.url,
            providerId: campaign.providerId,
            providerReferenceId: campaign.providerReferenceId,
            voucherCodes: campaign.voucherCodes,
            statusId: AdvertiserCampaignStatusEnum.Inactive,
            slug: campaign.name
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, ""),
            metadatas: translatedMetadata.map((metadata) => ({
              ...metadata,
              bannerId,
            })),
          },
        });

        // Use the exact SNS topic ARN from the environment variable
        const topicArn = process.env.ALERT_SNS_TOPIC_ARN;
        try {
          await snsClient.send(
            new PublishCommand({
              TopicArn: topicArn,
              Subject: `New Advertiser Campaign Available`,
              Message: JSON.stringify({
                campaign: {
                  name: campaign.name,
                  description: campaign.description,
                  startDate: campaign.startDate,
                  endDate: campaign.endDate,
                  url: campaign.url,
                  providerReferenceId: campaign.providerReferenceId,
                },
              }),
            })
          );
          console.log("Successfully published to SNS topic");
        } catch (snsError) {
          console.error("Error publishing to SNS:", snsError);
        }

        try {
          // Prepare the payload for the generate-post Lambda function
          const newCampaign = createRes.data.createAdvertiserCampaign;
          const payload = {
            type: "advertiser-campaign",
            data: {
              title: campaign.name,
              description: campaign.description,
              keywords: [campaign.name],
              paragraphs: [
                {
                  campaign: {
                    link: campaign.url,
                    title: campaign.name,
                    description: campaign.description,
                    startDate: campaign.startDate,
                    endDate: campaign.endDate,
                    voucherCodes: campaign.voucherCodes || [],
                  },
                },
              ],
              advertiser: {
                name: newCampaign.advertiser.name,
                description: newCampaign.advertiser.description,
                logoUrl: newCampaign.advertiser.logo.url,
              },
              cashbackRate: newCampaign.advertiser.commission
                ? `${newCampaign.advertiser.commission?.commission}%`
                : undefined,
              siteLogoUrl: site.logo?.url || "",
            },
          };

          // Get the Lambda function name from environment variable or use default
          const generatePostLambdaName =
            process.env.GENERATE_POST_LAMBDA_NAME || "post-generator";

          // Invoke the generate-post Lambda function
          await lambdaClient.send(
            new InvokeCommand({
              FunctionName: generatePostLambdaName,
              InvocationType: "Event", // Asynchronous invocation
              Payload: Buffer.from(JSON.stringify(payload)),
            })
          );

          console.log("Successfully invoked generate-post Lambda function");
        } catch (lambdaError) {
          console.error(
            "Error invoking generate-post Lambda function:",
            lambdaError
          );
        }
      }
    }

    return {
      message: `Successfully fetched campaigns`,
    };
  } catch (error) {
    console.error("Error in fetch advertiser campaigns:", error);
    throw error;
  }
};
