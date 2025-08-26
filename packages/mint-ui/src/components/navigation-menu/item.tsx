import { AnchorHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils';
import { TEXT_COLORS } from '../utils/component-colors';
import { Slot } from '@radix-ui/react-slot';

export interface NavigationMenuItemProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}

export const NavigationMenuItem = forwardRef<
  HTMLAnchorElement,
  NavigationMenuItemProps
>(({ asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';
  return (
    <Comp
      ref={ref}
      {...props}
      className={cn(TEXT_COLORS.primary, props.className)}
    />
  );
});

NavigationMenuItem.displayName = 'NavbarMenuItem';
