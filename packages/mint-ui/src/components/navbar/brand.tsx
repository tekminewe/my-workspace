import { Slot } from '@radix-ui/react-slot';
import { HTMLAttributes } from 'react';
import { cn } from '../utils';

export interface NavbarBrandProps extends HTMLAttributes<HTMLElement> {}

export const NavbarBrand = ({ ...props }: NavbarBrandProps) => {
  return (
    <Slot
      {...props}
      className={cn(props.className, 'md:ml-4 flex-shrink-0', {
        'cursor-pointer': props.onClick,
      })}
    />
  );
};
