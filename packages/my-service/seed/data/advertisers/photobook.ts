import { AdvertiserData } from '../advertiser.types';

export const photobook: AdvertiserData = {
  id: 'cm5vn3lxq00138b7m7bpc8w0l',
  slug: 'photobook',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3lxr00148b7misto2r2b',
    filePath: 'advertisers/photobook.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '1917',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Photobook',
      description:
        '<p>Photobook is a global company specializing in personalized photo products. They offer a wide range of customizable photo books, canvas prints, cards, and gifts that help customers preserve their precious memories in beautiful, high-quality formats.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Photobook',
      description:
        '<p>Photobook 是一家专门从事个性化照片产品的全球公司。他们提供各种可定制的相册、帆布印刷品、卡片和礼品，帮助客户以精美、高质量的格式保存珍贵回忆。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3lxr00168b7mzh4kc5bq',
      providerReferenceId: '2178',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 65,
      dayToValidate: 35,
      url: 'https://invol.co/aff_m?offer_id=100768&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3lxr00178b7mzq8jxb79',
          name: 'Return Photobook Customer',
          typeId: 'Percentage',
          commission: 7.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Existing Customer' },
            { languageId: 'ZH_MY', name: '现有客户' },
          ],
        },
        {
          id: 'cm5vn3lxr00188b7mu0gmszn2',
          name: 'New Photobook Customer',
          typeId: 'Percentage',
          commission: 15.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'New Customer' },
            { languageId: 'ZH_MY', name: '新客户' },
          ],
        },
      ],
    },
  ],
};
