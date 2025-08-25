import { Header } from "@tekminewe/mint-ui/typography";
import { CarouselForm } from "@/components/carousel-form";
import { ServerComponentProps } from "@/types";
import { getSessionServer } from "@/services/auth/next";
import { ErrorMessage } from "@tekminewe/mint-ui/error-message";
import { getDictionary } from "@/dictionaries";
import { GET_SITE_AND_ADVERTISERS } from "@/graphql/queries/get-site-and-advertisers";
import {
  AdvertiserStatusEnum,
  GetSiteAndAdvertisersQuery,
} from "@/services/graphql";
import { query } from "@/services/apollo-client-server";
import { AdvertiserDto } from "@/services/api";

export const AdminCreateCarouselPage = async ({
  params,
}: ServerComponentProps<any>) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const session = await getSessionServer();

  // Fetch both site data and active advertisers in a single GraphQL query
  const { data } = await query<GetSiteAndAdvertisersQuery>({
    query: GET_SITE_AND_ADVERTISERS,
    variables: {
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

  const { languages, advertisers } = data;

  return (
    <div>
      <Header className="mb-3">
        {dictionary.admin.carousel.manage.createCarousel}
      </Header>
      <CarouselForm
        languages={languages}
        language={lang}
        advertisers={advertisers}
        dictionary={{
          ...dictionary.admin.carousel.manage,
          ...dictionary.common,
        }}
      />
    </div>
  );
};
