import { ErrorResult, OKResult } from "@/services/service-utils";
import { client } from "@/services/client";

export const getMyWithdrawals = async (
  ...params: Parameters<typeof client.withdrawals.getUserWithdrawals>
) => {
  const res = await client.withdrawals.getUserWithdrawals(...params);
  if (res.ok) {
    return OKResult.create(res.data);
  }

  return ErrorResult.create(new Error(res.error.error.message));
};
