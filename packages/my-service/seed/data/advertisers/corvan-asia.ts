import { AdvertiserData } from '../advertiser.types';

export const corvanAsia: AdvertiserData = {
  id: 'cm5vn3o4z003k8b7mmggsyhmk',
  slug: 'corvan-asia',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3o4z003l8b7m4cfnuoqs',
    filePath: 'advertisers/corvan-asia.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '2972',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Corvan Asia',
      description:
        '<p>Corvan is a Malaysia-based company that specializes in the design and manufacturing of innovative car floor mats. Their products are known for high durability, custom fit designs, and exceptional quality.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Corvan Asia',
      description:
        '<p>Corvan 是一家总部位于马来西亚的公司，专门设计和制造创新的汽车脚垫。他们的产品以高耐用性、定制设计和卓越品质而闻名。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3o50003n8b7ma1kn2qmq',
      providerReferenceId: '2972',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 35,
      dayToValidate: 35,
      url: 'https://invol.co/aff_m?offer_id=101818&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3o50003o8b7mmtpmlyau',
          name: 'Successful Sale',
          typeId: 'Percentage',
          commission: 3.5,
          metadatas: [
            { languageId: 'EN_MY', name: 'All' },
            { languageId: 'ZH_MY', name: '全部' },
          ],
        },
      ],
    },
  ],
};
