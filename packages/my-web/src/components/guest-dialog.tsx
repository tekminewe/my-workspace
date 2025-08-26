import { Button } from '@tekminewe/mint-ui/button';
import { Dialog, DialogClose } from '@tekminewe/mint-ui/dialog';
import { Caption } from '@tekminewe/mint-ui/typography';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Dictionary } from '@/dictionaries';
import { replaceTokens } from '@/utils/string';
import { LuX } from 'react-icons/lu';

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
        <LuX className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogClose>

      <div className="flex flex-col justify-center items-center gap-2 sm:w-96">
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
