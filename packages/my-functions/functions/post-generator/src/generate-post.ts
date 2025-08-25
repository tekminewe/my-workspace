import { getGraphQLClient, getSignedHeaders } from "./utils/sdk";
import { OpenAIBlogGenerator } from "./generator";
import {
  TrendingProductsStrategy,
  TrendingProductStrategyOptions,
} from "./strategies/trending-products";
import {
  AdvertiserCampaignStrategy,
  AdvertiserCampaignStrategyOptions,
} from "./strategies/advertiser-campaign";
import { PostTypeEnum } from "./graphql";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

// Prepare post data
interface PostData {
  title: string;
  description: string;
  content: string;
  slug: string;
  postTypeId: PostTypeEnum;
  featuredImageId?: string;
}

const generator = new OpenAIBlogGenerator();
const { sdk, endpoint, client } = getGraphQLClient();
const snsClient = new SNSClient({
  region: process.env.AWS_REGION,
});
let siteLogoUrl: string | undefined = "";

const getSiteLogoUrl = async () => {
  if (siteLogoUrl) {
    return siteLogoUrl;
  }
  const data = await sdk.GetInitialData();
  const { site } = data.data;
  siteLogoUrl = site.logo?.url;
  return siteLogoUrl;
};

export const handler = async (event: {
  type: string;
  postId: string;
  data: TrendingProductStrategyOptions | AdvertiserCampaignStrategyOptions;
}) => {
  try {
    let strategy;
    const siteLogoUrl = await getSiteLogoUrl();

    if (event.type === "advertiser-campaign") {
      strategy = new AdvertiserCampaignStrategy({
        ...event.data,
        siteLogoUrl,
      } as AdvertiserCampaignStrategyOptions);
    } else {
      // Default to trending products strategy
      strategy = new TrendingProductsStrategy(
        event.data as TrendingProductStrategyOptions
      );
    }

    // Generate content and featured image
    const generated = await generator.generate({ strategy });

    const content = {
      type: "doc",
      content: generated.contents,
    };

    // Add authorization headers
    const signedHeaders = await getSignedHeaders(endpoint, "");
    client.setHeaders({
      ...signedHeaders,
      "x-authorization": signedHeaders["authorization"],
    });

    // Upload featured image if available
    let featuredImageId = undefined;
    if (generated.featuredImageBase64) {
      try {
        // Upload the image
        const filename = `${strategy.options.title
          .toLowerCase()
          .replace(/\s+/g, "-")}-featured-image.png`;

        const uploadResult = await sdk.UploadMedia({
          data: {
            fileBase64: generated.featuredImageBase64,
            filename,
            mimeType: "image/png",
            caption: `Featured image for ${strategy.options.title}`,
          },
        });

        featuredImageId = uploadResult.data.uploadMedia.id;
        console.log(
          "Uploaded featured image:",
          uploadResult.data.uploadMedia.url
        );
      } catch (imageError) {
        console.error("Error uploading featured image:", imageError);
      }
    }

    const data: PostData = {
      title: strategy.options.title,
      description: strategy.options.description,
      content: JSON.stringify(content),
      slug: `${strategy.options.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")}`,
      postTypeId: PostTypeEnum.Blog,
    };

    // Add featured image ID if available
    if (featuredImageId) {
      data.featuredImageId = featuredImageId;
    }

    if (generated.featuredImagePrompt) {
      const topicArn = process.env.ALERT_SNS_TOPIC_ARN;
      try {
        console.log("Publishing to SNS topic:", topicArn);
        await snsClient.send(
          new PublishCommand({
            TopicArn: topicArn,
            Subject: `Please Generate Campaign Featured Image`,
            Message: JSON.stringify({
              prompt: generated.featuredImagePrompt,
            }),
          })
        );
        console.log("Successfully published to SNS topic");
      } catch (snsError) {
        console.error("Error publishing to SNS:", snsError);
      }
    }

    const isUpdate = !!event.postId;

    // Execute the GraphQL request using the typed SDK
    if (isUpdate) {
      const result = await sdk.UpdatePost({ id: event.postId, data });
      console.log("GraphQL result:", result);
    } else {
      const result = await sdk.CreatePost({ data });
      console.log("GraphQL result:", result);
    }
  } catch (error) {
    console.error("Error generating content:", error);
    throw error; // Re-throw to ensure AWS Lambda error handling catches it
  }
};
