"use client";

import { TextInputProps, TextInput } from "./text-input";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";

interface ControlledTextInputProps<T extends FieldValues>
  extends Omit<TextInputProps, "name"> {
  name: Path<T>;
}

export const ControlledTextInput = <T extends FieldValues>({
  name,
  ...props
}: ControlledTextInputProps<T>) => {
  const { control } = useFormContext<T>();
  const {
    fieldState: { error },
    field,
  } = useController<T>({ name, control });

  return (
    <TextInput
      {...props}
      {...field}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange?.(e);
        field.onChange(e);
      }}
      error={error?.message}
    />
  );
};
