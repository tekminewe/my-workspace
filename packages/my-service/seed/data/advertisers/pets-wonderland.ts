import { AdvertiserData } from '../advertiser.types';

export const petsWonderland: AdvertiserData = {
  id: 'cm5vn3ng5002h8b7m3h61oz0j',
  slug: 'pets-wonderland',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3ng5002i8b7m9ews28vg',
    filePath: 'advertisers/pets-wonderland.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '2205',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Pets Wonderland',
      description:
        '<p>Pets Wonderland, a pronounced name in the history of pet retailing in Malaysia, has established itself as one of the largest and comprehensive pet retail outlets from the proofread my essay heart of Klang Valley since 2001. Here are some of the highlights throughout the history:\nOur commitment to our customers is to be the most complete and value oriented one-stop shopping centre for pet owners to obtain supplies and services for their pets. Our traditional strengths are being innovative, setting market trends and customer service oriented work culture continues to improve the shopping experience of our customers and adding incremental value to our services.</p>',
    },
    {
      languageId: 'ZH_MY',
      name: 'Pets Wonderland',
      description:
        '<p> Pets Wonderland是马来西亚宠物零售业历史上一个响亮的名字，自 2001 年以来，它已成为巴生谷（Klang Valley）中心地带最大的综合性宠物零售店之一。以下是整个历史中的一些亮点：\n我们对客户的承诺是成为最完整、最有价值的一站式购物中心，为宠物主人提供宠物用品和服务。我们的传统优势在于创新、引领市场趋势以及以客户服务为导向的工作文化，这些优势将不断改善客户的购物体验，并为我们的服务增添更多价值。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3ng5002k8b7myfv5g0cj',
      providerReferenceId: '2205',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 35,
      dayToValidate: 15,
      url: 'https://invol.co/aff_m?offer_id=101056&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3ng5002l8b7mlsx2kk1y',
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
