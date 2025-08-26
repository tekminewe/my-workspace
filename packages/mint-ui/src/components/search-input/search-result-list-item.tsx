'use client';

import { Command } from 'cmdk';
import { forwardRef, ReactNode, useContext } from 'react';
import { cn } from '../utils';
import { TEXT_COLORS, BORDER_COLORS } from '../utils/component-colors';
import { SearchContext } from './search-context';

export interface SearchResultListItemProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'title' | 'onSelect' | 'disabled' | 'value'
  > {
  /**
   * The URL of the image to display in the search result item.
   * @type string
   * @example "https://example.com/image.png"
   * @default undefined
   */
  imageUrl?: string;

  /**
   * The subtitle to display in the search result item.
   * @type ReactNode
   * @example "This is a subtitle"
   * @default undefined
   */
  subtitle?: ReactNode;

  /**
   * The title to display in the search result item.
   * @type string
   * @example "This is a title"
   * @default undefined
   */
  title: string;

  /**
   * The callback function when the item is clicked.
   * @returns
   */
  onItemClick?: () => void;

  /**
   * Should the dialog be dismissed when the item is selected.
   * @type boolean
   * @default false
   */
  dismissOnSelect?: boolean;
}
export const SearchResultListItem = forwardRef<
  HTMLDivElement,
  SearchResultListItemProps
>(
  (
    {
      title,
      subtitle,
      imageUrl,
      className,
      onItemClick,
      dismissOnSelect,
      ...props
    },
    ref,
  ) => {
    const { onOpenChange } = useContext(SearchContext);

    const handleSelect = () => {
      onItemClick?.();

      if (dismissOnSelect) {
        onOpenChange?.(false);
      }
    };
    return (
      <Command.Item
        ref={ref}
        {...props}
        onSelect={handleSelect}
        className={cn(
          // Search result list item styles (converted from globals.css)
          'flex items-center p-2 cursor-pointer gap-3 rounded-md group',
          'hover:bg-primary-50 dark:hover:bg-primary-100 transition-colors',
          className,
        )}
      >
        {imageUrl && (
          <div
            className={cn(
              'w-[50px] h-[50px] rounded-md overflow-hidden flex items-center justify-center',
              BORDER_COLORS.default,
            )}
          >
            <img src={imageUrl} alt={title} className="w-full" />
          </div>
        )}
        <div>
          <div className={cn('font-semibold text-lg', TEXT_COLORS.primary)}>
            {title}
          </div>
          {subtitle && (
            <div
              className={cn(TEXT_COLORS.muted, 'group-hover:text-primary-700')}
            >
              {subtitle}
            </div>
          )}
        </div>
      </Command.Item>
    );
  },
);

SearchResultListItem.displayName = 'SearchResultListItem';
