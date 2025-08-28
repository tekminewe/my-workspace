'use client';

import { MenuProps } from 'react-select';
import { GroupBase } from 'react-select';
import { SelectOption } from '../select';
import { cn } from '../../utils';
import { getMenuColors } from '../../utils/component-colors';
import { motion } from 'motion/react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { getStaticRadiusClass } from '../../utils-client/get-radius-class';

export const Menu = <
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>({
  children,
  innerProps,
  innerRef,
  selectProps,
}: MenuProps<SelectOption, IsMulti, Group>) => {
  const { calculatedMinWidth, controlRef, radius } = (selectProps as any) || {};
  const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined);
  const menuRef = useRef<HTMLDivElement>(null);

  // Function to calculate the menu width
  const calculateMenuWidth = useCallback(() => {
    if (!controlRef?.current) return;

    const controlWidth = controlRef.current.getBoundingClientRect().width;
    const calculatedWidth = calculatedMinWidth
      ? parseFloat(calculatedMinWidth.replace('px', ''))
      : 0;
    const finalWidth = Math.max(controlWidth, calculatedWidth);

    setMenuWidth(finalWidth);
  }, [calculatedMinWidth, controlRef]);

  // Calculate width on mount and when calculatedMinWidth changes
  useEffect(() => {
    calculateMenuWidth();

    // Recalculate on window resize in case the control width changes
    const handleResize = () => {
      calculateMenuWidth();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateMenuWidth]);

  const {
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    onTransitionEnd,
    ...safeProps
  } = innerProps || {};

  return (
    <motion.div
      ref={(node) => {
        // Set both our ref and the react-select ref
        menuRef.current = node;
        if (typeof innerRef === 'function') {
          innerRef(node);
        } else if (innerRef) {
          innerRef.current = node;
        }
      }}
      {...safeProps}
      style={{
        width: menuWidth ? `${menuWidth}px` : calculatedMinWidth || 'auto',
        minWidth: menuWidth ? `${menuWidth}px` : calculatedMinWidth || 'auto',
      }}
      initial={{ opacity: 0, y: -4, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98 }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 400,
        duration: 0.12,
      }}
      className={cn(
        // Base styles - positioned but with flexible width
        'absolute top-full left-0 mt-1 z-[9999]',
        // Background and styling with more padding - using centralized menu colors
        getMenuColors('container'),
        'shadow-lg overflow-hidden',
        getStaticRadiusClass(radius ?? 'lg'), // Use lg as default for select menu
        // Isolation for z-index
        'isolate',
      )}
    >
      {children}
    </motion.div>
  );
};
