import { getDictionary } from '@/dictionaries';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/shared-navbar';
import { NavbarMobile } from '@/components/navbar.mobile';
import { GET_SITE_WITH_METADATA } from '@/graphql/queries/get-site-with-metadata';
import { GetSiteWithMetadataQuery } from '@/services/graphql';
import { query } from '@/services/apollo-client-server';
import { isMobile } from '@/utils/mobile';
import { ReactNode } from 'react';

export default async function Layout(props: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;

  const { lang } = params;

  const { children } = props;

  const dictionary = await getDictionary(lang);

  const { data } = await query<GetSiteWithMetadataQuery>({
    query: GET_SITE_WITH_METADATA,
    context: {
      headers: {
        'Accept-Language': lang,
      },
    },
  });

  const site = data.site;

  if (!site) {
    throw new Error('Failed to fetch site data');
  }

  const showMobile = await isMobile();

  return (
    <div className="grid grid-rows-[auto,minmax(0,1fr),auto] min-h-screen">
      {showMobile ? (
        <NavbarMobile
          dictionary={dictionary}
          language={lang}
          site={site}
          languages={data.languages || []}
        />
      ) : (
        <Navbar
          dictionary={dictionary}
          languageId={lang}
          site={site}
          languages={data.languages || []}
        />
      )}
      {children}
      <Footer language={lang} siteName={site.name} />
    </div>
  );
}
