import { AdvertiserData } from '../advertiser.types';

export const swarovski: AdvertiserData = {
  id: 'cm5vn3ohb00478b7m1qs5q5vj',
  slug: 'swarovski',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3ohb00488b7mo5mdwn3r',
    filePath: 'advertisers/swarovski.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '3523',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Swarovski',
      description:
        '<p>Founded in 1895, Swarovski is a premier jewellery and accessory brand with the tradition of delivering extraordinary everyday style to women around the world.</p><p>Swarovski has a wide range of products including jewelry (necklaces, earrings, bracelets, etc), watches, accessories, decorations, and gifts. Customers can enjoy attractive promotions and free shipping during shopping periods.\n</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Swarovski',
      description:
        '<p>Swarovski创立于 1895 年，是首屈一指的首饰和配饰品牌，秉承为全球女性带来非凡日常风格的传统。</p><p>施华洛世奇的产品种类繁多，包括首饰（项链、耳环、手链等）、手表、配饰、装饰品和礼品。顾客在购物期间可享受极具吸引力的促销和免费送货服务。\n</p>\n',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3ohc004a8b7mstqkktor',
      providerReferenceId: '3523',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 45,
      dayToValidate: 45,
      url: 'https://invol.co/aff_m?offer_id=102369&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3ohc004c8b7m9ro3cgt3',
          name: 'All Products (APAC Region)',
          typeId: 'Percentage',
          commission: 2.1,
          metadatas: [
            {
              languageId: 'EN_MY',
              name: 'All (Except checkout with gift codes and voucher)',
            },
            {
              languageId: 'ZH_MY',
              name: '全部（使用礼品代码和优惠券结账除外）',
            },
          ],
        },
      ],
    },
  ],
};
