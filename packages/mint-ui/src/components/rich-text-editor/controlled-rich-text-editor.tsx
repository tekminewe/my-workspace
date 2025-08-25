'use client';

import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from 'react-hook-form';
import { RichTextEditor, RichTextEditorProps } from './rich-text-editor.v2';
import { FormLabel } from '../form';
import { Caption } from '../typography';
import { cn } from '../utils';
import {
  SURFACE_COLORS,
  TEXT_COLORS,
  BORDER_COLORS,
} from '../utils/component-colors';

interface ControlledRichTextEditorProps<T extends FieldValues>
  extends Omit<RichTextEditorProps, 'content' | 'onChange'> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
  description?: string;
}

export const ControlledRichTextEditor = <T extends FieldValues>({
  name,
  label,
  required,
  className,
  description,
  ...props
}: ControlledRichTextEditorProps<T>) => {
  const { control } = useFormContext<T>();
  const {
    fieldState: { error },
    field: { value, onChange },
  } = useController<T>({ name, control });

  const renderDescription = () => {
    if (error) {
      return <Caption className="text-error">{error.message}</Caption>;
    }

    if (description) {
      return <Caption>{description}</Caption>;
    }

    return null;
  };

  return (
    <label className={cn('flex flex-col w-full', label && 'gap-1', className)}>
      {label && <FormLabel htmlFor={name} label={label} required={required} />}
      <div
        className={cn(
          'border rounded-md overflow-hidden',
          SURFACE_COLORS.surface,
          TEXT_COLORS.primary,
          BORDER_COLORS.default,
          'focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent',
          error && 'border-error-500 focus-within:ring-error-500',
        )}
      >
        <RichTextEditor
          content={value ? JSON.parse(value) : undefined}
          onChange={({ content }) => onChange(JSON.stringify(content))}
          containerClassName="p-3 min-h-[120px]"
          {...props}
        />
      </div>
      {renderDescription()}
    </label>
  );
};
