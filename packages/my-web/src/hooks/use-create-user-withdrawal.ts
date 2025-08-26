import { useSession } from "next-auth/react";
import useSWRMutation from "swr/mutation";
import { createUserWithdrawal } from "@/services/wallet";

export const useCreateUserWithdrawal = () => {
  const session = useSession();
  return useSWRMutation(
    "myWithdrawals",
    async (
      _,
      {
        arg,
      }: {
        arg: Parameters<typeof createUserWithdrawal>[1] & {
          userWalletId: Parameters<typeof createUserWithdrawal>[0];
        };
      }
    ) =>
      createUserWithdrawal(
        arg.userWalletId,
        {
          userPaymentMethodId: arg.userPaymentMethodId,
          amount: arg.amount,
        },
        {
          headers: {
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        }
      )
  );
};
