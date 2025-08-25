import { AdvertiserData } from '../advertiser.types';

export const malaysiaAirlines: AdvertiserData = {
  id: 'cm5vn3q8z006s8b7myd68jb16',
  slug: 'malaysia-airlines',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3q8z006t8b7m3ojmet2i',
    filePath: 'advertisers/malaysia-airlines.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '4618',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Malaysia Airlines',
      description:
        "<p>Malaysia Airlines is the national carrier of Malaysia, offering the best way to fly to, from and around Malaysia. The airline flies 40,000 guests daily on memorable journeys inspired by Malaysia's diverse richness.</p>",
    },
    {
      languageId: 'ZH_MY',
      name: 'Malaysia Airlines',
      description:
        '<p>马来西亚航空是马来西亚的国家航空公司，提供往返及环绕马来西亚的最佳飞行方式。该航空公司每天为 40,000 名乘客提供受马来西亚多样丰富文化启发的难忘旅程。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3q8z006v8b7m2vhr2y3q',
      providerReferenceId: '4618',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 60,
      dayToValidate: 45,
      url: 'https://invol.co/aff_m?offer_id=103464&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3q8z006w8b7m4adsd05k',
          name: 'City Codes of POS Malaysia(DIRECT, CODESHARE, DOMESTIC)',
          typeId: 'Percentage',
          commission: 0.7,
          metadatas: [
            { languageId: 'EN_MY', name: 'Domestic Flight' },
            { languageId: 'ZH_MY', name: '国内航班' },
          ],
        },
        {
          id: 'cm5vn3q8z006y8b7mb8ywl4m0',
          name: 'International POS City Codes that are Direct flights(Refer to description)',
          typeId: 'Percentage',
          commission: 1.4,
          metadatas: [
            { languageId: 'EN_MY', name: 'International Flight' },
            { languageId: 'ZH_MY', name: '国际航班' },
          ],
        },
      ],
    },
  ],
};
