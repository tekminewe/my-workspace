"use client";

import { FetchAdvertiserModal } from "@/components/fetch-advertiser-modal";
import { Button } from "@tekminewe/mint-ui/button";
import { useState } from "react";

interface FetchAdvertiserButtonProps {
  language: string;
  dictionary: {
    admin: {
      advertiser: {
        manage: {
          fetchAdvertiser: string;
          fetchAdvertiserName: string;
          fetchButton: string;
          fetchAdvertiserSuccess: string;
        };
      };
    };
    common: {
      cancel: string;
    };
  };
}

export const FetchAdvertiserButton = ({
  language,
  dictionary,
}: FetchAdvertiserButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        {dictionary.admin.advertiser.manage.fetchAdvertiser}
      </Button>
      <FetchAdvertiserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        language={language}
        dictionary={{
          fetchAdvertiser: dictionary.admin.advertiser.manage.fetchAdvertiser,
          fetchAdvertiserName:
            dictionary.admin.advertiser.manage.fetchAdvertiserName,
          fetchButton: dictionary.admin.advertiser.manage.fetchButton,
          fetchAdvertiserSuccess:
            dictionary.admin.advertiser.manage.fetchAdvertiserSuccess,
          cancel: dictionary.common.cancel,
        }}
      />
    </>
  );
};
