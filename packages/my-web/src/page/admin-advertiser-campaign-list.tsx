import { ServerComponentProps } from "@/types";
import { AdminCampaignTable } from "@/components/admin-campaign-table";
import { Header } from "@tekminewe/mint-ui/typography";
import { getDictionary } from "@/dictionaries";

export const AdvertiserCampaignListPage = async ({
  params,
}: ServerComponentProps<any>) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <Header className="mb-3">
        {dictionary.admin.campaign.list.campaign}
      </Header>
      <AdminCampaignTable
        lang={lang}
        dictionary={dictionary.admin.campaign.list}
      />
    </div>
  );
};
