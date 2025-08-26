'use client';

import { forwardRef, useMemo } from 'react';
import ReactSelect, {
  MultiValue,
  SingleValue,
  Props as ReactSelectProps,
  StylesConfig,
  GroupBase,
  components,
  OptionProps,
} from 'react-select';
import { FiCheck } from 'react-icons/fi';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { FormLabel } from '../form';
import { Caption } from '../typography';
import { cn } from '../utils';
import {
  TEXT_COLORS,
  SURFACE_COLORS,
  BORDER_COLORS,
  INTERACTION_COLORS,
} from '../utils/component-colors';

export interface SelectOption {
  label: string;
  value: string;
  isDisabled?: boolean;
  isFixed?: boolean; // For multi-select: prevents removal
}

export interface SelectProps {
  /**
   * Label for the select
   * @default undefined
   * @example "Country"
   */
  label?: string;

  /**
   * Current selected value(s)
   * For single select: string | undefined
   * For multi select: string[] | undefined
   */
  value?: string | string[];

  /**
   * Placeholder text when no option is selected
   * @default "Select..."
   */
  placeholder?: string;

  /**
   * Callback when selection changes
   * For single select: (value: string | undefined) => void
   * For multi select: (value: string[]) => void
   */
  onChange?: (value: string | string[] | undefined) => void;

  /**
   * Options for the select dropdown
   * @default undefined
   */
  options?: SelectOption[];

  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;

  /**
   * Size of the select component
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Error message
   * @default undefined
   */
  error?: string;

  /**
   * Help text description
   * @default undefined
   */
  description?: string;

  /**
   * Whether the selection can be cleared
   * @default true
   */
  clearable?: boolean;

  /**
   * Additional class names
   * @default undefined
   */
  className?: string;

  /**
   * Whether to allow multiple selections
   * @default false
   */
  multiple?: boolean;

  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the select is in a loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Whether to allow creating new options
   * @default false
   */
  creatable?: boolean;

  /**
   * Whether to load options asynchronously
   * @default false
   */
  async?: boolean;

  /**
   * Function to load options asynchronously
   * @default undefined
   */
  loadOptions?: (inputValue: string) => Promise<SelectOption[]>;

  /**
   * Default options for async select
   * @default undefined
   */
  defaultOptions?: SelectOption[] | boolean;

  /**
   * Whether to cache loaded options
   * @default true
   */
  cacheOptions?: boolean;

  /**
   * Function to handle creating new options
   * @default undefined
   */
  onCreateOption?: (inputValue: string) => void;

  /**
   * Message to display when no options are available
   * @default "No options available"
   */
  noOptionsMessage?: string;

  /**
   * Message to display when loading
   * @default "Loading..."
   */
  loadingMessage?: string;

  /**
   * Maximum number of options to display
   * @default undefined
   */
  maxMenuHeight?: number;

  /**
   * Whether to close menu on select (useful for multi-select)
   * @default true for single, false for multi
   */
  closeMenuOnSelect?: boolean;

  /**
   * Whether to hide selected options in multi-select
   * @default false
   */
  hideSelectedOptions?: boolean;

  /**
   * Whether the menu should open on focus
   * @default false
   */
  openMenuOnFocus?: boolean;

