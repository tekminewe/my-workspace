import useSWRMutation from "swr/mutation";
import { clickAdvertiser } from "@/services/advertiser";

export const useClickAdvertiser = () => {
  return useSWRMutation(
    "click-advertiser",
    (_, { arg }: { arg: { advertiserId: string } }) =>
      clickAdvertiser(arg.advertiserId)
  );
};
