import { ServerComponentProps } from "@/types";
import { AdminAdvertiserTable } from "@/components/admin-advertiser-table";
import { AdminRefreshAdvertiserIndexButton } from "@/components/admin-refresh-advertiser-index-button";
import { FetchAdvertiserButton } from "@/components/fetch-advertiser-button";
import { Header } from "@tekminewe/mint-ui/typography";
import { getDictionary } from "@/dictionaries";

export const AdminAdvertiserListPage = async ({
  params,
}: ServerComponentProps<any>) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <Header>{dictionary.admin.advertiser.list.advertiser}</Header>
        <div className="flex gap-2">
          <FetchAdvertiserButton
            language={lang}
            dictionary={dictionary}
          />
          <AdminRefreshAdvertiserIndexButton
            languageId={lang}
            buttonText={
              dictionary.admin.advertiser.list.refreshIndex || "Refresh Index"
            }
          />
        </div>
      </div>
      <AdminAdvertiserTable
        lang={lang}
        dictionary={dictionary.admin.advertiser.list}
      />
    </div>
  );
};
