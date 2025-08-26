import { AdvertiserData } from '../advertiser.types';

export const expedia: AdvertiserData = {
  id: 'cm5vn3op6004j8b7mljcxpy1j',
  slug: 'expedia',
  statusId: 'Inactive',
  logo: {
    id: 'cm5vn3op6004k8b7mw6emx8h1',
    filePath: 'advertisers/expedia.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '3719',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Expedia',
      description:
        "<p>Expedia is one of the world's leading full-service online travel brands helping travelers easily plan and book their whole trip with the widest selection of vacation packages, flights, hotels, vacation rentals, rental cars, cruises, activities, attractions, and services.</p>",
    },
    {
      languageId: 'ZH_MY',
      name: 'Expedia',
      description:
        '<p>Expedia 是世界领先的全方位在线旅行品牌之一，凭借最广泛的度假套餐、航班、酒店、度假租赁、租车、邮轮、活动、景点和服务选择，帮助旅行者轻松规划和预订他们的整个行程。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3op6004m8b7m4wbg0qwn',
      providerReferenceId: '3719',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 65,
      dayToValidate: 63,
      url: 'https://invol.co/aff_m?offer_id=102565&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3op6004n8b7mprj0149i',
          name: 'Package',
          typeId: 'Percentage',
          commission: 1.05,
          metadatas: [
            { languageId: 'EN_MY', name: 'Package' },
            { languageId: 'ZH_MY', name: '配套' },
          ],
        },
        {
          id: 'cm5vn3op6004o8b7mt67gem4i',
          name: 'Flight',
          typeId: 'Percentage',
          commission: 0.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Flight' },
            { languageId: 'ZH_MY', name: '航班' },
          ],
        },
        {
          id: 'cm5vn3op6004p8b7myykw8d5z',
          name: 'Hotel',
          typeId: 'Percentage',
          commission: 3.85,
          metadatas: [
            { languageId: 'EN_MY', name: 'Hotel' },
            { languageId: 'ZH_MY', name: '酒店' },
          ],
        },
        {
          id: 'cm5vn3op6004r8b7mjm5b8ayk',
          name: 'Activities',
          typeId: 'Percentage',
          commission: 2.8,
          metadatas: [
            { languageId: 'EN_MY', name: 'Activities' },
            { languageId: 'ZH_MY', name: '活动' },
          ],
        },
      ],
    },
  ],
};
