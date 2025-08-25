import { AdvertiserData } from '../advertiser.types';

export const totalImage: AdvertiserData = {
  id: 'cm5vn3pgi005p8b7mfnu6onld',
  slug: 'total-image',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3pgi005q8b7mvl695opm',
    filePath: 'advertisers/total-image.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '4514',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Total Image',
      description:
        '<p>Total Image range of beauty, slimming and personal care products can be found at all major pharmacies such as Guardian, Watsons, Caring, Aeon Wellness and other independent pharmacies.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Total Image',
      description:
        '<p>Total Image 的美容、纤体和个人护理产品系列在所有主要药房均有销售，如佳定、屈臣氏、家乐福、永旺及其他独立药房。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3pgi005s8b7mghs7ywbe',
      providerReferenceId: '4514',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 35,
      dayToValidate: 18,
      url: 'https://invle.co/aff_m?offer_id=103360&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3pgi005t8b7miew9pqvk',
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
