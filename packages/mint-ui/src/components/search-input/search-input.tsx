'use client';

import { useContext } from 'react';
import { TextInput, TextInputProps } from '../text-input';
import { cn } from '../utils';
import { SearchContext } from './search-root';
import { INTERACTION_COLORS } from '../utils/component-colors';

export interface SearchInputProps extends Omit<TextInputProps, 'readOnly'> {}

export const SearchInput = ({
  placeholder = 'Search...',
  className,
  onClick,
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
      className={cn(
        '[&_input]:cursor-pointer',
        'cursor-pointer',
        INTERACTION_COLORS.hover,
        className,
      )}
      onClick={handleClick}
      {...props}
    />
  );
};
