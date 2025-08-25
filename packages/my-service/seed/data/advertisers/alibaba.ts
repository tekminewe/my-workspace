import { AdvertiserData } from '../advertiser.types';

export const alibaba: AdvertiserData = {
  id: 'cm5vn3ocu003x8b7ma58sy6k9',
  slug: 'alibaba',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3ocu003y8b7mjgo6o55y',
    filePath: 'advertisers/alibaba.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '3508',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Alibaba',
      description:
        '<p>Alibaba.com is a leading platform for global wholesale trade serving millions of buyers and suppliers around the world. It connects manufacturers with commerce businesses to facilitate global trade.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Alibaba',
      description:
        '<p>Alibaba.com是一个领先的全球批发贸易平台，为世界各地的数百万买家和供应商提供服务。它将制造商与商业企业联系起来，促进全球贸易。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3ocu00408b7mz59hfwzz',
      providerReferenceId: '3508',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 15,
      dayToValidate: 45,
      url: 'https://invol.co/aff_m?offer_id=102354&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3ocu00438b7mthpw7wim',
          name: 'New Customer',
          typeId: 'Percentage',
          commission: 6.3,
          metadatas: [
            { languageId: 'EN_MY', name: 'New Customer' },
            { languageId: 'ZH_MY', name: '新客户' },
          ],
        },
        {
          id: 'cm5vn3ocu00448b7m21a2vrop',
          name: 'Existing Customer',
          typeId: 'Percentage',
          commission: 3.5,
          metadatas: [
            { languageId: 'EN_MY', name: 'Existing Customer' },
            { languageId: 'ZH_MY', name: '现有客户' },
          ],
        },
      ],
    },
  ],
};
