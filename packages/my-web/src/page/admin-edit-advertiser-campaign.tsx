import { getDictionary } from "@/dictionaries";
import { query } from "@/services/apollo-client-server";
import {
  AdminAdvertiserCampaignDetailPageQueryQuery,
  Language,
} from "@/services/graphql";
import { ServerComponentProps } from "@/types";
import { getSessionServer } from "@/services/auth/next";
import { Header } from "@tekminewe/mint-ui/typography";
import { AdminAdvertiserCampaignForm } from "@/components/admin-advertiser-campaign-form";
import { ADMIN_ADVERTISER_CAMPAIGN_DETAIL_PAGE_QUERY } from "@/graphql/queries/admin-advertiser-campaign-detail-page-query";
import { notFound } from "next/navigation";

export const AdminEditAdvertiserCampaignPage = async ({
  params,
}: ServerComponentProps<{ params: Promise<{ id: string }> }>) => {
  const { lang, id } = await params;
  const session = await getSessionServer();
  const dictionary = await getDictionary(lang);
  const result = await query<AdminAdvertiserCampaignDetailPageQueryQuery>({
    query: ADMIN_ADVERTISER_CAMPAIGN_DETAIL_PAGE_QUERY,
    variables: {
      id,
      isSupported: true,
    },
    context: {
      headers: {
        "Accept-Language": lang,
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  });

  const campaign = result.data.advertiserCampaign;
  if (!campaign) {
    return notFound();
  }

  const languages = result.data.languages;

  return (
    <div>
      <Header className="mb-3">
        {dictionary.admin.campaign.manage.updateCampaign}
      </Header>
      <AdminAdvertiserCampaignForm
        languageId={lang}
        languages={languages}
        campaign={{
          id,
          slug: campaign.slug,
          statusId: campaign.statusId === "Active" ? true : false,
          metadatas:
            campaign.metadatas?.map((metadata) => ({
              languageId: metadata.languageId,
              name: metadata.name || "",
              description: metadata.description || "",
              bannerId: metadata.banner?.id,
              banner: metadata.banner ? metadata.banner.url : undefined,
            })) || [],
        }}
        dictionary={{
          ...dictionary.admin.campaign.manage,
          ...dictionary.common,
        }}
      />
    </div>
  );
};
