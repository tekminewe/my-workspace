import { AdvertiserData } from '../advertiser.types';

export const motherhood: AdvertiserData = {
  id: 'cm5vn3nbe002b8b7m3kxtp9p7',
  slug: 'motherhood',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3nbe002c8b7muf8gc1pi',
    filePath: 'advertisers/motherhood.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '2198',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Motherhood',
      description:
        "<p>Motherhood is Malaysia's premier online baby store offering a comprehensive range of baby products, maternity wear, and parenting essentials. With thousands of quality products from trusted brands, they aim to make parenthood easier and more enjoyable.</p>",
    },
    {
      languageId: 'ZH_MY',
      name: 'Motherhood',
      description:
        '<p>Motherhood 是马来西亚首屈一指的在线婴儿用品商店，提供全面的婴儿产品、孕妇装和育儿必需品。他们提供来自可信赖品牌的数千种优质产品，旨在让为人父母更轻松、更愉快。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3nbe002e8b7m62gl3rgl',
      providerReferenceId: '2198',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 15,
      dayToValidate: 15,
      url: 'https://invol.co/aff_m?offer_id=101049&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3nbe002f8b7m29dehbsu',
          name: 'storewide purchase',
          typeId: 'Percentage',
          commission: 4.9,
          metadatas: [
            { languageId: 'EN_MY', name: 'All' },
            { languageId: 'ZH_MY', name: '全部' },
          ],
        },
      ],
    },
  ],
};
