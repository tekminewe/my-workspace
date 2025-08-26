'use client';

import { Drawer as Vaul } from 'vaul';
import { cn } from '../utils';
import { HTMLAttributes } from 'react';

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Container to render the drawer
   * @default document.body
   * @example document.querySelector("#drawer-container")
   */
  container?: HTMLElement | null;

  /**
   * Show overlay
   * @default true
   * @example false
   */
  showOverlay?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  container,
  className,
  style,
  showOverlay = true,
  ...props
}: DrawerProps) => {
  return (
    <Vaul.Portal container={container}>
      {showOverlay && <Vaul.Overlay className="overlay" />}
      <Vaul.Content
        style={style}
        className={cn('drawer', className)}
        {...props}
      >
        {children}
      </Vaul.Content>
    </Vaul.Portal>
  );
};
