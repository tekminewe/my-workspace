import * as RadixSwitch from '@radix-ui/react-switch';
import { FormLabel } from '../form';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '../utils';
import { INTERACTION_COLORS, SURFACE_COLORS } from '../utils/component-colors';

export interface SwitchProps
  extends ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  label?: string;
  description?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      error,
      description,
      label,
      required,
      containerClassName,
      labelClassName,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'flex flex-col w-full',
          label && 'gap-1',
          containerClassName,
        )}
      >
        {label && (
          <FormLabel
            className={labelClassName}
            label={label}
            required={required}
          />
        )}
        <RadixSwitch.Root
          ref={ref}
          className={cn(
            'relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors',
            'bg-neutral-300 data-[state=checked]:bg-primary dark:bg-neutral-300 dark:data-[state=checked]:bg-primary',
            INTERACTION_COLORS.focus,
            className,
          )}
          {...props}
        >
          <RadixSwitch.Thumb
            className={cn(
              'pointer-events-none block h-5 w-5 rounded-full shadow-lg transition-transform',
              'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
              SURFACE_COLORS.surface,
            )}
          />
        </RadixSwitch.Root>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {description && (
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            {description}
          </p>
        )}
      </div>
    );
  },
);

Switch.displayName = 'Switch';
