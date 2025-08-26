import { AdvertiserData } from '../advertiser.types';

export const watsons: AdvertiserData = {
  id: 'cm5vn3np9002t8b7mxcp27qfx',
  slug: 'watsons',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3np9002u8b7m3wlf24j8',
    filePath: 'advertisers/watsons.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '2381',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Watsons',
      description:
        "<p>Watsons is Asia's leading health and beauty retailer, offering a wide range of personal care products, cosmetics, fragrances, healthcare items, and pharmaceutical services. With stores across Asia, they provide quality products at competitive prices.</p>",
    },
    {
      languageId: 'ZH_MY',
      name: 'Watsons',
      description:
        '<p>屈臣氏是亚洲领先的健康和美容零售商，提供各种个人护理产品、化妆品、香水、保健品和药品服务。拥有遍布亚洲的门店，他们以有竞争力的价格提供优质产品。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3np9002w8b7mwd4586qa',
      providerReferenceId: '1811',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 45,
      dayToValidate: 30,
      url: 'https://invol.co/aff_m?offer_id=100662&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3zz970048b7m97hv7a87',
          name: 'Standard Commission',
          typeId: 'Percentage',
          commission: 7.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'All' },
            { languageId: 'ZH_MY', name: '全部' },
          ],
        },
      ],
    },
  ],
};
