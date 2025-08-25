import { forwardRef, LabelHTMLAttributes } from 'react';
import { cn } from '../utils';
import { TEXT_COLORS } from '../utils/component-colors';

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label?: string;
  required?: boolean;
  className?: string;
  htmlFor?: string;
}

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ label, required, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        {...props}
        className={cn(
          'mb-1 text-sm font-medium',
          TEXT_COLORS.primary,
          className,
        )}
      >
        {label}
        {required && <span className="text-error">{' *'}</span>}
      </span>
    );
  },
);

FormLabel.displayName = 'FormLabel';
