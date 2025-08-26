import { GET_SITE_AND_ADVERTISER } from '@/graphql/queries/get-site-and-advertiser';
import { GetSiteAndAdvertiserQuery } from '@/services/graphql';
import { query } from '@/services/apollo-client-server';
import { Card } from '@tekminewe/mint-ui/card';
import { ErrorMessage } from '@tekminewe/mint-ui/error-message';
import { clickAdvertiser } from '@/services/advertiser';
import { ServerComponentProps } from '@/types';
import { LuCircleCheck } from 'react-icons/lu';
import { BiSolidRightArrow } from 'react-icons/bi';
import { IoCaretDown } from 'react-icons/io5';
import Image from 'next/image';
import { getSessionServer } from '@/services/auth/next';
import { RedirectAfter } from '@/components/redirect-after';
import { getDictionary } from '@/dictionaries';
import { replaceTokens } from '@/utils/string';

export const AdvertiserRedirectPage = async ({
  params,
}: ServerComponentProps<any>) => {
  const { lang, slug } = await params;
  const dictionary = await getDictionary(lang);
  const session = await getSessionServer();
  const { data } = await query<GetSiteAndAdvertiserQuery>({
    query: GET_SITE_AND_ADVERTISER,
    variables: {
      slug,
      lang,
    },
    context: {
      headers: {
        'Accept-Language': lang,
      },
    },
  });
  const site = data.site;
  const advertiser = data.advertiser;

  const click = advertiser
    ? await clickAdvertiser(advertiser.id, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
    : null;
  const isError = !site || !advertiser || !click?.ok();

  const renderContent = () => {
    if (isError) {
      return (
        <ErrorMessage
          title="Opps! Something went wrong"
          message="We are so sorry. Please refresh the page to try again."
        />
      );
    }

    return (
      <>
        <p className="caption text-primary-600 flex items-center gap-2">
          <LuCircleCheck />
          {dictionary.redirect.cashbackActivated}
        </p>
        <div className="flex flex-col md:flex-row items-center gap-8 py-6">
          <Image
            src={site.logo?.url ?? ''}
            width={150}
            height={150}
            alt={site.name}
            className="w-[100px] h-[100px] object-contain rounded-4"
          />
          <div className="hidden md:flex items-center gap-2">
            <BiSolidRightArrow
              className="animate-ping"
              style={{
                animationDelay: '250ms',
              }}
            />
            <BiSolidRightArrow
              className="animate-ping"
              style={{
                animationDelay: '500ms',
              }}
            />
            <BiSolidRightArrow
              className="animate-ping"
              style={{
                animationDelay: '750ms',
              }}
            />
          </div>
          <div className="md:hidden flex flex-col items-center gap-2">
            <IoCaretDown
              className="animate-ping"
              style={{
                animationDelay: '250ms',
              }}
            />
            <IoCaretDown
              className="animate-ping"
              style={{
                animationDelay: '500ms',
              }}
            />
            <IoCaretDown
              className="animate-ping"
              style={{
                animationDelay: '750ms',
              }}
            />
          </div>
          <Image
            src={advertiser.logo?.url}
            width={150}
            height={150}
            alt={advertiser.name}
            className="w-[100px] h-[100px] object-contain rounded-4"
          />
        </div>
        <p className="caption">{dictionary.redirect.cashbackDescription}</p>
        <p className="text-xl font-semibold text-primary-600">
          {replaceTokens(dictionary.redirect.cashbackDescription2, {
            cashback:
              advertiser.commission?.calculatedCommission.toString() || '0',
          })}
        </p>
      </>
    );
  };

  return (
    <div className="bg-neutral-50 flex flex-col items-center justify-center p-4 h-screen">
      {click?.ok() && <RedirectAfter url={click?.data?.url} delay={3000} />}
      <Card className="max-w-[700px] mt-4 flex flex-col items-center p-4 md:p-8 w-full">
        {renderContent()}
      </Card>
      {!isError && click?.data?.url && (
        <div className="m-2/3 mt-4">
          <p className="caption text-center">
            {dictionary.redirect.cashbackFooterChunk1}
            <a href={click.data.url} className="link">
              {dictionary.redirect.cashbackFooterChunk2}
            </a>
            {dictionary.redirect.cashbackFooterChunk3}
          </p>
        </div>
      )}
    </div>
  );
};
