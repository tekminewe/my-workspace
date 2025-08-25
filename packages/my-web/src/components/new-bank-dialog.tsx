'use client';

import { Dialog, DialogHeader } from '@tekminewe/mint-ui/dialog';
import { ControlledForm } from '@tekminewe/mint-ui/form';
import { ControlledTextInput } from '@tekminewe/mint-ui/text-input';
import { object, string } from 'zod';
import { useCreateUserPaymentMethod } from '@/hooks/use-create-user-payment-method';
import { logError } from '@/services/error';
import { ControlledSelect } from '@tekminewe/mint-ui/select';
import { useActivePaymentChannels } from '@/hooks/use-active-payment-channels';
import { Dictionary } from '@/dictionaries';
import { toast } from '@tekminewe/mint-ui/toast';

interface BankAccountFormState {
  accountName: string;
  accountNumber: string;
  paymentChannelId: string;
}

export const NewBankDialog = ({
  onSaveSuccess,
  dictionary,
  language,
}: {
  onSaveSuccess?: () => void;
  dictionary: Dictionary['withdrawal']['userBanks']['addBankDialog'];
  language: string;
}) => {
  const { data } = useActivePaymentChannels({ language });
  const { trigger } = useCreateUserPaymentMethod();
  const handleSubmit = async (data: BankAccountFormState) => {
    const result = await trigger({
      paymentChannelId: data.paymentChannelId,
      accountName: data.accountName,
      accountNumber: data.accountNumber,
      direction: 'Withdrawal',
    });
    if (!result.ok()) {
      if (result.error instanceof Error) {
        logError(result.error);
      }

      toast(
        dictionary.addBankError[
          result.error?.message as keyof typeof dictionary.addBankError
        ] ?? dictionary.addBankError.unknownError,
        {
          type: 'error',
        },
      );
      throw result.error;
    }
    toast(dictionary.addBankSuccess, {
      type: 'success',
    });
    onSaveSuccess?.();
  };

  return (
    <Dialog>
      <DialogHeader
        title={dictionary.title}
        description={dictionary.description}
        showCloseButton={true}
      />

      <ControlledForm<BankAccountFormState>
        defaultValues={{
          accountName: '',
          accountNumber: '',
          paymentChannelId: '',
        }}
        schema={object({
          accountName: string()
            .min(1, dictionary.bankAccountNameEmptyError)
            .max(100, dictionary.bankAccountNameTooLongError),
          accountNumber: string()
            .min(1, dictionary.bankAccountNumberEmptyError)
            .max(25, dictionary.bankAccountNumberTooLongError)
            .regex(/^[0-9]*$/, dictionary.bankAccountNumberInvalidError),
          paymentChannelId: string().min(1, dictionary.bankEmptyError),
        })}
        onSubmit={handleSubmit}
      >
        <ControlledSelect
          name="paymentChannelId"
          label={dictionary.bankLabel}
          options={
            data?.ok()
              ? data.data?.map((channel) => ({
                  label: channel.name,
                  value: channel.id,
                }))
              : []
          }
          placeholder={dictionary.bankPlaceholder}
        />
        <ControlledTextInput
          name="accountName"
          label={dictionary.bankAccountNameLabel}
          placeholder={dictionary.bankAccountNamePlaceholder}
        />
        <ControlledTextInput
          name="accountNumber"
          label={dictionary.bankAccountNumberLabel}
          inputMode="numeric"
          placeholder={dictionary.bankAccountNumberPlaceholder}
        />
      </ControlledForm>
    </Dialog>
  );
};
