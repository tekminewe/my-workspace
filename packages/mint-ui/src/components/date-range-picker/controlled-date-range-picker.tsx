'use client';

import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from 'react-hook-form';
import { DateRangePickerProps, DateRangePicker } from './date-range-picker';

export interface ControlledDateRangePickerProps<T extends FieldValues>
  extends DateRangePickerProps {
  name: Path<T>;
}

export const ControlledDateRangePicker = <T extends FieldValues>({
  name,
  ...props
}: ControlledDateRangePickerProps<T>) => {
  const { control } = useFormContext<T>();
  const {
    fieldState: { error },
    field: { onChange, ...field },
  } = useController<T>({ name, control });

  return (
    <DateRangePicker
      {...props}
      {...field}
      onChange={(range) => {
        props.onChange?.(range);
        onChange({ target: { value: range } });
      }}
      error={error?.message}
    />
  );
};
