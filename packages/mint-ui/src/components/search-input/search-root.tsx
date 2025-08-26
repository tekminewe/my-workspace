'use client';

import React, { useEffect } from 'react';
import { SearchContext } from './search-context';

export interface SearchRootProps {
  /**
   * The children of the `SearchInputRoot` component.
   * @type {React.ReactNode}
   * @example <SearchInputRoot>...</SearchInputRoot>
   */
  children?: React.ReactNode;

  /**
   * The open state of the search input dialog.
   * @type {boolean}
   * @example true
   * @default false
   */
  open?: boolean;

  /**
   * Callback function when the open state changes.
   * @type {(isOpen: boolean) => void}
   * @example (isOpen) => { console.log(isOpen); }
   * @default undefined
   */
  onOpenChange?: (isOpen: boolean) => void;
}

export const SearchRoot = ({
  children,
  open = false,
  onOpenChange,
}: SearchRootProps) => {
  const [isOpen, setIsOpen] = React.useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpenChange = (newIsOpen: boolean) => {
    if (!onOpenChange) {
      setIsOpen(newIsOpen);
    } else {
      onOpenChange?.(newIsOpen);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        onOpenChange: handleOpenChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
