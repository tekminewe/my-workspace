import { ErrorResult, OKResult } from "@/services/service-utils";
import { client } from "@/services/client";

export const getMyCashbacks = async (
  ...params: Parameters<typeof client.affiliate.getMyCashbacks>
) => {
  try {
    const res = await client.affiliate.getMyCashbacks(...params);
    if (res.ok) {
      return OKResult.create(res.data);
    }

    throw new Error(res.statusText);
  } catch (error) {
    return ErrorResult.create(error as Error);
  }
};
