import { ErrorResult, OKResult } from "@/services/service-utils";
import { client } from "@/services/client";

export const getTags = async (
  ...params: Parameters<typeof client.tags.getTags>
) => {
  try {
    const res = await client.tags.getTags(...params);

    if (res.ok) {
      return OKResult.create(res.data.data);
    }

    return ErrorResult.create(res.error as Error);
  } catch (error) {
    return ErrorResult.create(error as Error);
  }
};
