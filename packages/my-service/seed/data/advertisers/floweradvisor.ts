import { AdvertiserData } from '../advertiser.types';

export const floweradvisor: AdvertiserData = {
  id: 'cm5vn3nl5002n8b7m338vfvsp',
  slug: 'floweradvisor',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3nl5002o8b7mybxxxu1i',
    filePath: 'advertisers/floweradvisor.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '2258',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'FlowerAdvisor',
      description:
        '<p>FlowerAdvisor is an online flower delivery service operating in more than 100 countries worldwide. They specialize in delivering flowers, cakes, and gifts for all special occasions with same-day delivery options.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'FlowerAdvisor',
      description:
        '<p>FlowerAdvisor 是一家在全球 100 多个国家运营的在线花卉配送服务。他们专门为所有特殊场合配送鲜花、蛋糕和礼物，并提供当日送达选项。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3nl5002q8b7mr93gk85t',
      providerReferenceId: '2258',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 15,
      dayToValidate: 15,
      url: 'https://invol.co/aff_m?offer_id=101109&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3nl5002r8b7mjvie3jxl',
          name: 'Successful Sale',
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
