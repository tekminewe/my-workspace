import { cn } from '../utils';

export interface DialogFooterProps {
  /**
   * The children of the dialog footer
   * @default undefined
   * @type React.ReactNode
   * @required false
   */
  children?: React.ReactNode;

  /**
   * Additional class name
   * @default undefined
   * @type string
   * @required false
   */
  className?: string;
}

export const DialogFooter = ({ children, className }: DialogFooterProps) => {
  return (
    <div className={cn('flex gap-2 mt-2 justify-end', className)}>
      {children}
    </div>
  );
};
