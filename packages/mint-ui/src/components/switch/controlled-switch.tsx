"use client";

import { SwitchProps, Switch } from "./switch";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";

export interface ControlledSwitchProps<T extends FieldValues>
  extends Omit<SwitchProps, "name" | "checked" | "onCheckedChange"> {
  name: Path<T>;
}

export const ControlledSwitch = <T extends FieldValues>({
  name,
  ...props
}: ControlledSwitchProps<T>) => {
  const { control } = useFormContext<T>();
  const {
    fieldState: { error },
    field,
  } = useController<T>({ name, control });
  
  return (
    <Switch
      {...props}
      checked={field.value}
      onCheckedChange={(checked) => {
        field.onChange(checked);
      }}
      error={error?.message}
    />
  );
};

ControlledSwitch.displayName = "ControlledSwitch";
