import { ErrorResult, OKResult } from "@/services/service-utils";
import { client } from "@/services/client";

export const getActivePaymentChannels = async (
  ...params: Parameters<typeof client.paymentChannels.getActivePaymentChannels>
) => {
  try {
    const res = await client.paymentChannels.getActivePaymentChannels(
      ...params
    );
    if (res.ok) {
      return OKResult.create(res.data.data);
    }

    throw new Error(res.statusText);
  } catch (error) {
    return ErrorResult.create(error as Error);
  }
};
