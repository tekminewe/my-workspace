import { AdvertiserData } from '../advertiser.types';

export const tomaz: AdvertiserData = {
  id: 'cm5vn3pst00698b7mtxa9tyao',
  slug: 'tomaz',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3pst006a8b7mf4yfe6ak',
    filePath: 'advertisers/tomaz.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '4519',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Tomaz',
      description:
        '<p>Tomaz was built on the idea of delivering quality trendy products to consumers with the lowest pricing made possible. Making great leather shoes for men and women, our designers specialize in making sure that the leather shoes are up to date with the latest international trends while ensuring that the shoes are made with the best materials so that our customers can dress with style and comfort. Today, Tomaz not only focuses on leather goods but also clothing and watches while standing strong to its core value of delivering quality products to the people at a minimal price. Tomaz provides FREE EXPRESS SHIPPING & RETURNS ON ALL ORDERS THROUGHOUT MALAYSIA. </p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Tomaz',
      description:
        '<p>Tomaz 的理念是以尽可能低的价格向消费者提供优质的时尚产品。我们的设计师专门为男士和女士制作精美的皮鞋，确保皮鞋紧跟国际最新潮流，同时确保皮鞋采用最好的材料，让顾客穿得既时尚又舒适。如今，Tomaz 不仅经营皮具，还经营服装和手表，并坚持以最低的价格向人们提供优质产品的核心价值。Tomaz 在马来西亚全境为所有订单提供免费快递送货和退货服务。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3pst006c8b7maisi2wtl',
      providerReferenceId: '4519',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 30,
      dayToValidate: 67,
      url: 'https://invol.co/aff_m?offer_id=103365&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3pst006e8b7mwtk3rr7b',
          name: 'Successful Sale',
          typeId: 'Percentage',
          commission: 4.2,
          metadatas: [
            { languageId: 'EN_MY', name: 'All' },
            { languageId: 'ZH_MY', name: '全部' },
          ],
        },
      ],
    },
  ],
};
