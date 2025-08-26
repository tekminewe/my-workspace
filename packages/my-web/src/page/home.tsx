import { PopularMerchants } from "@/components/popular-merchants";
import { query } from "@/services/apollo-client-server";
import { GetHomeQuery, GetSiteQuery } from "@/services/graphql";
import { HowItWorks } from "@/components/how-it-works";
import { ServerComponentProps } from "@/types";
import { GET_SITE } from "@/graphql/queries/get-site";
import { Carousel } from "@/components/carousel";
import { Hero } from "@/components/hero";
import { getDictionary } from "@/dictionaries";
import { GET_HOME } from "@/graphql/queries/get-home";

export async function HomePage({ params }: ServerComponentProps<any>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  const { data: siteData } = await query<GetSiteQuery>({
    query: GET_SITE,
    context: {
      headers: {
        "Accept-Language": lang,
      },
    },
  });
  const site = siteData.site;

  if (!site) {
    throw new Error("Failed to fetch site data");
  }

  const data = await query<GetHomeQuery>({
    query: GET_HOME,
    context: {
      headers: {
        "Accept-Language": lang,
      },
    },
  });

  return (
    <div>
      {data.data.carousels.length > 0 ? (
        <Carousel
          dictionary={dictionary["guestDialog"]}
          carousels={data.data.carousels}
        />
      ) : (
        <Hero dictionary={dictionary} />
      )}
      <HowItWorks language={lang} />
      <PopularMerchants language={lang} />
    </div>
  );
}
