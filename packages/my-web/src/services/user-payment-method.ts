import { ErrorResult, OKResult } from "@/services/service-utils";
import { client } from "@/services/client";

export const getMyPaymentMethods = async (
  ...params: Parameters<typeof client.paymentMethods.getMyPaymentMethods>
) => {
  try {
    const res = await client.paymentMethods.getMyPaymentMethods(...params);
    if (res.ok) {
      return OKResult.create(res.data.data);
    }

    throw new Error(res.statusText);
  } catch (error) {
    return ErrorResult.create(error as Error);
  }
};

export const createUserPaymentMethod = async (
  ...params: Parameters<typeof client.paymentMethods.createUserPaymentMethod>
) => {
  try {
    const res = await client.paymentMethods.createUserPaymentMethod(...params);
    if (res.ok) {
      return OKResult.create(res.data.data);
    }
    return ErrorResult.create(res.error.error);
  } catch (error) {
    return ErrorResult.create(error as Error);
  }
};

export const deleteUserPaymentMethod = async (
  ...params: Parameters<typeof client.paymentMethods.deletePaymentMethod>
) => {
  try {
    const res = await client.paymentMethods.deletePaymentMethod(...params);
    if (res.ok) {
      return OKResult.create(res.data.data);
    }
    return ErrorResult.create(res.error.error);
  } catch (error) {
    return ErrorResult.create(error as Error);
  }
};
