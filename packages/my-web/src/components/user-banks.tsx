'use client';

import { ErrorMessage } from '@tekminewe/mint-ui/error-message';
import { Card } from '@tekminewe/mint-ui/card';
import { useMyPaymentMethods } from '@/hooks/use-my-payment-methods';
import { LuPlus, LuTrash2 } from 'react-icons/lu';
import { DialogRoot, DialogTrigger } from '@tekminewe/mint-ui/dialog';
import { NewBankDialog } from './new-bank-dialog';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Dictionary } from '@/dictionaries';
import { UserBankSkeleton } from './user-bank-skeleton';
import { DeleteBankDialog } from './delete-bank-dialog';
import { cn } from '@tekminewe/mint-ui/utils';
import { WithdrawalForm } from './withdrawal-form';
import { UserPaymentMethodDto } from '@/services/api';

export const UserBanks = ({
  dictionary,
  locale,
  userWalletId,
}: {
  dictionary: {
    userBanks: Dictionary['withdrawal']['userBanks'];
    withdrawalForm: Dictionary['withdrawal']['withdrawalForm'];
    common: {
      error: Dictionary['common']['error'];
    };
  };
  locale: string;
  userWalletId: string;
}) => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const { data, isLoading } = useMyPaymentMethods({
    paymentChannelType: 'BankTransfer',
  });
  const [selectedBank, selectBank] = useState<UserPaymentMethodDto | null>(
    null,
  );

  useEffect(() => {
    if (selectedBank === null) {
      if (data?.ok() && data?.data.length > 0) {
        selectBank(data?.data[0] ?? null);
      }
    }
  }, [data, selectedBank]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <UserBankSkeleton />
          <UserBankSkeleton />
          <UserBankSkeleton />
        </>
      );
    }

    if (!data?.ok()) {
      return (
        <ErrorMessage
          className="w-full"
          title={dictionary.common.error.title}
          message={dictionary.common.error.message}
        />
      );
    }

    const banks = data.data;

    return (
      <>
        <DialogRoot
          open={!!idToDelete}
          onOpenChange={() => setIdToDelete(null)}
        >
          {banks.map((bank) => (
            <Card
              key={bank.id}
              className={cn('h-[150px] flex flex-col cursor-pointer', {
                'border border-primary-500': selectedBank?.id === bank.id,
              })}
              onClick={() => selectBank(bank)}
            >
              {bank.paymentChannel.logo && (
                <Image
                  src={bank.paymentChannel.logo?.url}
                  alt={bank.paymentChannel.name}
                  width={100}
                  height={21}
                  className="mb-5"
                />
              )}
              <p>{bank.accountName}</p>
              <p>{bank.accountNumber}</p>

              <div className="flex justify-end items-end flex-1 ">
                <LuTrash2
                  className="text-neutral-700 cursor-pointer"
                  onClick={() => setIdToDelete(bank.id)}
                  size={20}
                />
              </div>
            </Card>
          ))}
          <DeleteBankDialog
            dictionary={dictionary.userBanks.deleteBankDialog}
            onDeleteSuccess={() => {
              setIdToDelete(null);
            }}
            userPaymentMethodId={idToDelete ?? ''}
          />
        </DialogRoot>
        <DialogRoot open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
          <DialogTrigger asChild>
            <div className="bg-neutral-100 p-4 h-[150px] rounded-4 flex flex-col items-center justify-center space-y-2 cursor-pointer">
              <LuPlus size={24} />
              <p>{dictionary.userBanks.addBank}</p>
            </div>
          </DialogTrigger>
          <NewBankDialog
            dictionary={dictionary.userBanks.addBankDialog}
            onSaveSuccess={() => {
              setOpenCreateDialog(false);
            }}
            language={locale}
          />
        </DialogRoot>
      </>
    );
  };

  return (
    <>
      <Card>
        <p className="mb-4">{dictionary.userBanks.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {renderContent()}
        </div>
        {selectedBank && (
          <WithdrawalForm
            userPaymentMethodId={selectedBank.id ?? ''}
            userWalletId={userWalletId}
            minAmount={selectedBank.paymentChannel.minAmount}
            locale={locale}
            dictionary={dictionary.withdrawalForm}
          />
        )}
      </Card>
    </>
  );
};
