import { AdvertiserData } from '../advertiser.types';

export const kinokuniya: AdvertiserData = {
  id: 'cm5vn3n7m00258b7mgxdoyn7a',
  slug: 'kinokuniya',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3n7m00268b7mssgz28c7',
    filePath: 'advertisers/kinokuniya.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '2177',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Kinokuniya',
      description:
        '<p>We are a bookstore dedicated to being a haven for bibliophiles, as we focus on bringing our customers the best books publishing has to offer, with over 300,000 titles in English, Japanese, Chinese and Malay. </p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Kinokuniya',
      description:
        '<p>我们是一家书店，致力于成为藏书家的天堂，因为我们专注于为顾客提供出版业所能提供的最好的书籍，我们拥有超过 300,000 种英文、日文、中文和马来语书籍。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3n7m00288b7my6naolvm',
      providerReferenceId: '2177',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 30,
      dayToValidate: 15,
      url: 'https://invol.co/aff_m?offer_id=101028&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3n7m00298b7m86lcgqfj',
          name: 'Successful Sale',
          typeId: 'Percentage',
          commission: 4.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'All' },
            { languageId: 'ZH_MY', name: '全部' },
          ],
        },
      ],
    },
  ],
};
