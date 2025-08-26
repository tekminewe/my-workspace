import { AdvertiserData } from '../advertiser.types';

export const omron: AdvertiserData = {
  id: 'cm5vn3pkb005v8b7m09qgivtd',
  slug: 'omron',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3pkb005w8b7m7hap0xy7',
    filePath: 'advertisers/omron.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '4517',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Omron',
      description:
        '<p>Omron is a global leader in healthcare products, specializing in blood pressure monitors, nebulizers, and other medical devices for home use. Their innovative technology helps people monitor and manage their health with accuracy and ease.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Omron',
      description:
        '<p>Omron 是医疗保健产品的全球领导者，专门从事血压计、雾化器和其他家用医疗设备。他们的创新技术帮助人们准确、轻松地监测和管理健康。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3pkb005y8b7mi93x25f5',
      providerReferenceId: '2196',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 30,
      dayToValidate: 15,
      url: 'https://invol.co/aff_m?offer_id=101046&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3pkb005y8b7mi93x25f5',
          name: 'Successful Sale',
          typeId: 'Percentage',
          commission: 7.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'All' },
            { languageId: 'ZH_MY', name: '全部' },
          ],
        },
      ],
    },
  ],
};
