import { ErrorResult, OKResult } from "@/services/service-utils";
import { client } from "@/services/client";

export const getMyWallet = async (
  ...params: Parameters<typeof client.wallet.getWalletByCurrencyCode>
) => {
  try {
    const res = await client.wallet.getWalletByCurrencyCode(...params);
    if (res.ok) {
      return OKResult.create(res.data.data);
    }

    throw new Error(res.statusText);
  } catch (error) {
    return ErrorResult.create(error as Error);
  }
};

export const createUserWithdrawal = async (
  ...params: Parameters<typeof client.wallet.createUserWithdrawal>
) => {
  const res = await client.wallet.createUserWithdrawal(...params);
  if (res.ok) {
    return OKResult.create(res.data.data);
  }

  return ErrorResult.create(res.error.error);
};
