'use client';

import { useForm } from '../utils-client';
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  FormProvider,
} from 'react-hook-form';
import { ZodSchema } from 'zod';
import { Button } from '../button';
import { cn } from '../utils';

export interface ControlledFormProps<T extends FieldValues> {
  defaultValues?: DefaultValues<T>;
  schema?: ZodSchema<T>;
  children?: React.ReactNode;
  onSubmit?: SubmitHandler<T>;
  hideSubmitButton?: boolean;
  submitButtonLabel?: string;
  submitButtonPosition?: 'start' | 'end' | 'center' | 'stretch';
  keepValuesOnSubmit?: boolean;
  className?: string;
}

export const ControlledForm = <T extends FieldValues>({
  defaultValues,
  schema,
  children,
  onSubmit,
  hideSubmitButton = false,
  submitButtonLabel = 'Submit',
  submitButtonPosition = 'end',
  keepValuesOnSubmit = false,
  className,
}: ControlledFormProps<T>) => {
  const forms = useForm<T>({
    defaultValues,
    schema,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = forms;

  const preSubmit: SubmitHandler<T> = async (data) => {
    try {
      await onSubmit?.(data);
      reset(keepValuesOnSubmit ? data : undefined);
    } catch (e) {
      // Do nothing
    }
  };

  return (
    <FormProvider {...forms}>
      <form
        onSubmit={onSubmit ? handleSubmit(preSubmit) : undefined}
        className={className}
      >
        <fieldset disabled={isSubmitting}>
          <div className="flex flex-col gap-4">
            {children}
            {!hideSubmitButton && (
              <div
                className={cn('flex', {
                  'justify-end': submitButtonPosition === 'end',
                  'justify-center': submitButtonPosition === 'center',
                  'justify-start': submitButtonPosition === 'start',
                })}
              >
                <Button
                  disabled={!isValid || !isDirty}
                  loading={isSubmitting}
                  type="submit"
                >
                  {submitButtonLabel}
                </Button>
              </div>
            )}
          </div>
        </fieldset>
      </form>
    </FormProvider>
  );
};
