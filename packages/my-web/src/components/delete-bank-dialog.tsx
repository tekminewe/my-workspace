'use client';

import { Dialog, DialogClose, DialogFooter } from '@tekminewe/mint-ui/dialog';
import { logError } from '@/services/error';
import { Dictionary } from '@/dictionaries';
import { toast } from '@tekminewe/mint-ui/toast';
import { Button } from '@tekminewe/mint-ui/button';
import { useDeleteUserPaymentMethod } from '@/hooks/use-delete-payment-method';

export const DeleteBankDialog = ({
  onDeleteSuccess,
  dictionary,
  userPaymentMethodId,
}: {
  userPaymentMethodId: string;
  onDeleteSuccess?: () => void;
  dictionary: Dictionary['withdrawal']['userBanks']['deleteBankDialog'];
}) => {
  const { trigger, isMutating } = useDeleteUserPaymentMethod();
  const handleDelete = async () => {
    const result = await trigger(userPaymentMethodId);
    if (!result.ok()) {
      if (result.error instanceof Error) {
        logError(result.error);
      }

      toast(dictionary.deleteBankError, {
        type: 'error',
      });
      throw result.error;
    }
    toast(dictionary.deleteBankSuccess, {
      type: 'success',
    });
    onDeleteSuccess?.();
  };

  return (
    <Dialog>
      <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
        <h2 className="text-lg font-semibold leading-none tracking-tight">
          {dictionary.title}
        </h2>
      </div>
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

      <p>{dictionary.description}</p>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" disabled={isMutating}>
            {dictionary.cancel}
          </Button>
        </DialogClose>
        <Button onClick={handleDelete} loading={isMutating}>
          {dictionary.delete}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
