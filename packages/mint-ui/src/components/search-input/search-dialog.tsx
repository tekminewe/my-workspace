'use client';

import { Command } from 'cmdk';
import { forwardRef, ReactNode, useContext, useEffect, useState } from 'react';
import { SearchContext } from './search-context';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '../utils';
import {
  SURFACE_COLORS,
  BORDER_COLORS,
  OVERLAY_COLORS,
  INPUT_COLORS,
} from '../utils/component-colors';
import { useEffectiveRadius } from '../utils-client/use-effective-radius';
import { Radius } from '../utils-client/radius';
import { getStaticRadiusClass } from '../utils-client/get-radius-class';

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

  /**
   * The border radius for the search dialog and its input.
   * @default "2xl"
   * @example "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none"
   */
  radius?: Radius;
}

export const SearchDialog = forwardRef<HTMLDivElement, SearchDialogProps>(
  (
    {
      children,
      container,
      searchInputPlaceholder = 'Search...',
      onQueryChange = () => {},
      className,
      radius,
    },
    ref,
  ) => {
    const { isOpen, onOpenChange } = useContext(SearchContext);
    const [query, setQuery] = useState('');
    const debounceQueryChange = useDebouncedCallback(onQueryChange, 300);
    const radiusClass = useEffectiveRadius(radius ?? '2xl');
    const dialogRadiusClass = getStaticRadiusClass(radius ?? '2xl');

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
          'w-full max-w-xl h-full sm:max-h-[80vh]',
          SURFACE_COLORS.surfaceElevated, // bg-white dark:bg-neutral-100
          `sm:${dialogRadiusClass} shadow-lg`,
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
            // Both should use the same borderless design with INPUT_COLORS
            'w-full py-2 px-3 mb-4',
            radiusClass,
            INPUT_COLORS.background,
            INPUT_COLORS.text,
            INPUT_COLORS.placeholder,
            INPUT_COLORS.focusRing,
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
