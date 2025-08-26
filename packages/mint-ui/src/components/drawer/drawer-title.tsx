import { Drawer as Vaul } from 'vaul';
import { cn } from '../utils';
import { DialogTitleProps } from '@radix-ui/react-dialog';

export interface DrawerTitleProps extends DialogTitleProps {}

export const DrawerTitle = ({
  children,
  className,
  ...props
}: DrawerTitleProps) => {
  return (
    <Vaul.Title
      className={cn(
        'font-semibold flex mb-4 items-center gap-1',
        {
          hidden: !children,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Vaul.Title>
  );
};
