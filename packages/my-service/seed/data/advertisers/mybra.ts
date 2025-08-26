import { AdvertiserData } from '../advertiser.types';

export const mybra: AdvertiserData = {
  id: 'cm5vn3nwo00378b7mr84wyy26',
  slug: 'mybra',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3nwo00388b7mmh2zrecb',
    filePath: 'advertisers/mybra.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '2592',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'MyBra',
      description:
        '<p>MyBra is a Malaysian lingerie brand specializing in comfortable and supportive undergarments for women. Their products are designed with an understanding of Asian body types, offering perfect fit and confidence to their customers.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'MyBra',
      description:
        '<p>MyBra 是一家马来西亚内衣品牌，专门为女性提供舒适和支撑性的内衣。他们的产品基于对亚洲女性身材的理解而设计，为客户提供完美贴合和自信。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3nwo003a8b7mxncd8i9d',
      providerReferenceId: '2592',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 35,
      dayToValidate: 33,
      url: 'https://invol.co/aff_m?offer_id=101440&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3nwo003b8b7m2qthmith',
          name: 'Successful Sale (Orders from MY, SG, HK and MO)',
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
