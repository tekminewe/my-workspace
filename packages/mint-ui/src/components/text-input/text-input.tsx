'use client';

import { forwardRef, useId, InputHTMLAttributes } from 'react';
import { Caption } from '../typography';
import { FormLabel } from '../form';
import { cn } from '../utils';
import { INPUT_COLORS } from '../utils/component-colors';
import { useEffectiveRadius } from '../utils-client/use-effective-radius';
import { Radius } from '../utils-client/radius';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Icon to display on the left side of the input
   */
  icon?: React.ReactNode;

  /**
   * Icon to display on the right side of the input
   */
  rightIcon?: React.ReactNode;

  /**
   * Label for the input
   */
  label?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Description text to display
   */
  description?: string;

  /**
   * Additional className for the container
   */
  containerClassName?: string;

  /**
   * Additional className for the input container (wrapper around input and icons)
   */
  inputContainerClassName?: string;

  /**
   * Additional className for the label
   */
  labelClassName?: string;

  /**
   * Input type
   */
  type?: string;

  /**
   * Size of the input
   * @default "2"
   */
  size?: '1' | '2' | '3';

  /**
   * Border radius of the input
   * @default undefined (uses global default)
   */
  radius?: Radius;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      containerClassName,
      labelClassName,
      inputContainerClassName,
      error,
      label,
      icon,
      rightIcon,
      size = '2',
      placeholder = 'Please enter the field',
      required,
      description,
      id,
      type,
      onChange,
      className,
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

    let inputType = type;
    if (type === 'currency') {
      inputType = 'number';
    }

    const renderTextField = () => {
      // Get the appropriate size class based on the size prop
      const sizeClass =
        {
          '1': 'text-sm py-1 px-2',
          '2': 'py-2 px-3',
          '3': 'text-lg py-3 px-4',
        }[size as '1' | '2' | '3'] || 'py-2 px-3';

      return (
        <div
          className={cn(
            'relative w-full',
            props.disabled && INPUT_COLORS.disabled.containerCursor,
            inputContainerClassName,
          )}
        >
          <input
            id={inputId}
            ref={ref}
            required={required}
            placeholder={placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (type === 'currency') {
                e.target.value = e.target.value.replace(/(\.\d{2})\d+$/, '$1');
              }
              onChange?.(e);
            }}
            type={inputType as string}
            className={cn(
              'w-full',
              radiusClass,
              INPUT_COLORS.background,
              props.disabled ? INPUT_COLORS.disabled.text : INPUT_COLORS.text,
              INPUT_COLORS.placeholder,
              error ? INPUT_COLORS.errorBorder : '',
              error ? INPUT_COLORS.focusRingError : INPUT_COLORS.focusRing,
              props.disabled && INPUT_COLORS.disabled.cursor,
              'appearance-none', // Remove default browser styling
              '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none', // Remove number input spinners
              sizeClass,
              icon && 'pl-10',
              rightIcon && 'pr-10',
              className,
            )}
            {...props}
          />
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
              {icon}
            </div>
          )}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-500">
              {rightIcon}
            </div>
          )}
        </div>
      );
    };

    const textField = renderTextField();

    // If there's no label, description, or error, return the text field directly
    // to avoid unnecessary wrapper that can interfere with positioning
    if (!label && !description && !error) {
      return textField;
    }

    return (
      <label
        className={cn(
          'flex flex-col w-full',
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
        {textField}
        {renderDescription()}
      </label>
    );
  },
);

TextInput.displayName = 'TextInput';
