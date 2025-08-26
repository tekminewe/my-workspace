import useSWR from "swr";
import { useSession } from "next-auth/react";
import { getMyWithdrawals } from "@/services/withdrawal";

export const useMyWithdrawals = ({
  page = 1,
  pageSize = 25,
  locale = "en-US",
}: {
  locale?: string;
  page?: number;
  pageSize?: number;
}) => {
  const { data } = useSession();
  return useSWR(
    ["myWithdrawals", page],
    () =>
      getMyWithdrawals(
        { page, pageSize },
        {
          headers: {
            "Accept-Language": locale,
            Authorization: `Bearer ${data?.accessToken}`,
          },
        }
      ),
    {
      keepPreviousData: true,
    }
  );
};
