import { AdvertiserData } from '../advertiser.types';

export const klookTravel: AdvertiserData = {
  id: 'cm5vn3lge00078b7ms5w3r309',
  slug: 'klook-travel',
  statusId: 'Inactive',
  logo: {
    id: 'cm5vn3lge00088b7m85s20i8a',
    filePath: 'advertisers/klook-travel.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '803',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Klook Travel',
      description:
        '<p>Klook is a world-leading travel activities and services booking platform. With Klook, travelers can easily discover and book popular attractions, tours, local transportation, best foods, and unique experiences around the world.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Klook Travel',
      description:
        '<p>Klook 是世界领先的旅游活动和服务预订平台。通过 Klook，旅行者可以轻松发现和预订世界各地的热门景点、旅游、当地交通、最佳美食和独特体验。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3lgf000a8b7ma906gp97',
      providerReferenceId: '803',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 30,
      dayToValidate: 30,
      url: 'https://invol.co/aff_m?offer_id=1604&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3lgf000c8b7m2vfzo96p',
          name: 'Food & Dining',
          typeId: 'Percentage',
          commission: 5.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Food & Dining' },
            { languageId: 'ZH_MY', name: '美食餐饮' },
          ],
        },
        {
          id: 'cm5vn3lgf000d8b7m7dchceyw',
          name: 'Attractions Pass (AP)',
          typeId: 'Percentage',
          commission: 5.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Attractions Pass' },
            { languageId: 'ZH_MY', name: '景点通行证' },
          ],
        },
        {
          id: 'cm5vn3lgf000e8b7m5cljd4jx',
          name: 'Tour & Sightseeing (OT)',
          typeId: 'Percentage',
          commission: 5.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Tour & Sightseeing' },
            { languageId: 'ZH_MY', name: '旅游与观光' },
          ],
        },
        {
          id: 'cm5vn3lgf000f8b7m0fbiva1x',
          name: 'Activities & Experiences (AE)',
          typeId: 'Percentage',
          commission: 5.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Activities & Experiences' },
            { languageId: 'ZH_MY', name: '活动与体验' },
          ],
        },
        {
          id: 'cm5vn3lgf000g8b7mging92lg',
          name: 'Food & Dining (FB)',
          typeId: 'Percentage',
          commission: 5.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Food & Dining' },
            { languageId: 'ZH_MY', name: '美食餐饮' },
          ],
        },
        {
          id: 'cm5vn3lgf000h8b7mnq8n90on',
          name: 'Transport & Wifi (LT)',
          typeId: 'Percentage',
          commission: 5.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Transport & Wifi' },
            { languageId: 'ZH_MY', name: '交通与Wifi' },
          ],
        },
        {
          id: 'cm5vn3lgf000i8b7m7yjvjbg9',
          name: 'Car Rentals (CR)',
          typeId: 'Percentage',
          commission: 5.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Car Rentals' },
            { languageId: 'ZH_MY', name: '租车' },
          ],
        },
        {
          id: 'cm5vn3lgf000j8b7m2tc6hk6o',
          name: 'Hotel (HO)',
          typeId: 'Percentage',
          commission: 5.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Hotel' },
            { languageId: 'ZH_MY', name: '酒店' },
          ],
        },
        {
          id: 'cm5vn3lgf000k8b7mtmaz896h',
          name: 'Insurance (IR)',
          typeId: 'Percentage',
          commission: 5.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Insurance' },
            { languageId: 'ZH_MY', name: '保险' },
          ],
        },
        {
          id: 'cm5vn3lgf000l8b7m41z485w6',
          name: 'Attraction passes (AS)',
          typeId: 'Percentage',
          commission: 5.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Attraction passes' },
            { languageId: 'ZH_MY', name: '景点门票' },
          ],
        },
        {
          id: 'cm5vn3lgf000m8b7mj99me5ry',
          name: 'Staycation (ST)',
          typeId: 'Percentage',
          commission: 5.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Staycation' },
            { languageId: 'ZH_MY', name: '宅度假' },
          ],
        },
        {
          id: 'cm5vn3lgf000n8b7mqkrm6n7n',
          name: 'Special Activities (SP)',
          typeId: 'Percentage',
          commission: 2.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Special Activities' },
            { languageId: 'ZH_MY', name: '特别活动' },
          ],
        },
        {
          id: 'cm5vn3lgf000o8b7mq69qga15',
          name: 'Klook Gift Card (EC)',
          typeId: 'Percentage',
          commission: 2.0,
          metadatas: [
            { languageId: 'EN_MY', name: 'Klook Gift Card' },
            { languageId: 'ZH_MY', name: 'Klook 礼品卡' },
          ],
        },
      ],
    },
  ],
};
