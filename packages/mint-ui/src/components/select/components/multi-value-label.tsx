'use client';

import { cn } from '../../utils';
import { TEXT_COLORS } from '../../utils/component-colors';

export const MultiValueLabel = ({ children, innerProps }: any) => {
  return (
    <div {...innerProps} className={cn(TEXT_COLORS.primary, 'px-1.5 py-0.5')}>
      {children}
    </div>
  );
};
