'use client';

import { useContext } from 'react';
import { TextInput, TextInputProps } from '../text-input';
import { cn } from '../utils';
import { SearchContext } from './search-context';

// Search icon component with primary color
const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-primary-500"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export interface SearchInputProps extends Omit<TextInputProps, 'readOnly'> {}

export const SearchInput = ({
  placeholder = 'Search...',
  className,
  onClick,
  radius = 'full',
  ...props
}: SearchInputProps) => {
  const { onOpenChange } = useContext(SearchContext);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (onOpenChange) {
      onOpenChange(true);
    }
    onClick?.(e);
  };

  return (
    <TextInput
      readOnly
      placeholder={placeholder}
      radius={radius}
      rightIcon={<SearchIcon />}
      inputContainerClassName="w-[300px]"
      className={cn('[&_input]:cursor-pointer', 'cursor-pointer', className)}
      onClick={handleClick}
      {...props}
    />
  );
};
