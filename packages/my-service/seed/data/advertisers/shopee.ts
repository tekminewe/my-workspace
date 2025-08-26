import { AdvertiserData } from '../advertiser.types';

export const shopee: AdvertiserData = {
  id: 'cm5vn3ot8004t8b7mgv94odl5',
  slug: 'shopee',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3ot8004u8b7m7xm32v11',
    filePath: 'advertisers/shopee.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '4223',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Shopee',
      description:
        '<p>Shopee is the leading e-commerce platform in Southeast Asia and Taiwan. It provides users with an easy, secure, and fast online shopping experience through strong payment and logistical support. With a wide selection of product categories ranging from consumer electronics to home & living, health & beauty, baby & toys, fashion, and fitness equipment.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Shopee',
      description:
        '<p>Shopee 是东南亚和台湾领先的电子商务平台。通过强大的支付和物流支持，为用户提供便捷、安全和快速的在线购物体验。产品类别广泛，从消费电子产品到家居生活、健康美容、婴儿玩具、时尚和健身器材等。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3ot9004w8b7mux07v1pa',
      providerReferenceId: '1810',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 45,
      dayToValidate: 90,
      url: 'https://invl.co/aff_m?offer_id=103069&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3ot9004x8b7mkv3qd8c5',
          name: 'New Customer',
          typeId: 'Percentage',
          commission: 9.1,
          metadatas: [
            { languageId: 'EN_MY', name: 'New Customer' },
            { languageId: 'ZH_MY', name: '新客户' },
          ],
        },
        {
          id: 'cm5vn3ot9004y8b7mdi2ssa1t',
          name: 'Existing Customer',
          typeId: 'Percentage',
          commission: 2.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Existing Customer' },
            { languageId: 'ZH_MY', name: '现有客户' },
          ],
        },
      ],
    },
  ],
};
