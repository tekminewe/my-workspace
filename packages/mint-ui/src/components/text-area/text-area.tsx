import { forwardRef, TextareaHTMLAttributes } from 'react';
import { Caption } from '../typography';
import { FormLabel } from '../form';
import { cn } from '../utils';
import {
  SURFACE_COLORS,
  BORDER_COLORS,
  TEXT_COLORS,
  INTERACTION_COLORS,
} from '../utils/component-colors';

export interface ITextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * The label for the text area.
   */
  label?: string;

  /**
   * Error message to display below the text area.
   */
  error?: string;

  /**
   * Description text to display below the label.
   */
  description?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  (
    {
      label,
      placeholder = 'Please fill in the field',
      error,
      description,
      required,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <label className={cn('flex flex-col', label && 'gap-1')}>
        {label && <FormLabel label={label} required={required} />}
        {description && <Caption>{description}</Caption>}
        <textarea
          placeholder={placeholder}
          required={required}
          className={cn(
            'w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent',
            SURFACE_COLORS.surface,
            BORDER_COLORS.default,
            TEXT_COLORS.primary,
            error
              ? 'border-error-500 focus:ring-error-500'
              : INTERACTION_COLORS.focus,
            'min-h-[80px] resize-y',
            className,
          )}
          {...props}
          ref={ref}
        />
        {error && <Caption className="text-error">{error}</Caption>}
      </label>
    );
  },
);

TextArea.displayName = 'TextArea';
