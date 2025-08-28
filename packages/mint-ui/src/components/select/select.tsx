'use client';

import { forwardRef, useMemo, useRef } from 'react';
import ReactSelect, {
  MultiValue,
  SingleValue,
  Props as ReactSelectProps,
  StylesConfig,
  GroupBase,
} from 'react-select';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { FormLabel } from '../form';
import { Caption } from '../typography';
import { cn } from '../utils';
import { customComponents } from './components';
import { Radius } from '../utils-client/radius';

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
   * Border radius for the select control
   * @default "2xl"
   * @example "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none"
   */
  radius?: Radius;

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

  /**
   * Minimum width for the select component
   * @default undefined
   * @example "200px" | "12rem"
   */
  minWidth?: string;

  /**
   * Whether to automatically calculate minimum width based on option lengths
   * @default false
   */
  autoMinWidth?: boolean;
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
      radius,
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
      minWidth,
      autoMinWidth = true,
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

    // Calculate dynamic minimum width based on options
    const calculatedMinWidth = useMemo(() => {
      if (!autoMinWidth || !options.length) return minWidth;

      // Create a temporary element to measure text width
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return minWidth;

      // Set font style based on size
      const fontSize = size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px';
      context.font = `${fontSize} system-ui, -apple-system, sans-serif`;

      // Find the longest option
      let maxWidth = 0;
      options.forEach((option) => {
        const textWidth = context.measureText(option.label).width;
        maxWidth = Math.max(maxWidth, textWidth);
      });

      // Add padding and space for dropdown indicator (approximately 60px total)
      const calculatedWidth = Math.max(maxWidth + 60, 120); // Minimum 120px
      const dynamicMinWidth = `${calculatedWidth}px`;

      // Return the larger of manual minWidth or calculated width
      if (minWidth) {
        const manualWidth = parseInt(minWidth.replace(/[^0-9]/g, ''));
        return calculatedWidth > manualWidth ? dynamicMinWidth : minWidth;
      }

      return dynamicMinWidth;
    }, [autoMinWidth, options, minWidth, size]);

    // Ref to track the control element for width calculation
    const controlRef = useRef<HTMLDivElement>(null);

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

    // Minimal styles for specific overrides not handled by custom components
    const customStyles: StylesConfig<
      SelectOption,
      boolean,
      GroupBase<SelectOption>
    > = {
      // Remove all default styles to rely on custom components
      control: () => ({}),
      menu: () => ({}),
      menuList: () => ({}),
      option: () => ({}),
      singleValue: () => ({}),
      placeholder: () => ({}),
      input: () => ({}),
      multiValue: () => ({}),
      multiValueLabel: () => ({}),
      multiValueRemove: () => ({}),
      valueContainer: () => ({}),
      indicatorsContainer: () => ({}),
      dropdownIndicator: () => ({}),
      clearIndicator: () => ({}),
      indicatorSeparator: () => ({}),
      loadingIndicator: () => ({}),
      loadingMessage: () => ({}),
      noOptionsMessage: () => ({}),
    };

    // Pass additional props to components via selectProps
    const selectProps = {
      error,
      size,
      radius,
      calculatedMinWidth, // Keep this for Menu component
      controlRef, // Pass control ref for width calculation
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
      styles: customStyles,
      components: customComponents,
      className: cn('react-select-container', className),
      classNamePrefix: 'react-select',
      // Pass additional props to components
      ...selectProps,
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
