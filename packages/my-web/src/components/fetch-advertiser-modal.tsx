'use client';

import { FETCH_ADVERTISER_MUTATION } from '@/graphql/mutations/fetch-advertiser-mutation';
import { ApolloError, useMutation } from '@apollo/client';
import { Button } from '@tekminewe/mint-ui/button';
import {
  DialogRoot,
  Dialog,
  DialogClose,
  DialogFooter,
} from '@tekminewe/mint-ui/dialog';
import { ControlledForm } from '@tekminewe/mint-ui/form';
import { ControlledTextInput } from '@tekminewe/mint-ui/text-input';
import { toast } from '@tekminewe/mint-ui/toast';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { object, string } from 'zod';
import { LuX } from 'react-icons/lu';

interface FetchAdvertiserFormState {
  name: string;
}

interface FetchAdvertiserModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  dictionary: {
    fetchAdvertiser: string;
    fetchAdvertiserName: string;
    fetchButton: string;
    fetchAdvertiserSuccess: string;
    cancel: string;
  };
}

export const FetchAdvertiserModal = ({
  isOpen,
  onClose,
  language,
  dictionary,
}: FetchAdvertiserModalProps) => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const [fetchAdvertiser] = useMutation(FETCH_ADVERTISER_MUTATION);

  const schema = object({
    name: string().min(1, 'Advertiser name is required'),
  });

  const handleSubmit: SubmitHandler<FetchAdvertiserFormState> = async (
    data,
  ) => {
    setIsLoading(true);
    try {
      const result = await fetchAdvertiser({
        variables: {
          data: {
            name: data.name,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${session?.data?.accessToken}`,
            'Accept-Language': language,
          },
        },
      });

      if (result.data?.fetchAdvertiser.success) {
        toast(dictionary.fetchAdvertiserSuccess, {
          type: 'success',
        });
        onClose();
      } else {
        toast(
          result.data?.fetchAdvertiser.message || 'Failed to fetch advertiser',
          {
            type: 'error',
          },
        );
      }
    } catch (error) {
      toast((error as ApolloError).message, {
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(open: boolean) => !open && onClose()}
    >
      <Dialog>
        <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            {dictionary.fetchAdvertiser}
          </h2>
        </div>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <LuX className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <ControlledForm<FetchAdvertiserFormState>
          schema={schema}
          defaultValues={{ name: '' }}
          onSubmit={handleSubmit}
          submitButtonLabel={dictionary.fetchButton}
          hideSubmitButton
        >
          <ControlledTextInput
            label={dictionary.fetchAdvertiserName}
            name="name"
            autoFocus
          />

          <DialogFooter className="flex gap-4 items-center">
            <DialogClose asChild>
              <Button variant="ghost" disabled={isLoading}>
                {dictionary.cancel}
              </Button>
            </DialogClose>
            <Button type="submit" loading={isLoading}>
              {dictionary.fetchButton}
            </Button>
          </DialogFooter>
        </ControlledForm>
      </Dialog>
    </DialogRoot>
  );
};
