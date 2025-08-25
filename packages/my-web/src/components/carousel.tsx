"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import { GetHomeQuery } from "@/services/graphql";
import Image from "next/image";
import { useClientNavigation } from "@/hooks/use-client-navigation";
import { DialogRoot } from "@tekminewe/mint-ui/dialog";
import { GuestDialog } from "@/components/guest-dialog";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Dictionary } from "@/dictionaries";

export const Carousel = ({
  carousels,
  dictionary,
}: {
  carousels: GetHomeQuery["carousels"];
  dictionary: Dictionary["guestDialog"];
}) => {
  const { push } = useClientNavigation();
  const session = useSession();
  const [carousel, setCarousel] = useState<GetHomeQuery["carousels"][0] | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (carousel) {
      if (carousel.cta.__typename === "CarouselCtaLink") {
        window.open(carousel.cta.payload.link, "_blank");
      } else if (carousel.cta.__typename === "CarouselCtaCashback") {
        if (session.status === "authenticated") {
          push(`/store/${carousel.cta.payload.advertiserSlug}/redirect`);
          return;
        }

        setDialogOpen(true);
      }
    } else {
      setDialogOpen(false);
    }
  }, [carousel, push, session.status]);

  return (
    <DialogRoot
      onOpenChange={(open) => !open && setCarousel(null)}
      open={dialogOpen}
    >
      <div className="container mx-auto">
        <ResponsiveCarousel
          showThumbs={false}
          showArrows={false}
          showStatus={false}
          infiniteLoop
        >
          {carousels.map((carousel, index) => (
            <div
              key={carousel.id}
              className="cursor-pointer"
              onClick={() => {
                setCarousel(carousel);
              }}
            >
              <Image
                src={carousel.image.url}
                width={1600}
                height={900}
                alt={`Carousel-${index}`}
              />
            </div>
          ))}
        </ResponsiveCarousel>
      </div>
      <GuestDialog
        dictionary={dictionary}
        advertiserRedirectUrl={
          carousel?.cta.__typename === "CarouselCtaCashback"
            ? carousel.cta.payload.advertiserRedirectUrl
            : ""
        }
        advertiserLogoUrl={
          carousel?.cta.__typename === "CarouselCtaCashback"
            ? carousel.cta.payload.advertiserLogoUrl
            : ""
        }
        advertiserName={
          carousel?.cta.__typename === "CarouselCtaCashback"
            ? carousel.cta.payload.advertiserName
            : ""
        }
        advertiserCashbackRate={
          carousel?.cta.__typename === "CarouselCtaCashback"
            ? carousel.cta.payload.advertiserCashbackRate
            : 0
        }
      />
    </DialogRoot>
  );
};
