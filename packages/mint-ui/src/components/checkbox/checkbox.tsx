import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { cn } from '../utils';
import { BORDER_COLORS, TEXT_COLORS } from '../utils/component-colors';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /**
   * The label for the checkbox
   */
  label?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, ...props }, ref) => (
  <div className="flex items-center gap-2">
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border',
        BORDER_COLORS.default,
        'outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'data-[state=checked]:bg-primary data-[state=checked]:!border-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'select-none appearance-none',
        '[&::-webkit-focus-ring]:outline-none',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-neutral-50')}
      >
        <CheckIcon className="h-3 w-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label && (
      <label
        className={cn(
          'text-sm font-medium',
          TEXT_COLORS.primary,
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        )}
      >
        {label}
      </label>
    )}
  </div>
));

Checkbox.displayName = 'Checkbox';

export { Checkbox };
