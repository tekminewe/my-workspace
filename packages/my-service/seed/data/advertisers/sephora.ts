import { AdvertiserData } from '../advertiser.types';

export const sephora: AdvertiserData = {
  id: 'cm5vn3o1f003d8b7mas3bh9bt',
  slug: 'sephora',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3o1f003e8b7moussbz1m',
    filePath: 'advertisers/sephora.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '2851',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Sephora',
      description:
        '<p>Sephora is a multinational chain of personal care and beauty stores featuring nearly 300 brands, along with its own private label, Sephora Collection. The company offers beauty products including cosmetics, skincare, body, fragrance, nail color, and haircare.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Sephora',
      description:
        '<p>丝芙兰是一家跨国个人护理和美容商店连锁店，拥有近 300 个品牌，以及自己的自有品牌 Sephora Collection。该公司提供美容产品，包括化妆品、护肤品、身体护理、香水、指甲油和护发产品。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3o1g003g8b7mxvgo3rzv',
      providerReferenceId: '2851',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 40,
      dayToValidate: 93,
      url: 'https://invol.co/aff_m?offer_id=1604&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3o1g003h8b7mtlxdsr3j',
          name: 'New Customer',
          typeId: 'Percentage',
          commission: 5.6,
          metadatas: [
            { languageId: 'EN_MY', name: 'New Customer' },
            { languageId: 'ZH_MY', name: '新客户' },
          ],
        },
        {
          id: 'cm5vn3o1g003i8b7mv5045zvj',
          name: 'Existing Customer',
          typeId: 'Percentage',
          commission: 2.1,
          metadatas: [
            { languageId: 'EN_MY', name: 'Existing Customer' },
            { languageId: 'ZH_MY', name: '现有客户' },
          ],
        },
      ],
    },
  ],
};
