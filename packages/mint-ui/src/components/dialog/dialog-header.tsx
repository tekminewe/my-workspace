'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '../utils';
import { LuX } from 'react-icons/lu';

export interface DialogHeaderProps {
  title: string;
  description?: string;
  showCloseButton?: boolean;
  className?: string;
}

export const DialogHeader = ({
  title,
  description,
  showCloseButton = true,
  className,
}: DialogHeaderProps) => {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5 text-center sm:text-left mb-4',
        className,
      )}
    >
      <RadixDialog.Title className="text-lg font-semibold leading-none tracking-tight">
        {title}
      </RadixDialog.Title>
      {description && (
        <RadixDialog.Description className="text-sm text-muted-foreground">
          {description}
        </RadixDialog.Description>
      )}
      {showCloseButton && (
        <RadixDialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <LuX className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </RadixDialog.Close>
      )}
    </div>
  );
};
