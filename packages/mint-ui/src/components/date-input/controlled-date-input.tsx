"use client";

import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { DateInputProps, DateInput } from "./date-input";

export interface ControlledDateInputProps<T extends FieldValues>
  extends DateInputProps {
  name: Path<T>;
}

export const ControlledDateInput = <T extends FieldValues>({
  name,
  ...props
}: ControlledDateInputProps<T>) => {
  const { control } = useFormContext<T>();
  const {
    fieldState: { error },
    field: { onChange, ...field },
  } = useController<T>({ name, control });

  return (
    <DateInput
      {...props}
      {...field}
      onChange={(date) => {
        props.onChange?.(date);
        onChange({ target: { value: date } });
      }}
      error={error?.message}
    />
  );
};
