import useSWR from "swr";
import { getMyClicks } from "@/services/user-click";
import { useSession } from "next-auth/react";

export const useMyClicks = ({
  page = 1,
  pageSize = 25,
  language = "en-US",
}: {
  language?: string;
  page?: number;
  pageSize?: number;
}) => {
  const { data } = useSession();
  return useSWR(
    ["myClicks", page],
    () =>
      getMyClicks(
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
