import { AdvertiserData } from '../advertiser.types';

export const jdSports: AdvertiserData = {
  id: 'cm5vn3lmy000r8b7mmtsl33ec',
  slug: 'jd-sports',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3lmy000s8b7mnz7lw0tl',
    filePath: 'advertisers/jd-sports.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '1445',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'JD Sports',
      description:
        '<p>JD Sports is a leading retailer of sports fashion and outdoor brands, offering a wide range of footwear, apparel, and accessories from top brands such as Nike, adidas, Puma, and more. Known for their exclusive product offerings and brand collaborations.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'JD Sports',
      description:
        '<p>JD Sports 是领先的运动时尚和户外品牌零售商，提供来自顶级品牌（如耐克、阿迪达斯、彪马等）的各种鞋类、服装和配饰。以其独家产品和品牌合作而闻名。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3lmy000u8b7mn7z5f23n',
      providerReferenceId: '1445',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 30,
      dayToValidate: 60,
      url: 'https://invol.co/aff_m?offer_id=100296&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3lmy000v8b7mj3j36esh',
          name: 'All',
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
