'use client';

import { cn } from '../../utils';
import { TEXT_COLORS } from '../../utils/component-colors';

export const NoOptionsMessage = ({ children, innerProps }: any) => {
  return (
    <div
      {...innerProps}
      className={cn(TEXT_COLORS.muted, 'py-2 px-3 text-center')}
    >
      {children}
    </div>
  );
};
