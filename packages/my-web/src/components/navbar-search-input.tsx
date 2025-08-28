'use client';

import { cn } from '@tekminewe/mint-ui/components/utils';
import { SearchInput, SearchInputProps } from '@tekminewe/mint-ui/search-input';

export const NavbarSearchInput = ({
  inputContainerClassName,
  ...props
}: SearchInputProps) => {
  return (
    <SearchInput
      {...props}
      inputContainerClassName={cn(`md:w-[300px]`, inputContainerClassName)}
    />
  );
};
