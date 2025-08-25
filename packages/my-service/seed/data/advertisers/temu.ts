import { AdvertiserData } from '../advertiser.types';

export const temu: AdvertiserData = {
  id: 'cm5vn3p3i00568b7ml88nveml',
  slug: 'temu',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3p3i00578b7m2qrheevw',
    filePath: 'advertisers/temu.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '4375',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Temu',
      description:
        '<p>Temu is an online marketplace that connects consumers with millions of sellers, manufacturers and brands around the world with the mission to empower them to live their best lives.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Temu',
      description:
        '<p>Temu 是一个在线市场，将消费者与全球数百万卖家、制造商和品牌联系起来，其使命是让消费者过上最美好的生活。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3p3i00598b7m6veswo31',
      providerReferenceId: '4375',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 30,
      dayToValidate: 90,
      url: 'https://invle.co/aff_m?offer_id=103221&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3p3i005a8b7m61j5y3pl',
          name: 'New Customers',
          typeId: 'Percentage',
          commission: 24.5,
          metadatas: [
            { languageId: 'EN_MY', name: 'New Customer' },
            { languageId: 'ZH_MY', name: '新客户' },
          ],
        },
        {
          id: 'cm5vn3p3i005b8b7mojr2htwj',
          name: 'Existing Customers',
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
