import { forwardRef } from 'react';
import { cn } from '../utils';
import { SKELETON_COLORS } from '../utils/component-colors';

export const SearchResultListItemSkeleton = forwardRef<HTMLDivElement, unknown>(
  (_, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse h-6 w-full rounded-md mb-2',
          SKELETON_COLORS.primary,
        )}
      ></div>
    );
  },
);

SearchResultListItemSkeleton.displayName = 'SearchResultListItemSkeleton';
