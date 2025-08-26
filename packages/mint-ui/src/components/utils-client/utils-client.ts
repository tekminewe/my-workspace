"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm as useHookForm } from "react-hook-form";
import { ZodSchema } from "zod";

type UseFormOptionsType<T extends FieldValues> = Parameters<
  typeof useHookForm<T>
>[0] & {
  schema?: ZodSchema;
};

export const useForm = <T extends FieldValues>({
  schema,
  mode = "onBlur",
  ...args
}: UseFormOptionsType<T>) => {
  return useHookForm({
    resolver: schema ? zodResolver(schema) : undefined,
    mode,
    ...args,
  });
};
