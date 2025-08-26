"use client";

import { DataTable } from "@tekminewe/mint-ui/data-table";
import { ErrorMessage } from "@tekminewe/mint-ui/error-message";
import { UserAdvertiserClickDto } from "@/services/api";
import dayjs from "dayjs";
import { useMyClicks } from "@/hooks/use-my-clicks";
import { useState } from "react";

export const MyClicksTable = ({
  dictionary,
  language,
}: {
  language: string;
  dictionary: {
    common: {
      error: {
        title: string;
        message: string;
      };
    };
    myClicks: {
      date: string;
      merchant: string;
    };
  };
}) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMyClicks({
    page,
    pageSize: 25,
    language,
  });

  if (data && !data?.ok()) {
    return (
      <ErrorMessage
        title={dictionary.common.error.title}
        message={dictionary.common.error.message}
      />
    );
  }

  return (
    <DataTable<UserAdvertiserClickDto, any>
      isLoading={isLoading}
      data={data?.data.data ?? []}
      totalCount={data?.data.pagination.totalItems ?? 0}
      pageSize={data?.data.pagination.pageSize ?? 1}
      page={data?.data.pagination.currentPage ?? 1}
      onPaginationChange={({ page }) => {
        setPage(page);
      }}
      columns={[
        {
          dataKey: undefined,
          label: dictionary.myClicks.date,
          renderCell: ({ value }) => {
            return dayjs(value.clickedAt).format("lll");
          },
        },
        {
          dataKey: "advertiser",
          label: dictionary.myClicks.merchant,
          renderCell: ({ value }) => {
            if (value instanceof Object) {
              return <div className="font-semibold">{value.name}</div>;
            }
            return null;
          },
        },
      ]}
    />
  );
};
