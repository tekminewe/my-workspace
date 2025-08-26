import { ErrorResult, OKResult } from "@/services/service-utils";
import { client } from "@/services/client";

export const getPendingBalance = async (
  ...params: Parameters<typeof client.affiliate.getPendingBalance>
) => {
  try {
    const res = await client.affiliate.getPendingBalance({
      ...params[0],
      next: {
        revalidate: 0,
        ...params[0]?.next,
      },
    });
    if (res.ok) {
      return OKResult.create(res.data.data);
    }

    throw new Error(res.statusText);
  } catch (error) {
    return ErrorResult.create(error as Error);
  }
};
