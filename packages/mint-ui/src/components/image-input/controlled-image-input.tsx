"use client";

import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { ImageInput, ImageInputProps } from "./image-input";
import { ChangeEvent } from "react";

export interface ControlledImageInputProps<T extends FieldValues>
  extends Omit<ImageInputProps, "name"> {
  name: Path<T>;

  /**
   * The method to call in order to upload the image.
   * @param file
   * @returns Promise<{ url: string }>
   */
  onUpload: (file: File) => Promise<{ url: string }>;
}

export const ControlledImageInput = <T extends FieldValues>({
  name,
  onUpload,
  ...props
}: ControlledImageInputProps<T>) => {
  const { control, setError } = useFormContext<T>();
  const {
    fieldState: { error },
    field,
  } = useController<T>({ name, control });

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e);
    const file = e.target.files?.[0];

    if (file) {
      try {
        const { url } = await onUpload(file);
        field.onChange({ target: { value: url, name } });
      } catch {
        setError(name, {
          type: "custom",
          message: "Failed to upload image",
        });
      }
    }
  };

  return (
    <ImageInput
      {...props}
      {...field}
      onChange={handleChange}
      error={error?.message}
    />
  );
};
