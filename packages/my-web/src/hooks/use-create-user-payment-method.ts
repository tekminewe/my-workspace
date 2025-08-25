import { createUserPaymentMethod } from "@/services/user-payment-method";
import { useSession } from "next-auth/react";
import useSWRMutation from "swr/mutation";

export const useCreateUserPaymentMethod = () => {
  const session = useSession();
  return useSWRMutation(
    "myPaymentMethods",
    async (
      _,
      { arg }: { arg: Parameters<typeof createUserPaymentMethod>[0] }
    ) =>
      createUserPaymentMethod(arg, {
        headers: {
          Authorization: `Bearer ${session.data?.accessToken}`,
        },
      })
  );
};
