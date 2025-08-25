"use client";

import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { SelectProps, Select } from "./select";

interface ControlledSelectProps<T extends FieldValues> extends SelectProps {
  name: Path<T>;
}

export const ControlledSelect = <T extends FieldValues>({
  name,
  ...props
}: ControlledSelectProps<T>) => {
  const { control } = useFormContext<T>();
  const {
    fieldState: { error },
    field: { onChange, ...field },
  } = useController<T>({ name, control });
  return (
    <Select
      {...props}
      {...field}
      onChange={(value) => {
        props.onChange?.(value);
        onChange({ target: { value } });
      }}
      error={error?.message}
    />
  );
};
