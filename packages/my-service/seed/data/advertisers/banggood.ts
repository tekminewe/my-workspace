import { AdvertiserData } from '../advertiser.types';

export const banggood: AdvertiserData = {
  id: 'cm5vn3mmq001l8b7mwftxht2j',
  slug: 'banggood',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3mmq001m8b7m449hynei',
    filePath: 'advertisers/banggood.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '2034',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Banggood',
      description:
        "<p>Banggood is a global leading online shop, offering millions of products that are well-selected. From consumer electronics, tools, home, toys, sports, to clothing, everything could be delivered to one's doorstep!</p>",
    },
    {
      languageId: 'ZH_MY',
      name: 'Banggood',
      description:
        '<p>Banggood 是一家全球领先的在线商店，提供数百万种精选产品。从消费电子产品、工具、家居、玩具、运动到服装，一切都可以送到您的家门口！</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3mmr001o8b7mquy537al',
      providerReferenceId: '2034',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 35,
      dayToValidate: 45,
      url: 'https://invol.co/aff_m?offer_id=100885&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3mmr001p8b7m3v13g036',
          name: 'All',
          typeId: 'Percentage',
          commission: 21.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'All' },
            { languageId: 'ZH_MY', name: '全部' },
          ],
        },
      ],
    },
  ],
};
