import { useSession } from "next-auth/react";
import useSWRMutation from "swr/mutation";
import { deleteUserPaymentMethod } from "@/services/user-payment-method";

export const useDeleteUserPaymentMethod = () => {
  const session = useSession();
  return useSWRMutation(
    "myPaymentMethods",
    async (
      _,
      { arg }: { arg: Parameters<typeof deleteUserPaymentMethod>[0] }
    ) =>
      deleteUserPaymentMethod(arg, {
        headers: {
          Authorization: `Bearer ${session.data?.accessToken}`,
        },
      })
  );
};
