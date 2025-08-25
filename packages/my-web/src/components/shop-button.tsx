"use client";

import { useClientNavigation } from "@/hooks/use-client-navigation";
import { Button } from "@tekminewe/mint-ui/button";
import { ReactNode, useState } from "react";
import { useSession } from "next-auth/react";
import { DialogRoot } from "@tekminewe/mint-ui/dialog";
import { GuestDialog } from "@/components/guest-dialog";
import { Dictionary } from "@/dictionaries";

export const ShopNowButton = ({
  advertiserSlug,
  children,
  dictionary,
  advertiserName,
  advertiserLogoUrl,
  advertiserCashbackRate,
}: {
  advertiserSlug: string;
  children: ReactNode;
  dictionary?: Dictionary["guestDialog"];
  advertiserName?: string;
  advertiserLogoUrl?: string;
  advertiserCashbackRate?: number;
}) => {
  const { push } = useClientNavigation();
  const session = useSession();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = () => {
    if (session.status === "authenticated") {
      push(`/store/${advertiserSlug}/redirect`);
      return;
    }

    setDialogOpen(true);
  };

  return (
    <>
      <Button size="lg" onClick={handleClick}>
        {children}
      </Button>

      {dictionary && (
        <DialogRoot
          open={dialogOpen}
          onOpenChange={(open) => !open && setDialogOpen(false)}
        >
          <GuestDialog
            dictionary={dictionary}
            advertiserRedirectUrl={`/store/${advertiserSlug}/redirect`}
            advertiserLogoUrl={advertiserLogoUrl || ""}
            advertiserName={advertiserName || ""}
            advertiserCashbackRate={advertiserCashbackRate || 0}
          />
        </DialogRoot>
      )}
    </>
  );
};
