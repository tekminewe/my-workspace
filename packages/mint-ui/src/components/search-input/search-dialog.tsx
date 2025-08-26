'use client';

import { Command } from 'cmdk';
import { forwardRef, ReactNode, useContext, useEffect, useState } from 'react';
import { SearchContext } from './search-root';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '../utils';
import {
  SURFACE_COLORS,
  TEXT_COLORS,
  BORDER_COLORS,
  OVERLAY_COLORS,
} from '../utils/component-colors';

export interface SearchDialogProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  /**
   * The children of the `SearchInputDialog` component.
   * @type {ReactNode}
   * @example <div />
   * @default undefined
   */
  children?: ReactNode;

  /**
   * The container element for the dialog. This is where the dialog will be rendered.
   * @type {HTMLElement}
   * @example document.getElementById('my-container')
   * @default undefined
   */
  container?: HTMLElement | null;

  /**
   * Placeholder text for the search input within the dialog.
   * @type {string}
   * @example "Search..."
   * @default "Search..."
   */
  searchInputPlaceholder?: string;

  /**
   * Callback function that is called when the search query changes.
   * @param query The search query string.
   * @returns
   */
  onQueryChange?: (query: string) => Promise<void> | void;
}

export const SearchDialog = forwardRef<HTMLDivElement, SearchDialogProps>(
  (
    {
      children,
      container,
      searchInputPlaceholder = 'Search...',
      onQueryChange = () => {},
      className,
    },
    ref,
  ) => {
    const { isOpen, onOpenChange } = useContext(SearchContext);
    const [query, setQuery] = useState('');
    const debounceQueryChange = useDebouncedCallback(onQueryChange, 300);

    useEffect(() => {
      debounceQueryChange?.(query);
    }, [query, debounceQueryChange]);

    return (
      <Command.Dialog
        ref={ref}
        shouldFilter={false}
        container={container ?? undefined}
        open={isOpen}
        onOpenChange={onOpenChange}
        className={cn(
          // Dialog positioning and styling
          'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
          'w-full max-w- h-full sm:max-h-[80vh]',
          SURFACE_COLORS.surfaceElevated, // bg-white dark:bg-neutral-100
          'sm:rounded-lg shadow-lg',
          BORDER_COLORS.default, // border-neutral-200 dark:border-neutral-300
          'border z-50 overflow-hidden p-4',
          className,
        )}
        overlayClassName={cn(
          // Overlay styling with centralized color
          'fixed inset-0',
          OVERLAY_COLORS.backdrop, // bg-neutral-900/80 dark:bg-neutral-300/90
        )}
      >
        <Command.Input
          className={cn(
            // NOTE: Keep these styles synchronized with TextInput component
            // When updating TextInput styles, also update this SearchDialog input
            // Both should use the same: SURFACE_COLORS, TEXT_COLORS, BORDER_COLORS, focus states
            'w-full border py-2 px-3 mb-4',
            SURFACE_COLORS.surface,
            TEXT_COLORS.primary,
            BORDER_COLORS.default,
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'appearance-none',
          )}
          placeholder={searchInputPlaceholder}
          value={query}
          onValueChange={setQuery}
        />
        <div className="overflow-y-auto">{children}</div>
      </Command.Dialog>
    );
  },
);

SearchDialog.displayName = 'SearchDialog';
