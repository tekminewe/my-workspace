'use client';

import { Dialog, DialogClose, DialogFooter } from '@tekminewe/mint-ui/dialog';
import { logError } from '@/services/error';
import { Dictionary } from '@/dictionaries';
import { toast } from '@tekminewe/mint-ui/toast';
import { Button } from '@tekminewe/mint-ui/button';
import { useDeleteUserPaymentMethod } from '@/hooks/use-delete-payment-method';
import { LuX } from 'react-icons/lu';

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
        <LuX className="h-4 w-4" />
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
