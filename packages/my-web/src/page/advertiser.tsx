import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isMobile } from '@/utils/mobile';
import { MerchantDetailMobile } from '@/components/merchant-detail.mobile';
import { MerchantDetail } from '@/components/merchant-detail';
import { ServerComponentProps } from '@/types';
import { gql } from '@apollo/client';
import { query } from '@/services/apollo-client-server';
import {
  AdvertiserCampaignStatusEnum,
  GetAdvertiserBySlugQuery,
} from '@/services/graphql';

// GraphQL query to get advertiser by slug
const GET_ADVERTISER_BY_SLUG = gql`
  query GetAdvertiserBySlug(
    $slug: String!
    $endDateGt: DateTime!
    $campaignStatusId: AdvertiserCampaignStatusEnum!
  ) {
    advertiser(slug: $slug) {
      id
      name
      slug
      description
      statusId
      createdAt
      updatedAt
      logo {
        id
        url
      }
      categories {
        id
        name
      }
      commission(statusId: Active, rowStatusId: Active) {
        calculatedCommission
        dayToValidate
        dayToPayout
        url
        commissionRows {
          id
          name
          calculatedCommission
          typeId
        }
      }
    }
    advertiserCampaigns(
      advertiserSlug: $slug
      endDateGt: $endDateGt
      statusId: $campaignStatusId
    ) {
      id
      name
      startDate
      endDate
      description
      voucherCodes
      url
      banner {
        url
      }
    }
  }
`;

type AdvertiserPageProps = ServerComponentProps<{
  params: Promise<{
    slug: string;
  }>;
}>;

export async function generateMetadata({
  params,
}: AdvertiserPageProps): Promise<Metadata> {
  const { slug, lang } = await params;

  const result = await query<GetAdvertiserBySlugQuery>({
    query: GET_ADVERTISER_BY_SLUG,
    variables: {
      slug,
      endDateGt: new Date(),
      campaignStatusId: AdvertiserCampaignStatusEnum.Active,
    },
    context: {
      headers: {
        'Accept-Language': lang,
      },
    },
  });

  if (!result.data?.advertiser) {
    return {
      title: 'Not Found',
    };
  }

  const advertiser = result.data.advertiser;

  return {
    title: advertiser.name,
    description: advertiser.description,
    openGraph: {
      images: [
        {
          url: advertiser.logo?.url,
          alt: advertiser.name,
          width: 500,
          height: 500,
        },
      ],
      publishedTime: advertiser.createdAt,
      modifiedTime: advertiser.updatedAt,
      title: advertiser.name,
      description: advertiser.description,
      locale: lang,
    },
  };
}

export async function AdvertiserPage({
  params,
}: ServerComponentProps<AdvertiserPageProps>) {
  const { slug, lang } = await params;

  const result = await query<GetAdvertiserBySlugQuery>({
    query: GET_ADVERTISER_BY_SLUG,
    variables: {
      slug,
      startDateLte: new Date(),
      endDateGt: new Date(),
      campaignStatusId: AdvertiserCampaignStatusEnum.Active,
    },
    context: {
      headers: {
        'Accept-Language': lang,
      },
    },
  });

  if (!result.data?.advertiser) {
    return notFound();
  }

  const advertiser = result.data.advertiser;
  const campaigns = result.data.advertiserCampaigns || [];

  if (await isMobile()) {
    return (
      <MerchantDetailMobile
        advertiser={advertiser}
        campaigns={campaigns}
        language={lang}
      />
    );
  }
  return (
    <MerchantDetail
      advertiser={advertiser}
      campaigns={campaigns}
      language={lang}
    />
  );
}
