'use client';

import React from 'react';

export interface SearchContext {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const SearchContext = React.createContext<SearchContext>({
  isOpen: false,
  onOpenChange: undefined,
});
