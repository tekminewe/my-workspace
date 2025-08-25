import { Header } from "@tekminewe/mint-ui/typography";
import { CarouselList } from "@/components/carousel-list";
import { ServerComponentProps } from "@/types";
import { getDictionary } from "@/dictionaries";
import { getSessionServer } from "@/services/auth/next";

export const CarouselListPage = async ({
  params,
}: ServerComponentProps<any>) => {
  const { lang } = await params;
  const session = await getSessionServer();
  const dictionary = await getDictionary(lang);
  return (
    <div>
      <Header>{dictionary.admin.carousel.list.carousel}</Header>
      <CarouselList
        dictionary={dictionary.admin.carousel.list}
        language={lang}
      />
    </div>
  );
};
