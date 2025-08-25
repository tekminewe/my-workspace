import useSWR from "swr";
import { useSession } from "next-auth/react";
import { getActivePaymentChannels } from "@/services/payment-channel";

export const useActivePaymentChannels = ({
  language,
}: {
  language: string;
}) => {
  const session = useSession();
  return useSWR(
    "activePaymentChannels",
    async () =>
      getActivePaymentChannels({
        headers: {
          Authorization: `Bearer ${session.data?.accessToken}`,
          "Accept-Language": language,
        },
      }),
    {
      revalidateOnFocus: false,
    }
  );
};
