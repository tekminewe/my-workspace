'use client';

import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cross1Icon,
} from '@radix-ui/react-icons';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { format } from 'date-fns/format';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Button, ButtonProps } from '../button';
import { forwardRef, useState, useMemo, useCallback } from 'react';
import {
  SURFACE_COLORS,
  BORDER_COLORS,
  CALENDAR_COLORS,
} from '../utils/component-colors';
import { Caption, Text } from '../typography';
import { FormLabel } from '../form';
import { cn } from '../utils';
import { useTheme } from '../theme';

export interface DateRangePickerProps
  extends Omit<ButtonProps, 'value' | 'onChange' | 'children'> {
  /**
   * The selected date range.
   * @default undefined
   * @example { from: new Date(), to: new Date() }
   */
  value?: DateRange;
  /**
   * Callback when the date range is changed.
   *
   * @param range
   * @returns
   */
  onChange?: (range: DateRange | undefined) => void;
  /**
   * The label for the date range picker.
   * @default undefined
   * @example "Effective Period"
   */
  label?: string;
  /**
   * The placeholder for the date range picker.
   * @default "Select date range"
   * @example "Select effective period"
   */
  placeholder?: string;
  /**
   * Whether the date range picker is required.
   * @default false
   * @example true
   */
  required?: boolean;

  /**
   * The error message to display.
   * @default undefined
   * @example "This field is required"
   */
  error?: string;
  /**
   * Whether the date range picker is disabled.
   * @default false
   * @example true
   */
  disabled?: boolean;

  /**
   * Whether the date range picker is clearable.
   * @default true
   * @example false
   */
  clearable?: boolean;

  /**
   * Minimum selectable date.
   * @default undefined
   * @example new Date()
   */
  minDate?: Date;

  /**
   * Maximum selectable date.
   * @default undefined
   * @example new Date()
   */
  maxDate?: Date;

  /**
   * Custom format for displaying dates.
   * @default "MMM dd, yyyy"
   * @example "dd/MM/yyyy"
   */
  dateFormat?: string;

  /**
   * Separator between from and to dates.
   * @default " - "
   * @example " to "
   */
  separator?: string;

  /**
   * Number of months to display.
   * @default 2
   * @example 1
   */
  numberOfMonths?: number;
}

export const DateRangePicker = forwardRef<
  HTMLButtonElement,
  DateRangePickerProps
>(
  (
    {
      label,
      value,
      onChange,
      placeholder = 'Select date range',
      required = false,
      error,
      disabled,
      clearable = true,
      minDate,
      maxDate,
      dateFormat = 'MMM dd, yyyy',
      separator = ' - ',
      numberOfMonths = 2,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();

    const displayValue = useMemo(() => {
      if (!value?.from) return '';

      const fromStr = format(value.from, dateFormat);
      if (!value.to) return fromStr;

      const toStr = format(value.to, dateFormat);
      return `${fromStr}${separator}${toStr}`;
    }, [value, dateFormat, separator]);

    const handleSelect = useCallback(
      (range: DateRange | undefined) => {
        onChange?.(range);
      },
      [onChange],
    );

    const handleClear = useCallback(
      (e: React.MouseEvent<HTMLOrSVGElement>) => {
        e.stopPropagation();
        e.preventDefault();
        onChange?.(undefined);
      },
      [onChange],
    );

    const handleOpenChange = useCallback(
      (open: boolean) => {
        if (!disabled) {
          setIsOpen(open);
        }
      },
      [disabled],
    );

    const isDateDisabled = useCallback(
      (date: Date) => {
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        return false;
      },
      [minDate, maxDate],
    );

    return (
      <div className="flex flex-col gap-1">
        {label && <FormLabel label={label} required={required} />}

        <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
          <div className="relative flex items-center w-full">
            <PopoverPrimitive.Trigger asChild>
              <Button
                {...props}
                ref={ref}
                disabled={disabled}
                style={{ textAlign: 'left' }}
                variant="outline"
                className={cn(
                  'flex justify-start w-full',
                  'bg-[--color-surface] hover:bg-[--color-surface] focus:bg-[--color-surface]',
                  CALENDAR_COLORS.text,
                  {
                    'shadow-[inset_0_0_0_1px_rgb(206,44,49)]': error,
                  },
                )}
              >
                <CalendarIcon className={CALENDAR_COLORS.textSecondary} />
                <Text
                  className={cn(
                    'font-normal text-sm pointer-events-none',
                    displayValue
                      ? CALENDAR_COLORS.text
                      : CALENDAR_COLORS.textMuted,
                  )}
                >
                  {displayValue || placeholder}
                </Text>
              </Button>
            </PopoverPrimitive.Trigger>
            {displayValue && clearable && !disabled && (
              <Cross1Icon
                className={cn(
                  'cursor-pointer absolute right-[12px]',
                  CALENDAR_COLORS.textMuted,
                  CALENDAR_COLORS.textHover,
                )}
                onClick={handleClear}
              />
            )}
          </div>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              className={cn(
                'p-4 rounded-md shadow-md z-50 w-auto',
                SURFACE_COLORS.surfaceElevated,
                BORDER_COLORS.default,
              )}
              sideOffset={5}
              align="start"
            >
              <DayPicker
                showOutsideDays
                components={{
                  IconLeft: () => (
                    <ChevronLeftIcon
                      className={cn('h-4 w-4', CALENDAR_COLORS.textSecondary)}
                    />
                  ),
                  IconRight: () => (
                    <ChevronRightIcon
                      className={cn('h-4 w-4', CALENDAR_COLORS.textSecondary)}
                    />
                  ),
                }}
                mode="range"
                selected={value}
                onSelect={handleSelect}
                disabled={isDateDisabled}
                numberOfMonths={numberOfMonths}
                initialFocus
                className={cn('rdp-themed', {
                  'rdp-light-mode': theme === 'light',
                  'rdp-dark-mode': theme === 'dark',
                })}
              />
              <PopoverPrimitive.Arrow
                className={cn('fill-white dark:fill-neutral-100')}
              />
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

        {error && <Caption className="text-error">{error}</Caption>}
      </div>
    );
  },
);

DateRangePicker.displayName = 'DateRangePicker';
