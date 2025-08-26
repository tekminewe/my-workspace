import { ErrorResult, OKResult } from "@/services/service-utils";
import { client } from "@/services/client";

export const uploadMedia = async (
  ...args: Parameters<typeof client.media.uploadMedia>
) => {
  try {
    const res = await client.media.uploadMedia(...args);

    if (res.ok) {
      return OKResult.create(res.data.data);
    }

    return ErrorResult.create(new Error(res.error));
  } catch (error) {
    return ErrorResult.create(error as Error);
  }
};
