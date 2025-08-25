'use client';

import { LuFilter } from 'react-icons/lu';
import { Button } from '@tekminewe/mint-ui/button';
import { Badge } from '@tekminewe/mint-ui/badge';

interface MobileFilterButtonProps {
  /**
   * Number of active filters
   */
  activeFiltersCount: number;

  /**
   * Button click handler
   */
  onClick: () => void;

  /**
   * Dictionary for translations
   */
  dictionary: {
    filters: string;
  };

  /**
   * Custom class name
   */
  className?: string;
}

export const MobileFilterButton = ({
  activeFiltersCount,
  onClick,
  dictionary,
  className,
}: MobileFilterButtonProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={`relative ${className || ''}`}
    >
      <LuFilter className="w-4 h-4 mr-2" />
      {dictionary.filters}
      {activeFiltersCount > 0 && (
        <Badge
          size="1"
          className="absolute -top-2 -right-2 min-w-5 h-5 flex items-center justify-center"
        >
          {activeFiltersCount}
        </Badge>
      )}
    </Button>
  );
};
