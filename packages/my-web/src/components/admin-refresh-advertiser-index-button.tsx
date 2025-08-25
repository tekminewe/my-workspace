"use client";

import { RefreshAdvertiserSearchIndexMutation } from "@/services/graphql";
import { REFRESH_ADVERTISER_SEARCH_INDEX } from "@/graphql/queries/refresh-advertiser-search-index";
import { useMutation } from "@apollo/client";
import { Button } from "@tekminewe/mint-ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { LuRefreshCw } from "react-icons/lu";
import { toast } from "react-toastify";

interface AdminRefreshAdvertiserIndexButtonProps {
  languageId: string;
  buttonText: string;
}

export const AdminRefreshAdvertiserIndexButton = ({
  languageId,
  buttonText,
}: AdminRefreshAdvertiserIndexButtonProps) => {
  const session = useSession();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [refreshIndex] = useMutation<RefreshAdvertiserSearchIndexMutation>(
    REFRESH_ADVERTISER_SEARCH_INDEX,
    {
      context: {
        headers: {
          "Accept-Language": languageId,
          Authorization: `Bearer ${session?.data?.accessToken}`,
        },
      },
    }
  );

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      const response = await refreshIndex({
        variables: {
          data: {}, // Empty object to refresh all advertisers
        },
      });

      if (response.data?.refreshAdvertiserSearchIndex.success) {
        toast.success("Advertiser search index refreshed successfully");
      } else {
        toast.error("Failed to refresh advertiser search index");
      }
    } catch (error) {
      console.error("Error refreshing advertiser search index:", error);
      toast.error("An error occurred while refreshing advertiser search index");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Button onClick={handleRefresh} disabled={isRefreshing}>
      <LuRefreshCw className={isRefreshing ? "animate-spin" : ""} />
      {buttonText}
    </Button>
  );
};
