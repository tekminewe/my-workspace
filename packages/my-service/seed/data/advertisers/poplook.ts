import { AdvertiserData } from '../advertiser.types';

export const poplook: AdvertiserData = {
  id: 'cm5vn3l7f00018b7mijs1xxm4',
  slug: 'poplook',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3l7f00028b7mo2zfq20e',
    filePath: 'advertisers/poplook.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '85',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Poplook',
      description:
        '<p>POPLOOK is a contemporary modest fashion brand that offers stylish, versatile clothing for the modern woman. Their designs focus on elegant silhouettes, comfortable fabrics, and modest yet fashionable pieces suitable for all occasions.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Poplook',
      description:
        '<p>POPLOOK 是一个当代适度时尚品牌，为现代女性提供时尚、多功能的服装。他们的设计注重优雅的轮廓、舒适的面料以及适合各种场合的适度而时尚的服装。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3l7f00048b7m5h5726l0',
      providerReferenceId: '85',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 35,
      dayToValidate: 30,
      url: 'https://invol.co/aff_m?offer_id=170&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3l7f00058b7mr6kv6d2s',
          name: 'Commission',
          typeId: 'Percentage',
          commission: 2.8,
          metadatas: [
            {
              languageId: 'EN_MY',
              name: 'All (Note: Payment through e-wallet, like TnG, Boost, GrabPay, Fave, etc is not trackable)',
            },
            {
              languageId: 'ZH_MY',
              name: '全部（注意：通过电子钱包TnG, Boost, GrabPay, Fave 等进行的支付无法被追踪）',
            },
          ],
        },
      ],
    },
  ],
};
