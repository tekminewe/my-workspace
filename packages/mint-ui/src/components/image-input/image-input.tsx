import { forwardRef, InputHTMLAttributes, useId } from 'react';
import { FormLabel } from '../form';
import { Caption } from '../typography';
import { Button } from '../button';
import { cn } from '../utils';
import { BORDER_COLORS } from '../utils/component-colors';
import { useEffectiveRadius } from '../utils-client/use-effective-radius';
import { Radius } from '../utils-client/radius';

export interface ImageInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The label for the input.
   * @default undefined
   * @example "Upload Image"
   */
  label?: string;

  /**
   * Class name for the container element.
   * @default undefined
   * @example "border-b"
   */
  containerClassName?: string;

  /**
   * Class name for the label element.
   * @default undefined
   * @example "text-red-500"
   */
  labelClassName?: string;

  /**
   * The error message to display.
   * @default undefined
   * @example "This field is required"
   */
  error?: string;

  /**
   * The description to display.
   * @default undefined
   * @example "Image must be less than 5MB"
   */
  description?: string;

  /**
   * The value (url) of the input.
   * @default undefined
   * @example "https://example.com/image.jpg"
   */
  value?: string;

  /**
   * Border radius of the image preview
   * @default undefined (uses global default)
   */
  radius?: Radius;
}

export const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  (
    {
      containerClassName,
      labelClassName,
      required,
      label,
      error,
      description,
      id,
      accept = 'image/*',
      value,
      radius,
      ...props
    },
    ref,
  ) => {
    const customId = useId();
    const inputId = id ?? customId;
    const radiusClass = useEffectiveRadius(radius);

    const renderDescription = () => {
      if (error) {
        return <Caption className="text-error">{error}</Caption>;
      }

      if (description) {
        return <Caption>{description}</Caption>;
      }

      return null;
    };

    return (
      <div
        className={cn(
          'flex w-full flex-col',
          label && 'gap-1',
          containerClassName,
        )}
      >
        {label && (
          <FormLabel
            className={labelClassName}
            htmlFor={inputId}
            label={label}
            required={required}
          />
        )}

        <input
          type="file"
          accept={accept}
          id={inputId}
          ref={ref}
          className="hidden"
          {...props}
        />

        <div className="space-y-3">
          {/* Current Image Preview */}
          {value && (
            <div className="relative">
              <img
                src={value}
                alt="Uploaded image preview"
                className={cn(
                  'w-full max-w-xs h-32 object-cover border',
                  radiusClass,
                  BORDER_COLORS.default,
                )}
              />
            </div>
          )}

          {/* Upload Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById(inputId)?.click()}
            className="w-fit"
          >
            {value ? 'Change Image' : 'Choose File'}
          </Button>
        </div>

        {renderDescription()}
      </div>
    );
  },
);

ImageInput.displayName = 'ImageInput';
