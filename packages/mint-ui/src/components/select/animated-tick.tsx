'use client';

import { motion } from 'motion/react';
import { FiCheck } from 'react-icons/fi';

interface AnimatedTickProps {
  isSelected: boolean | null | undefined;
  shouldReduceMotion?: boolean;
}

/**
 * Animated tick component that appears when an option is selected
 * Provides a smooth scale and fade animation
 */
export const AnimatedTick = ({
  isSelected,
  shouldReduceMotion = false,
}: AnimatedTickProps) => {
  if (!isSelected) return null;

  return (
    <motion.div
      initial={{
        scale: shouldReduceMotion ? 1 : 0,
        opacity: shouldReduceMotion ? 1 : 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: shouldReduceMotion
          ? {
              duration: 0.15,
            }
          : {
              type: 'spring',
              stiffness: 400,
              damping: 25,
              mass: 0.5,
            },
      }}
      exit={{
        scale: shouldReduceMotion ? 1 : 0,
        opacity: shouldReduceMotion ? 0 : 0,
        transition: {
          duration: 0.1,
        },
      }}
      className="flex items-center justify-center"
    >
      <FiCheck className="text-primary-500" size={16} />
    </motion.div>
  );
};
