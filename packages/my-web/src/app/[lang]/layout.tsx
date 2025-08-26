import '@tekminewe/mint-ui/globals.css';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Metadata } from 'next';
import { GET_SITE } from '@/graphql/queries/get-site';
import { ClientRoot } from './client-root';
import { ApolloWrapper } from '@/components/apollo-wrapper';
import { SessionProvider } from 'next-auth/react';
import { getSessionServer } from '@/services/auth/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import 'dayjs/locale/zh';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { query } from '@/services/apollo-client-server';
import { GetSiteQuery } from '@/services/graphql';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(LocalizedFormat);

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { data } = await query<GetSiteQuery>({
    query: GET_SITE,
    context: {
      headers: {
        'Accept-Language': params.lang,
      },
    },
  });
  const site = data.site;
  return {
    title: {
      default: site.name,
      template: `%s | ${site.name}`,
    },
    description: site.description,
  };
}

// export async function generateStaticParams() {
//   const { data } = await query({ query: GET_SITE, variables: { language: params.lang } });
//     headers: {
//       "Accept-Language": "en-MY",
//     },
//   });
//   if (!site.ok()) {
//     throw new Error(site.error.message);
//   }
//   return site.data.supportedLanguages.map((lang) => ({ params: { lang } }));
// }

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const session = await getSessionServer();
  dayjs.locale(lang.toLowerCase());

  return (
    <html lang={lang}>
      <body>
        <ThemeProvider>
          <SessionProvider session={session}>
            <ApolloWrapper>
              <ClientRoot language={lang}>{children}</ClientRoot>
            </ApolloWrapper>
          </SessionProvider>
        </ThemeProvider>
        {process.env.GOOGLE_ANALYTICS_ID && (
          <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
        )}
      </body>
    </html>
  );
}
