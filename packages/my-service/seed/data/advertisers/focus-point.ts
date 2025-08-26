import { AdvertiserData } from '../advertiser.types';

export const focusPoint: AdvertiserData = {
  id: 'cm5vn3mqi001r8b7mde156k1r',
  slug: 'focus-point',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3mqi001s8b7mpcr8ml3k',
    filePath: 'advertisers/focus-point.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '2096',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Focus Point',
      description:
        '<p>Focus Point is a leading optical retail chain in Malaysia offering a wide range of eyewear products, including prescription glasses, sunglasses, and contact lenses from top brands. They provide comprehensive eye examinations and professional eye care services.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Focus Point',
      description:
        '<p>Focus Point 是马来西亚领先的光学零售连锁店，提供各种眼镜产品，包括处方眼镜、太阳镜和顶级品牌的隐形眼镜。他们提供全面的眼科检查和专业的眼部护理服务。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3mqi001u8b7me0o194ki',
      providerReferenceId: '2096',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 30,
      dayToValidate: 15,
      url: 'https://invol.co/aff_m?offer_id=100947&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3mqj001v8b7mxscgbhkr',
          name: 'New customers',
          typeId: 'Percentage',
          commission: 5.6,
          metadatas: [
            { languageId: 'EN_MY', name: 'New Customer' },
            { languageId: 'ZH_MY', name: '新客户' },
          ],
        },
        {
          id: 'cm5vn3mqj001w8b7m9pmd5u8z',
          name: 'Existing Customer',
          typeId: 'Percentage',
          commission: 2.8,
          metadatas: [
            { languageId: 'EN_MY', name: 'Existing Customer' },
            { languageId: 'ZH_MY', name: '现有客户' },
          ],
        },
      ],
    },
  ],
};
