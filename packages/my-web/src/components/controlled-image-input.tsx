'use client';

import { client } from '@/services/client';
import { logError } from '@/services/error';
import {
  ControlledImageInputProps as MintControlledImageInputProps,
  ControlledImageInput as MintControlledImageInput,
} from '@tekminewe/mint-ui/image-input';
import { FieldValues, Path, PathValue } from 'react-hook-form';
import { useFormContext } from '@tekminewe/mint-ui/form';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { UPLOAD_MEDIA } from '@/graphql/mutations/upload-media';

export interface ControlledImageInputProps<T extends FieldValues>
  extends Omit<MintControlledImageInputProps<T>, 'onUpload'> {
  idKey: Path<T>;
  onUploadSuccess?: (data: { id: string; url: string }) => Promise<void>;
  customFilename?: string;
}

export const ControlledImageInput = <T extends FieldValues>({
  idKey,
  onUploadSuccess,
  customFilename,
  ...props
}: ControlledImageInputProps<T>) => {
  const methods = useFormContext<T>();
  const session = useSession();
  const [uploadMedia] = useMutation(UPLOAD_MEDIA);

  return (
    <MintControlledImageInput
      {...props}
      onUpload={async (file) => {
        try {
          // Use GraphQL mutation if customFilename is provided, otherwise use REST API
          if (customFilename) {
            // Convert file to base64
            const base64 = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                const result = reader.result as string;
                // Remove data URL prefix to get just the base64 content
                const base64Content = result.split(',')[1];
                resolve(base64Content);
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });

            const result = await uploadMedia({
              variables: {
                data: {
                  fileBase64: base64,
                  filename: file.name,
                  mimeType: file.type,
                  customFilename,
                },
              },
              context: {
                headers: {
                  Authorization: `Bearer ${session?.data?.accessToken}`,
                },
              },
            });

            if (!result.data?.uploadMedia) {
              throw new Error('Upload failed');
            }

            methods?.setValue(
              idKey,
              result.data.uploadMedia.id as PathValue<T, Path<T>>,
            );

            // Also set the URL field (name prop) for display
            if (props.name) {
              methods?.setValue(
                props.name,
                result.data.uploadMedia.url as PathValue<T, Path<T>>,
              );
            }

            await onUploadSuccess?.({
              id: result.data.uploadMedia.id,
              url: result.data.uploadMedia.url,
            });

            return {
              id: result.data.uploadMedia.id,
              url: result.data.uploadMedia.url,
            };
          } else {
            // Use existing REST API for regular uploads
            const result = await client.media.uploadMedia(
              {
                file,
              },
              {
                headers: {
                  Authorization: `Bearer ${session?.data?.accessToken}`,
                },
              },
            );

            if (!result.ok) {
              logError(result.error);
              throw new Error(result.error.message);
            }

            methods?.setValue(
              idKey,
              result.data.data.id as PathValue<T, Path<T>>,
            );

            // Also set the URL field (name prop) for display
            if (props.name) {
              methods?.setValue(
                props.name,
                result.data.data.url as PathValue<T, Path<T>>,
              );
            }

            await onUploadSuccess?.({
              id: result.data.data.id,
              url: result.data.data.url,
            });

            return {
              id: result.data.data.id,
              url: result.data.data.url,
            };
          }
        } catch (error) {
          logError(error as Error);
          throw error;
        }
      }}
    />
  );
};