  /**
   * Whether to filter options based on input
   * @default true
   */
  isSearchable?: boolean;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      value,
      onChange,
      options = [],
      placeholder = 'Select...',
      required = false,
      size = 'md',
      error,
      description,
      clearable = true,
      className,
      multiple = false,
      disabled = false,
      loading = false,
      creatable = false,
      async = false,
      loadOptions,
      defaultOptions,
      cacheOptions = true,
      onCreateOption,
      noOptionsMessage = 'No options available',
      loadingMessage = 'Loading...',
      maxMenuHeight = 300,
      closeMenuOnSelect,
      hideSelectedOptions = false,
      openMenuOnFocus = false,
      isSearchable = true,
    },
    ref,
  ) => {
    // Convert value to react-select format
    const reactSelectValue = useMemo(() => {
      if (multiple) {
        const valueArray = Array.isArray(value) ? value : [];
        return valueArray
          .map((v) => options.find((opt) => opt.value === v))
          .filter((option): option is SelectOption => option !== undefined);
      } else {
        return options.find((opt) => opt.value === value) || null;
      }
    }, [value, options, multiple]);

    // Handle change events
    const handleChange = (
      newValue: SingleValue<SelectOption> | MultiValue<SelectOption>,
    ) => {
      if (multiple) {
        const values = (newValue as MultiValue<SelectOption>).map(
          (opt) => opt.value,
        );
        onChange?.(values);
      } else {
        const singleValue = newValue as SingleValue<SelectOption>;
        onChange?.(singleValue?.value);
      }
    };

    // Handle create option
    const handleCreateOption = (inputValue: string) => {
      if (onCreateOption) {
        onCreateOption(inputValue);
      } else {
        // Default behavior: add to options and select
        if (multiple) {
          const currentValues = Array.isArray(value) ? value : [];
          onChange?.([...currentValues, inputValue]);
        } else {
          onChange?.(inputValue);
        }
      }
    };

    // Size-based styling
    const sizeStyles = {
      sm: {
        control: { minHeight: '32px', fontSize: '14px' },
        option: { padding: '4px 8px' },
        multiValue: { fontSize: '12px' },
      },
      md: {
        control: { minHeight: '36px', fontSize: '16px' },
        option: { padding: '8px 12px' },
        multiValue: { fontSize: '14px' },
      },
      lg: {
        control: { minHeight: '44px', fontSize: '18px' },
        option: { padding: '12px 16px' },
        multiValue: { fontSize: '16px' },
      },
    };

    // ClassNames for react-select to match mint-ui theme and TextInput colors using Tailwind classes
    const customClassNames = {
      control: ({
        isDisabled,
        isFocused,
      }: {
        isDisabled: boolean;
        isFocused: boolean;
      }) =>
        cn(
          '!rounded-md',
          // Background: match SURFACE_COLORS.surface
          SURFACE_COLORS.surface,
          error
            ? '!border-error-500'
            : isFocused
            ? '!border-primary-500'
            : BORDER_COLORS.default,
          // Focus styles: match TextInput focus ring
          isFocused && '!ring-1 !ring-primary-500',
          // Hover styles
          !error && !isFocused && 'hover:!border-neutral-300',
          // Size-specific height
          sizeStyles[size].control.minHeight === '32px' && 'min-h-8',
          sizeStyles[size].control.minHeight === '44px' && 'min-h-11',
          // Disabled styles
          isDisabled && 'opacity-60 cursor-not-allowed',
        ),
      option: ({
        isDisabled,
        isFocused,
        isSelected,
      }: {
        isDisabled: boolean;
        isFocused: boolean;
        isSelected: boolean;
      }) =>
        cn(
          // Base styles with size-specific padding
          size === 'sm'
            ? 'py-1 px-2'
            : size === 'lg'
            ? 'py-3 px-4'
            : 'py-2 px-3',
          // Background colors
          isSelected
            ? '!bg-primary-500 text-white'
            : isFocused
            ? INTERACTION_COLORS.hover.replace('hover:', '')
            : 'bg-transparent',
          // Text colors
          isSelected
            ? 'text-white'
            : isDisabled
            ? TEXT_COLORS.disabled
            : TEXT_COLORS.primary,
          // Hover and active states
          !isDisabled &&
            (isSelected ? 'active:!bg-primary-600' : 'active:!bg-neutral-200'),
          // Cursor
          isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ),
      placeholder: () => cn(TEXT_COLORS.muted, 'mx-1'),
      singleValue: () => cn(TEXT_COLORS.primary, 'mx-1'),
      input: () => cn(TEXT_COLORS.primary, 'mx-1 py-1'),
      menu: () =>
        cn(
          // Match SURFACE_COLORS.surfaceElevated
          SURFACE_COLORS.surfaceElevated,
          'rounded-md shadow-lg my-1 z-50',
        ),
      menuList: () => cn('py-1'),
      multiValue: () =>
        cn(
          INTERACTION_COLORS.hover.replace('hover:', ''),
          'rounded mx-0.5 my-0.5',
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm',
        ),
      multiValueLabel: () => cn(TEXT_COLORS.primary, 'px-1.5 py-0.5'),
      multiValueRemove: ({ isFocused }: { isFocused: boolean }) =>
        cn(
          'px-1 py-0.5 rounded-r hover:!bg-error-500 hover:!text-white',
          TEXT_COLORS.muted,
          isFocused && '!bg-error-500 !text-white',
        ),
      indicatorsContainer: () => cn('flex'),
      dropdownIndicator: ({ isFocused }: { isFocused: boolean }) =>
        cn(
          'p-2',
          isFocused ? TEXT_COLORS.secondary : TEXT_COLORS.muted,
          !isFocused && 'hover:text-neutral-600',
        ),
      clearIndicator: ({ isFocused }: { isFocused: boolean }) =>
        cn(
          'p-2',
          isFocused ? TEXT_COLORS.secondary : TEXT_COLORS.muted,
          !isFocused && 'hover:text-neutral-600',
        ),
      indicatorSeparator: () => cn('bg-neutral-300 my-2 w-px'),
      loadingIndicator: () => cn('p-2', TEXT_COLORS.muted),
      loadingMessage: () => cn(TEXT_COLORS.muted, 'py-2 px-3'),
      noOptionsMessage: () => cn(TEXT_COLORS.muted, 'py-2 px-3'),
      valueContainer: () =>
        cn('grid flex-1 items-center relative overflow-hidden py-1 px-2'),
    };

    // Minimal styles for specific overrides not handled by classNames
    const customStyles: StylesConfig<
      SelectOption,
      boolean,
      GroupBase<SelectOption>
    > = {
      // Only keep essential overrides that can't be done with Tailwind
      menu: (provided) => ({
        ...provided,
        zIndex: 9999, // Ensure menu appears above other elements
      }),
    };

    // Custom components for better integration
    const customComponents = {
      Option: ({ children, ...props }: OptionProps<SelectOption, boolean>) => {
        const { isSelected } = props;
        return (
          <components.Option {...props}>
            <div className="flex items-center">
              <div className="w-4 mr-2 flex-shrink-0 flex justify-center">
                {isSelected && <FiCheck className="text-current" size={16} />}
              </div>
              <span className="flex-1">{children}</span>
            </div>
          </components.Option>
        );
      },
    };

    // Determine which select component to use
    const SelectComponent = useMemo(() => {
      if (async && creatable) return AsyncCreatableSelect;
      if (async) return AsyncSelect;
      if (creatable) return CreatableSelect;
      return ReactSelect;
    }, [async, creatable]);

    // Base props for all select types
    const baseProps: Partial<ReactSelectProps<SelectOption, boolean>> = {
      value: reactSelectValue,
      onChange: handleChange,
      options: async ? undefined : options,
      placeholder,
      isMulti: multiple,
      isDisabled: disabled,
      isLoading: loading,
      isClearable: clearable,
      isSearchable,
      closeMenuOnSelect: closeMenuOnSelect ?? !multiple,
      hideSelectedOptions,
      openMenuOnFocus,
      maxMenuHeight,
      noOptionsMessage: () => noOptionsMessage,
      loadingMessage: () => loadingMessage,
      classNames: customClassNames,
      styles: customStyles,
      components: { ...customComponents },
      className: cn('react-select-container', className),
      classNamePrefix: 'react-select',
    };

    // Additional props for async select
    const asyncProps = async
      ? {
          loadOptions,
          defaultOptions,
          cacheOptions,
        }
      : {};

    // Additional props for creatable select
    const creatableProps = creatable
      ? {
          onCreateOption: handleCreateOption,
          formatCreateLabel: (inputValue: string) => `Create "${inputValue}"`,
        }
      : {};

    return (
      <div className={cn('flex flex-col', label && 'gap-1')} ref={ref}>
        {label && <FormLabel label={label} required={required} />}
        {description && <Caption>{description}</Caption>}

        <SelectComponent {...baseProps} {...asyncProps} {...creatableProps} />

        {error && <Caption className="text-error">{error}</Caption>}
      </div>
    );
  },
);

Select.displayName = 'Select';
