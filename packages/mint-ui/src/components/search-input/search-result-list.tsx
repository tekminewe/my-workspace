'use client';

import { Command } from 'cmdk';
import { forwardRef, ReactNode } from 'react';
import { SearchResultListItemSkeleton } from './search-result-list-item-skeleton';
import { TEXT_COLORS } from '../utils/component-colors';
import { cn } from '../utils';

export interface SearchResultListProps {
  /**
   * The text to display when there are no results found in the search list.
   * @type string
   * @example "No results found."
   * @default "Sorry, no results found."
   */
  emptyText?: string;

  /**
   * The children of the `SearchInputDialog` component.
   * @type {ReactNode}
   * @example <div />
   * @default undefined
   */
  children?: ReactNode;

  /**
   * Indicates whether the search result list is currently loading.
   * This can be used to show a loading state while search results are being fetched.
   * @type boolean
   * @example true
   * @default false
   */
  isLoading?: boolean;
}

export const SearchResultList = forwardRef<
  HTMLDivElement,
  SearchResultListProps
>(
  (
    { emptyText = 'Sorry, no results found.', children, isLoading = false },
    ref,
  ) => {
    return (
      <Command.List
        ref={ref}
        data-state={isLoading ? 'loading' : 'loaded'}
        className="overflow-y-auto h-[calc(100svh-72px)] scrollbar-none"
      >
        {isLoading ? (
          <Command.Loading>
            <SearchResultListItemSkeleton />
            <SearchResultListItemSkeleton />
            <SearchResultListItemSkeleton />
          </Command.Loading>
        ) : (
          <>
            <Command.Empty
              className={cn('p-4 text-center text-sm', TEXT_COLORS.muted)}
            >
              {emptyText}
            </Command.Empty>
            {children}
          </>
        )}
      </Command.List>
    );
  },
);

SearchResultList.displayName = 'SearchResultList';
