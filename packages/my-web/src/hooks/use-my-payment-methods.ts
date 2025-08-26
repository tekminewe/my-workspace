import useSWR from "swr";
import { getMyPaymentMethods } from "@/services/user-payment-method";
import { useSession } from "next-auth/react";

export const useMyPaymentMethods = (
  data: Parameters<typeof getMyPaymentMethods>[0]
) => {
  const session = useSession();
  return useSWR("myPaymentMethods", async () =>
    getMyPaymentMethods(data, {
      headers: {
        Authorization: `Bearer ${session.data?.accessToken}`,
      },
    })
  );
};
