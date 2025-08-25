"use client";

import { Dictionary } from "@/dictionaries";
import {
  AdminAdvertiserCampaignListQuery,
  AdvertiserCampaignStatusEnum,
} from "@/services/graphql";
import { gql, useQuery } from "@apollo/client";
import { Badge } from "@tekminewe/mint-ui/badge";
import { DataTable } from "@tekminewe/mint-ui/data-table";
import { IconButton } from "@tekminewe/mint-ui/icon-button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LuPen } from "react-icons/lu";

const QUERY = gql(/* GraphQL */ `
  query AdminAdvertiserCampaignList {
    advertiserCampaigns {
      id
      advertiserId
      providerId
      providerReferenceId
      startDate
      endDate
      statusId
      name
      banner {
        url
      }
      advertiser {
        id
        name
      }
    }
  }
`);

export const AdminCampaignTable = ({
  lang,
  dictionary,
}: {
  lang: string;
  dictionary: Dictionary["admin"]["campaign"]["list"];
}) => {
  const session = useSession();
  const [page, setPage] = useState(1);

  const { data, loading } = useQuery<AdminAdvertiserCampaignListQuery>(QUERY, {
    context: {
      headers: {
        "Accept-Language": lang,
        Authorization: `Bearer ${session?.data?.accessToken}`,
      },
    },
  });

  const campaigns = data?.advertiserCampaigns || [];

  return (
    <div>
      <DataTable<(typeof campaigns)[0], any>
        data={campaigns}
        isLoading={loading}
        totalCount={campaigns.length}
        pageSize={10}
        page={page}
        onPaginationChange={({ page }) => {
          setPage(page);
        }}
        columns={[
          {
            label: dictionary.banner,
            dataKey: undefined,
            renderCell: ({ value }: { value: any }) => {
              return value.banner ? (
                <div className="h-10 w-20 relative">
                  <Image
                    src={value.banner.url}
                    alt={value.name}
                    width={80}
                    height={40}
                    className="object-cover rounded"
                  />
                </div>
              ) : null;
            },
          },
          {
            label: dictionary.campaignName,
            dataKey: "name",
          },
          {
            label: dictionary.advertiser,
            dataKey: undefined,
            renderCell: ({ value }: { value: any }) => {
              return value.advertiser?.name || "-";
            },
          },
          {
            label: dictionary.providerId,
            dataKey: "providerId",
          },
          {
            label: dictionary.startDate,
            dataKey: "startDate",
            renderCell: ({ value }: { value: any }) => {
              return value ? new Date(value).toLocaleString() : "-";
            },
          },
          {
            label: dictionary.endDate,
            dataKey: "endDate",
            renderCell: ({ value }: { value: any }) => {
              return value ? new Date(value).toLocaleString() : "-";
            },
          },
          {
            label: dictionary.status,
            dataKey: undefined,
            renderCell: ({ value }: { value: any }) => {
              return (
                <Badge>
                  {value.statusId === AdvertiserCampaignStatusEnum.Active
                    ? dictionary.active
                    : dictionary.inactive}
                </Badge>
              );
            },
          },
          {
            label: dictionary.actionLabel,
            dataKey: undefined,
            renderCell: ({ value }: { value: any }) => {
              return (
                <div>
                  <Link
                    href={`/${lang}/admin/advertiser-campaign/${value.id}/edit`}
                  >
                    <IconButton>
                      <LuPen />
                    </IconButton>
                  </Link>
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
};
