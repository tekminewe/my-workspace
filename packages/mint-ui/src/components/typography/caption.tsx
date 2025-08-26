import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';

export interface CaptionProps extends HTMLAttributes<HTMLSpanElement> {}

export const Caption = forwardRef<HTMLSpanElement, CaptionProps>(
  ({ className, ...props }, ref) => {
    return <span ref={ref} {...props} className={cn('caption', className)} />;
  },
);

Caption.displayName = 'Caption';
