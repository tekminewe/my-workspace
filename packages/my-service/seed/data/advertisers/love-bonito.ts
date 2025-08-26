import { AdvertiserData } from '../advertiser.types';

export const loveBonito: AdvertiserData = {
  id: 'cm5vn3o97003q8b7mswnfjd4y',
  slug: 'love-bonito',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3o97003r8b7mzl00j5cs',
    filePath: 'advertisers/love-bonito.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '3111',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Love Bonito',
      description:
        '<p>Love, Bonito is a female fashion brand that designs apparel specifically for Asian women. With thoughtful designs that flatter the Asian body type and fit, the brand has become a go-to destination for modern, versatile, and quality wardrobe essentials.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Love Bonito',
      description:
        '<p>Love, Bonito 是一个女性时装品牌，专门为亚洲女性设计服装。凭借考虑周全的设计，突显亚洲体型和合身，该品牌已成为现代、多功能和高质量衣柜必备品的首选目的地。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3o97003t8b7mf8hwuysq',
      providerReferenceId: '3111',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 40,
      dayToValidate: 93,
      url: 'https://invol.co/aff_m?offer_id=101957&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3o97003u8b7m2hews25l',
          name: 'Existing Customer',
          typeId: 'Percentage',
          commission: 1.4,
          metadatas: [
            { languageId: 'EN_MY', name: 'Existing Customer' },
            { languageId: 'ZH_MY', name: '现有客户' },
          ],
        },
        {
          id: 'cm5vn3o97003v8b7meexzyt1f',
          name: 'New Customer',
          typeId: 'Percentage',
          commission: 7.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'New Customer' },
            { languageId: 'ZH_MY', name: '新客户' },
          ],
        },
      ],
    },
  ],
};
