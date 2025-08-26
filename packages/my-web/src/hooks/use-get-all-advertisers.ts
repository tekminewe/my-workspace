import { client } from "@/services/client";
import useSWRInfinite from "swr/infinite";

export const useAllAdvertisers = ({
  pageSize = 25,
  locale = "en-US",
}: {
  locale?: string;
  pageSize?: number;
}) => {
  return useSWRInfinite(
    (page) => ["all-advertisers", page],
    ([, page]) =>
      client.affiliate.getAllAdvertisers(
        { page: page + 1, pageSize },
        {
          headers: {
            "Accept-Language": locale,
          },
        }
      )
  );
};
