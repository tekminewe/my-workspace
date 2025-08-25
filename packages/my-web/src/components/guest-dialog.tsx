import { Button } from '@tekminewe/mint-ui/button';
import { Dialog, DialogClose } from '@tekminewe/mint-ui/dialog';
import { Caption } from '@tekminewe/mint-ui/typography';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Dictionary } from '@/dictionaries';
import { replaceTokens } from '@/utils/string';

export const GuestDialog = ({
  advertiserRedirectUrl,
  advertiserLogoUrl,
  advertiserName,
  advertiserCashbackRate,
  dictionary,
}: {
  advertiserRedirectUrl: string;
  advertiserLogoUrl: string;
  advertiserName: string;
  advertiserCashbackRate: number;
  dictionary: Dictionary['guestDialog'];
}) => {
  const handleSignIn = () => {
    return signIn('cognito');
  };

  return (
    <Dialog>
      <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m11.7816 4.03157c.0462-.04625.0462-.12084 0-.1671-.0462-.04625-.1208-.04625-.1671 0L7.5 7.94991 3.3855 3.86447c-.04625-.04625-.12084-.04625-.1671 0-.04625.04626-.04625.12085 0 .1671L7.33211 8.11664 3.21855 12.1302c-.04625.0462-.04625.1208 0 .1671.04626.0462.12085.0462.1671 0L7.5 8.17346l4.1145 4.11464c.0462.0462.1208.0462.1671 0 .0462-.0463.0462-.1209 0-.1671L7.66789 7.94991 11.7816 4.03157Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close</span>
      </DialogClose>

      <div className="flex flex-col items-center gap-2">
        <Image
          src={advertiserLogoUrl}
          width={100}
          height={100}
          alt={advertiserName}
        />
        <div>
          {replaceTokens(dictionary.title, {
            cashback: advertiserCashbackRate.toString(),
          })}
        </div>
        <Button onClick={handleSignIn} size="lg">
          {dictionary.signUpButtonLabel}
        </Button>
        <Link href={advertiserRedirectUrl} target="_self">
          <Caption className="underline">
            {dictionary.proceedWithoutSignUpButtonLabel}
          </Caption>
        </Link>
      </div>
    </Dialog>
  );
};
