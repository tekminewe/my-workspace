import { forwardRef, TextareaHTMLAttributes } from 'react';
import { Caption } from '../typography';
import { FormLabel } from '../form';
import { cn } from '../utils';
import { INPUT_COLORS } from '../utils/component-colors';
import { useEffectiveRadius } from '../utils-client/use-effective-radius';
import { Radius } from '../utils-client/radius';

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

  /**
   * Border radius of the textarea
   * @default undefined (uses global default)
   */
  radius?: Radius;
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
      radius,
      ...props
    },
    ref,
  ) => {
    const radiusClass = useEffectiveRadius(radius);

    return (
      <label
        className={cn(
          'flex flex-col',
          label && 'gap-1',
          props.disabled && INPUT_COLORS.disabled.containerCursor,
        )}
      >
        {label && <FormLabel label={label} required={required} />}
        {description && <Caption>{description}</Caption>}
        <textarea
          placeholder={placeholder}
          required={required}
          className={cn(
            'w-full p-2',
            radiusClass,
            INPUT_COLORS.background,
            props.disabled ? INPUT_COLORS.disabled.text : INPUT_COLORS.text,
            INPUT_COLORS.placeholder,
            error ? INPUT_COLORS.errorBorder : '',
            error ? INPUT_COLORS.focusRingError : INPUT_COLORS.focusRing,
            props.disabled && INPUT_COLORS.disabled.cursor,
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
