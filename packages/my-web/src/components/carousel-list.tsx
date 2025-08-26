"use client";

import { DataTable } from "@tekminewe/mint-ui/data-table";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { Badge } from "@tekminewe/mint-ui/badge";
import Image from "next/image";
import { LuPen } from "react-icons/lu";
import { IconButton } from "@tekminewe/mint-ui/icon-button";
import Link from "next/link";
import { cn } from "@tekminewe/mint-ui/utils";
import { Dictionary } from "@/dictionaries";
import { useQuery } from "@apollo/client";
import { GetAdminCarouselListQuery } from "@/services/graphql";
import { useSession } from "next-auth/react";
import { GET_ADMIN_CAROUSEL_LIST } from "@/graphql/queries/get-admin-carousel-list";

export const CarouselList = ({
  language,
  dictionary,
}: {
  language: string;
  dictionary: Dictionary["admin"]["carousel"]["list"];
}) => {
  const router = useRouter();
  const session = useSession();
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<GetAdminCarouselListQuery>(
    GET_ADMIN_CAROUSEL_LIST,
    {
      variables: {
        page,
        pageSize: 25,
      },
      context: {
        headers: {
          "Accept-Language": language,
          Authorization: `Bearer ${session?.data?.accessToken}`,
        },
      },
    }
  );

  const carousels = data?.carousels;
  const pagination = data?.carouselsPagination;

  return (
    <DataTable<GetAdminCarouselListQuery["carousels"][0], any>
      data={carousels ?? []}
      isLoading={loading}
      totalCount={pagination?.totalItems ?? 0}
      pageSize={pagination?.pageSize ?? 1}
      page={pagination?.currentPage ?? 1}
      showAddButton
      addButtonLabel={dictionary.addCarousel}
      onAddButtonClick={() => {
        router.push(`/${language}/admin/carousel/create`);
      }}
      onPaginationChange={({ page }) => {
        setPage(page);
      }}
      columns={[
        {
          label: dictionary.title,
          dataKey: "title",
        },
        {
          label: dictionary.image,
          dataKey: undefined,
          renderCell: ({ value }) => {
            return (
              <Image
                alt={value.title}
                src={`${value.image.url}`}
                width={100}
                height={100}
              />
            );
          },
        },
        {
          label: dictionary.startDate,
          dataKey: "startDate",
          renderCell: ({ value }) => {
            return dayjs(`${value}`).format("lll");
          },
        },
        {
          label: dictionary.endDate,
          dataKey: "endDate",
          renderCell: ({ value }) => {
            return dayjs(`${value}`).format("lll");
          },
        },
        {
          label: dictionary.status,
          dataKey: "status",
          renderCell: ({ value }) => {
            return (
              <Badge
                className={cn({
                  grayscale: value !== "Active",
                })}
              >
                {value === "Active" ? dictionary.active : dictionary.inactive}
              </Badge>
            );
          },
        },
        {
          label: dictionary.action,
          dataKey: undefined,
          renderCell: ({ value }) => {
            return (
              <div>
                <Link href={`/${language}/admin/carousel/${value.id}/edit`}>
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
  );
};
