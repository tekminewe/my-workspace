import useSWR from "swr";
import { useSession } from "next-auth/react";
import { getMyCashbacks } from "@/services/cashback";

export const useMyCashbacks = ({
  page = 1,
  pageSize = 25,
  language = "en-US",
}: {
  page?: number;
  pageSize?: number;
  language?: string;
}) => {
  const { data } = useSession();
  return useSWR(
    ["myCashbacks", page],
    () =>
      getMyCashbacks(
        { page, pageSize },
        {
          headers: {
            "Accept-Language": language,
            Authorization: `Bearer ${data?.accessToken}`,
          },
        }
      ),
    {
      keepPreviousData: true,
    }
  );
};
