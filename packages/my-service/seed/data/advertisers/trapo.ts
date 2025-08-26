import { AdvertiserData } from '../advertiser.types';

export const trapo: AdvertiserData = {
  id: 'cm5vn3pw6006g8b7mnr85s5dk',
  slug: 'trapo',
  statusId: 'Active',
  logo: {
    id: 'cm5vn3pw7006h8b7m1y35sb45',
    filePath: 'advertisers/trapo.webp',
    mimeType: 'image/webp',
  },
  categories: [],
  providerReferences: [
    {
      providerId: 'InvolveAsia',
      providerReferenceId: '4580',
    },
  ],
  metadatas: [
    {
      languageId: 'EN_MY',
      name: 'Trapo',
      description:
        "<p>TRAPO is an automotive accessories brand and we have been listed as the No.1 online best selling car mat in Malaysia since 2016. We provide a full tailor fit car mat solution for each customer's car model integrated with our manufacturing 4.0 model to provide Online to Offline(O2O) experience.</p><p>Currently, we offer car mats for more than 800 car models, which includes brands like Honda, Toyota, Perodua, Proton, BMW, Mercedes, Volkswagen and many other famous brands in ASEAN countries.</p>",
    },
    {
      languageId: 'ZH_MY',
      name: 'Trapo',
      description:
        '<p>TRAPO是一个汽车配件品牌，自2016年以来，我们一直被列为马来西亚网上最畅销汽车垫第一名。</p><p>目前，我们为 800 多种车型提供汽车脚垫，其中包括本田、丰田、Perodua、宝顿、宝马、奔驰、大众等品牌以及东盟国家的许多其他知名品牌。</p>',
    },
  ],
  commissions: [
    {
      id: 'cm5vn3pw7006j8b7mhmx8ihxt',
      providerReferenceId: '4580',
      providerId: 'InvolveAsia',
      commissionShareTypeId: 'Percentage',
      commissionShare: 10,
      dayToPayout: 35,
      dayToValidate: 27,
      url: 'https://invle.co/aff_m?offer_id=103426&aff_id=110914&source=ia_api_offer',
      statusId: 'Active',
      commissionRows: [
        {
          id: 'cm5vn3pw7006k8b7m5slcl515',
          name: 'Commission for every successful sale',
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
