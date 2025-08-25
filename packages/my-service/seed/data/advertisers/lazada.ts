import { AdvertiserData } from '../advertiser.types';

export const lazada: AdvertiserData = {
  id: 'cm5vn3p0a00508b7mptbpcjdg',
  slug: 'lazada',
  statusId: 'Inactive',
  logo: {
    id: 'cm5vn3p0a00518b7mtntrnrv8',
    filePath: 'advertisers/lazada.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '4640',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Lazada',
      description:
        '<p>Lazada is a leading e-commerce platform in Southeast Asia offering a wide range of products across various categories including electronics, fashion, home goods, and more. Known for competitive prices and regular sales events like 11.11.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Lazada',
      description:
        '<p>Lazada 是东南亚领先的电子商务平台，提供各种类别的广泛产品，包括电子产品、时尚、家居用品等。以具有竞争力的价格和定期销售活动（如 11.11）而闻名。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3p0b00538b7mq5qgzfdo',
      providerReferenceId: '4293',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 30,
      dayToValidate: 45,
      url: 'https://invol.co/aff_m?offer_id=103139&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3p0b00548b7mq4keyrse',
          name: 'Cashback',
          typeId: 'Percentage',
          commission: 7.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Cashback' },
            { languageId: 'ZH_MY', name: '现金回馈' },
          ],
        },
      ],
    },
  ],
};
