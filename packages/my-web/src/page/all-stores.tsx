import { ServerComponentProps } from '@/types';
import { GET_SITE } from '@/graphql/queries/get-site';
import { GetSiteQuery } from '@/services/graphql';
import { query } from '@/services/apollo-client-server';
import { StoreList } from '@/components/store-list';
import { getDictionary } from '@/dictionaries';
import { Header } from '@tekminewe/mint-ui/typography';

export const generateMetadata = async ({
  params,
}: ServerComponentProps<any>) => {
  const { lang } = await params;
  const { data } = await query<GetSiteQuery>({
    query: GET_SITE,
    context: {
      headers: {
        'Accept-Language': lang,
      },
    },
  });
  const site = data.site;
  if (!site) {
    throw new Error('Site not found');
  }

  switch (lang) {
    case 'zh-MY':
      return {
        title: '所有商家',
        description: `搜索所有在 ${site.name} 的商家！在马来西亚顶级品牌赚取返现，聪明购物，通过独家优惠和奖励省更多。`,
      };
    default:
      return {
        title: 'All Stores',
        description: `Discover all stores on ${site.name}! Earn cashback on top brands in Malaysia, shop smart, and save more with exclusive deals & rewards.`,
      };
  }
};

export const AllStoresPage = async ({ params }: ServerComponentProps<any>) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Header className="mb-6">{dictionary.allStores.title}</Header>
      <StoreList locale={lang} dictionary={dictionary.allStores} />
    </div>
  );
};
