import { AdvertiserData } from '../advertiser.types';

export const skechers: AdvertiserData = {
  id: 'cm5vn3pc4005j8b7mo15usswr',
  slug: 'skechers',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3pc4005k8b7m8e1fxyxc',
    filePath: 'advertisers/skechers.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '4500',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Skechers',
      description:
        '<p>Skechers is a global leader in the performance and lifestyle footwear industry. The brand offers stylish, comfortable shoes for men, women, and children across various categories including athletic, casual, and work footwear.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Skechers',
      description:
        '<p>Skechers 是性能和生活方式鞋类行业的全球领导者。该品牌为男士、女士和儿童提供时尚舒适的鞋子，涵盖各种类别，包括运动鞋、休闲鞋和工作鞋。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3pc4005m8b7mv8h8g3ql',
      providerReferenceId: '4500',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 35,
      dayToValidate: 45,
      url: 'https://invol.co/aff_m?offer_id=103346&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3pc4005n8b7mgfu4h196',
          name: 'Successful sales',
          typeId: 'Percentage',
          commission: 6.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'All' },
            { languageId: 'ZH_MY', name: '全部' },
          ],
        },
      ],
    },
  ],
};
