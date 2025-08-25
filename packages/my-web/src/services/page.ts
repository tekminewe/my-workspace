import { ErrorResult, OKResult } from "@/services/service-utils";
import { client } from "@/services/client";

export const getPage = async (
  ...params: Parameters<typeof client.page.getPageBySlug>
) => {
  try {
    const res = await client.page.getPageBySlug(params[0], {
      ...params[1],
      next: {
        revalidate: 0,
        ...params[1]?.next,
      },
    });
    if (res.ok) {
      return OKResult.create(res.data.data);
    }

    return ErrorResult.create(res.error as Error);
  } catch (error) {
    return ErrorResult.create(error as Error);
  }
};
