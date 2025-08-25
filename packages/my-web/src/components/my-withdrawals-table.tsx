"use client";

import { DataTable } from "@tekminewe/mint-ui/data-table";
import { ErrorMessage } from "@tekminewe/mint-ui/error-message";
import { UserWithdrawalDto } from "@/services/api";
import dayjs from "dayjs";
import { useState } from "react";
import { useMyWithdrawals } from "@/hooks/use-my-withdrawals";
import { formatCurrency } from "@/utils/currency";
import { Badge } from "@tekminewe/mint-ui/badge";

export const MyWithdrawalsTable = ({
  dictionary,
  locale,
}: {
  locale: string;
  dictionary: {
    common: {
      error: {
        title: string;
        message: string;
      };
    };
    myWithdrawals: {
      date: string;
      description: string;
      amount: string;
      status: string;
    };
  };
}) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMyWithdrawals({
    page,
    pageSize: 25,
    locale,
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
    <DataTable<UserWithdrawalDto, any>
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
          label: dictionary.myWithdrawals.date,
          renderCell: ({ value }) => {
            return dayjs(value.createdAt).format("lll");
          },
        },
        {
          dataKey: undefined,
          label: dictionary.myWithdrawals.description,
          renderCell: ({ value }) => {
            if (value instanceof Object) {
              return (
                <div>
                  <div className="font-semibold">
                    {value.paymentMethod.paymentChannel.type}
                  </div>
                  <div className="caption">{`${value.paymentMethod.paymentChannel.name} ${value.paymentMethod.accountNumber}`}</div>
                </div>
              );
            }
            return null;
          },
        },
        {
          dataKey: "amount",
          label: dictionary.myWithdrawals.amount,
          renderCell: ({ value }) => {
            return (
              <div className="font-semibold">
                {formatCurrency({
                  amount: +value,
                  locale: locale,
                  currency: "MYR",
                })}
              </div>
            );
          },
        },
        {
          dataKey: undefined,
          label: dictionary.myWithdrawals.status,
          renderCell: ({ value }) => {
            if (value instanceof Object) {
              let color: undefined | "gray" | "red" = "red";
              if (value.statusId === "Completed") {
                color = undefined;
              } else if (value.statusId === "Pending") {
                color = "gray";
              }
              return <Badge color={color}>{value.statusId}</Badge>;
            }
            return null;
          },
        },
      ]}
    />
  );
};
