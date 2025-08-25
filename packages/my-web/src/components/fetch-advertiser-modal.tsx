'use client';

import { FETCH_ADVERTISER_MUTATION } from '@/graphql/mutations/fetch-advertiser-mutation';
import { ApolloError, useMutation } from '@apollo/client';
import { Button } from '@tekminewe/mint-ui/button';
import {
  DialogRoot,
  Dialog,
  DialogClose,
  DialogFooter,
  RadixDialog,
} from '@tekminewe/mint-ui/dialog';
import { ControlledForm } from '@tekminewe/mint-ui/form';
import { ControlledTextInput } from '@tekminewe/mint-ui/text-input';
import { toast } from '@tekminewe/mint-ui/toast';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { object, string } from 'zod';

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
          <RadixDialog.Title className="text-lg font-semibold leading-none tracking-tight">
            {dictionary.fetchAdvertiser}
          </RadixDialog.Title>
        </div>
        <RadixDialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
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
        </RadixDialog.Close>

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
