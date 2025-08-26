"use client";

import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { ITextAreaProps, TextArea } from "./text-area";

interface ControlledTextAreaProps<T extends FieldValues>
  extends Omit<ITextAreaProps, "name"> {
  name: Path<T>;
}

export const ControlledTextArea = <T extends FieldValues>({
  name,
  ...props
}: ControlledTextAreaProps<T>) => {
  const { control } = useFormContext<T>();
  const {
    fieldState: { error },
    field,
  } = useController<T>({ name, control });
  return <TextArea {...props} {...field} error={error?.message} />;
};
