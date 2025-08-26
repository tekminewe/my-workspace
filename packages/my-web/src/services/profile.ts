import { ErrorResult, OKResult } from "@/services/service-utils";
import { client } from "@/services/client";

export const getMyProfile = async (
  ...params: Parameters<typeof client.profiles.getMyProfile>
) => {
  const res = await client.profiles.getMyProfile(...params);
  if (res.ok) {
    return OKResult.create(res.data.data);
  }

  return ErrorResult.create(new Error(res.error.error.message));
};
