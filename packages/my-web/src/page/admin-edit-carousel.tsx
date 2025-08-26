import { Header } from "@tekminewe/mint-ui/typography";
import { CarouselForm } from "@/components/carousel-form";
import { ServerComponentProps } from "@/types";
import { ErrorMessage } from "@tekminewe/mint-ui/error-message";
import { getSessionServer } from "@/services/auth/next";
import { getDictionary } from "@/dictionaries";
import { query } from "@/services/apollo-client-server";
import {
  AdvertiserStatusEnum,
  EditCarouselQueryQuery,
} from "@/services/graphql";
import { EDIT_CAROUSEL_QUERY } from "@/graphql/queries/edit-carousel-query";

export const AdminEditCarouselPage = async ({
  params,
}: ServerComponentProps<{ params: Promise<{ carouselId: string }> }>) => {
  const { lang, carouselId } = await params;
  const dictionary = await getDictionary(lang);
  const session = await getSessionServer();

  // Fetch carousel data, languages, and active advertisers in a single GraphQL query
  const { data } = await query<EditCarouselQueryQuery>({
    query: EDIT_CAROUSEL_QUERY,
    variables: {
      id: carouselId,
      page: 1,
      pageSize: 10000,
      statusId: AdvertiserStatusEnum.Active,
    },
    context: {
      headers: {
        "Accept-Language": lang,
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  });

  if (!data) {
    return (
      <ErrorMessage
        title={dictionary.common.error.title}
        message={dictionary.common.error.message}
      />
    );
  }

  const { carousel, languages, advertisers } = data;
  const cta = carousel.cta;

  return (
    <div>
      <Header className="mb-3">
        {dictionary.admin.carousel.manage.createCarousel}
      </Header>
      <CarouselForm
        languages={languages}
        language={lang}
        defaultFormValues={{
          id: carouselId,
          title: carousel.title,
          ctaType: cta.type,
          ctaPayloadAdvertiserId:
            cta.__typename === "CarouselCtaCashback"
              ? cta.payload.advertiserId
              : undefined,
          ctaPayloadLink:
            cta.__typename === "CarouselCtaLink" ? cta.payload.link : undefined,
          startDate: new Date(carousel.startDate),
          endDate: new Date(carousel.endDate),
          status: carousel.status === "Active",
          metadatas: carousel.metadatas.map((metadata) => ({
            imageId: metadata.image.id,
            image: metadata.image.url,
            languageId: metadata.languageId,
          })),
        }}
        advertisers={advertisers}
        dictionary={{
          ...dictionary.admin.carousel.manage,
          ...dictionary.common,
        }}
      />
    </div>
  );
};
