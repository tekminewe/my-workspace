'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '../utils';
import {
  SURFACE_COLORS,
  BORDER_COLORS,
  OVERLAY_COLORS,
} from '../utils/component-colors';
import { Radius } from '../utils-client/radius';
import { getStaticRadiusClass } from '../utils-client/get-radius-class';

export const DialogRoot = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

export interface DialogProps {
  /**
   * The children of the dialog
   * @default undefined
   * @type React.ReactNode
   * @required false
   */
  children?: React.ReactNode;

  /**
   * Container to render the dialog
   * @default document.body
   * @example document.querySelector("#dialog-container")
   */
  container?: HTMLElement | null;

  /**
   * Additional class name
   * @default undefined
   * @type string
   * @required false
   */
  className?: string;

  /**
   * The border radius for the dialog
   * @default "2xl"
   * @example "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none"
   */
  radius?: Radius;
}

export const Dialog = ({
  children,
  container,
  className,
  radius,
}: DialogProps) => {
  const radiusClass = getStaticRadiusClass(radius ?? '2xl'); // Use 2xl as default for dialog

  const defaultClassName = `fixed left-[50%] top-[50%] z-50 grid w-full sm:w-auto max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border ${BORDER_COLORS.default} ${SURFACE_COLORS.surface} p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] h-full sm:h-auto sm:max-h-[85vh] sm:${radiusClass}`;

  return (
    <RadixDialog.Portal container={container}>
      <RadixDialog.Overlay
        className={`fixed inset-0 z-40 ${OVERLAY_COLORS.backdrop} data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`}
      />
      <RadixDialog.Content className={cn(defaultClassName, className)}>
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
};
