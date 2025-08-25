import { AdminUpdatePostMutation } from "@/services/graphql";
import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "@/graphql/mutations/update-post";

export const useUpdatePostMutation = () => {
  return useMutation<AdminUpdatePostMutation>(UPDATE_POST);
};
