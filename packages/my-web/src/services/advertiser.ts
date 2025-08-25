import { ErrorResult, OKResult } from "@/services/service-utils";
import { client } from "@/services/client";

export const getAdvertiserBySlug = async (
  ...params: Parameters<typeof client.affiliate.getAdvertiserBySlug>
) => {
  try {
    const res = await client.affiliate.getAdvertiserBySlug(params[0], {
      ...params[1],
      next: {
        revalidate: 0,
        ...params[1]?.next,
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

export const getPopularAdvertisers = async (
  ...params: Parameters<typeof client.affiliate.getPopularAdvertisers>
) => {
  const res = await client.affiliate.getPopularAdvertisers(...params);
  if (res.ok) {
    return OKResult.create(res.data.data);
  }

  return ErrorResult.create(new Error(res.error.error.message));
};

export const clickAdvertiser = async (
  ...params: Parameters<typeof client.affiliate.createUserAdvertiserClick>
) => {
  try {
    const res = await client.affiliate.createUserAdvertiserClick(...params);
    if (res.ok) {
      return OKResult.create(res.data.data);
    }

    throw new Error(res.statusText);
  } catch (error) {
    return ErrorResult.create(error as Error);
  }
};
