'use client';

import { MenuListProps } from 'react-select';
import { GroupBase } from 'react-select';
import { SelectOption } from '../select';
import { motion } from 'motion/react';

export const MenuList = <
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>({
  children,
  innerProps,
  innerRef,
  maxHeight,
}: MenuListProps<SelectOption, IsMulti, Group>) => {
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
      ref={innerRef}
      {...safeProps}
      initial={{ opacity: 0, scaleY: 0.8 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0.8 }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 400,
        duration: 0.12,
      }}
      style={{
        maxHeight,
        transformOrigin: 'top',
      }}
      className="py-2 overflow-auto" // Increased padding from py-1 to py-2
    >
      {children}
    </motion.div>
  );
};
