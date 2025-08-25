import { cn } from '../utils';
import { BORDER_COLORS } from '../utils/component-colors';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The orientation of the separator.
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Additional CSS class names.
   */
  className?: string;
}

export function Separator({
  orientation = 'horizontal',
  className,
  ...props
}: SeparatorProps) {
  return (
    <div
      className={cn(
        'shrink-0',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        BORDER_COLORS.default,
        className,
      )}
      {...props}
    />
  );
}
