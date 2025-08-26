import { AdvertiserData } from '../advertiser.types';

export const poney: AdvertiserData = {
  id: 'cm5vn3q5d006m8b7m4rgn1u02',
  slug: 'poney',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3q5d006n8b7mte46hv5u',
    filePath: 'advertisers/poney.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '4614',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Poney',
      description:
        "<p>Poney is a leading children's fashion brand offering high-quality, comfortable, and stylish clothing for kids from newborns to pre-teens. Their designs combine playful elements with practical features perfect for growing children.</p>",
    },
    {
      languageId: 'ZH_MY',
      name: 'Poney',
      description:
        '<p>Poney 是一家领先的儿童时装品牌，为从新生儿到青少年前期的孩子提供高品质、舒适和时尚的服装。他们的设计将趣味元素与实用功能相结合，非常适合成长中的儿童。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3q5d006p8b7muw3inp8t',
      providerReferenceId: '4614',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 30,
      dayToValidate: 30,
      url: 'https://invol.co/aff_m?offer_id=103460&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3q5d006q8b7mi4lv5dty',
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
