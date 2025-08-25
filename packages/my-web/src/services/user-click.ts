import { ErrorResult, OKResult } from "@/services/service-utils";
import { client } from "@/services/client";

export const getMyClicks = async (
  ...params: Parameters<typeof client.affiliate.getMyClicks>
) => {
  try {
    const res = await client.affiliate.getMyClicks(...params);
    if (res.ok) {
      return OKResult.create(res.data);
    }

    throw new Error(res.statusText);
  } catch (error) {
    return ErrorResult.create(error as Error);
  }
};
