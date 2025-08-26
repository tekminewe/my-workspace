import { AdvertiserData } from '../advertiser.types';

export const paiWellness: AdvertiserData = {
  id: 'cm5vn3pp700618b7murs9cjds',
  slug: 'pai-wellness',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3pp700628b7mk8nf3t9r',
    filePath: 'advertisers/pai-wellness.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '4518',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Pai Wellness',
      description:
        '<p>Pai Wellness is a health and wellness brand that offers traditional Chinese medicine and natural health supplements. Their products are formulated based on ancient wisdom combined with modern scientific research to promote holistic wellbeing.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Pai Wellness',
      description:
        '<p>Pai Wellness 是一家健康品牌，提供传统中医和天然健康补充品。他们的产品基于古老智慧结合现代科学研究配制，以促进整体健康。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3pp700648b7m89euckrf',
      providerReferenceId: '2189',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 35,
      dayToValidate: 15,
      url: 'https://invol.co/aff_m?offer_id=101040&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3pp700658b7m5147hvze',
          name: 'Food Category',
          typeId: 'Percentage',
          commission: 10.5,
          metadatas: [
            { languageId: 'EN_MY', name: 'Food Category' },
            { languageId: 'ZH_MY', name: '食品类别' },
          ],
        },
        {
          id: 'cm5vn3pp700668b7mvjj0h08p',
          name: 'Essential Oil & Skincare Category',
          typeId: 'Percentage',
          commission: 21.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Essential Oil & Skincare Category' },
            { languageId: 'ZH_MY', name: '精油和护肤品类别' },
          ],
        },
        {
          id: 'cm5vn3pp700678b7mu6c9l03c',
          name: 'Aroma Diffuser & Beauty Accessories Category',
          typeId: 'Percentage',
          commission: 14.0,
          metadatas: [
            {
              languageId: 'EN_MY',
              name: 'Aroma Diffuser & Beauty Accessories Category',
            },
            { languageId: 'ZH_MY', name: '香薰及美容配件类别' },
          ],
        },
      ],
    },
  ],
};
