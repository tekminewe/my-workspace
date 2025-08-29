'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '../badge';
import { cn } from '../utils';
import { SURFACE_COLORS, TEXT_COLORS } from '../utils/component-colors';

export interface MerchantCardProps {
  /**
   * The merchant name to display
   */
  name: string;
  /**
   * The merchant logo URL
   */
  logoUrl?: string;
  /**
   * The cashback percentage (will only show if > 0)
   */
  cashbackPercentage?: number;
  /**
   * Custom text for cashback badge
   * @default "Up to X% cashback"
   */
  cashbackLabel?: string;
  /**
   * Badge color variant
   * @default "red"
   */
  badgeColor?: 'gray' | 'green' | 'red' | 'blue' | 'yellow';
  /**
   * Click handler for the card
   */
  onClick?: () => void;
  /**
   * Whether the card is clickable
   * @default true
   */
  clickable?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Custom logo fallback content
   */
  logoFallback?: React.ReactNode;
}

export const MerchantCard = React.forwardRef<HTMLDivElement, MerchantCardProps>(
  (
    {
      name,
      logoUrl,
      cashbackPercentage,
      cashbackLabel = 'Up to X% cashback',
      badgeColor = 'red',
      onClick,
      clickable = true,
      className,
      logoFallback,
      ...props
    },
    ref,
  ) => {
    const showCashback =
      typeof cashbackPercentage === 'number' && cashbackPercentage > 0;

    const cardContent = (
      <motion.div
        className={cn(
          'flex flex-col h-full rounded-xl overflow-hidden',
          SURFACE_COLORS.surface,
          clickable && 'cursor-pointer',
          clickable &&
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          className,
        )}
        tabIndex={clickable ? 0 : undefined}
        role={clickable ? 'button' : undefined}
        onClick={onClick}
        onKeyDown={
          clickable
            ? (e) => {
                if ((e.key === 'Enter' || e.key === ' ') && onClick) {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        ref={ref}
        whileHover={clickable ? { scale: 1.025 } : undefined}
        whileTap={clickable ? { scale: 0.98 } : undefined}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        {...props}
      >
        {/* Top section - Subtle surface background with logo */}
        <div
          className={cn(
            'relative flex-1 flex flex-col m-2 rounded-xl',
            SURFACE_COLORS.surfaceElevated,
          )}
        >
          {/* Badge area - always reserve space for consistent height */}
          <div className="h-8 px-3 pt-2 flex justify-start flex-shrink-0">
            {showCashback && (
              <Badge variant="solid" color={badgeColor}>
                {cashbackLabel.replace(
                  'X',
                  cashbackPercentage?.toString() || '0',
                )}
              </Badge>
            )}
          </div>

          {/* Logo container - centered, takes remaining space */}
          <div className="flex items-center justify-center flex-1 px-6 pb-4">
            {logoUrl ? (
              <div className="flex items-center justify-center w-20 h-20">
                <img
                  src={logoUrl}
                  alt={`${name} logo`}
                  className="object-contain w-full h-full"
                  loading="lazy"
                />
              </div>
            ) : logoFallback ? (
              logoFallback
            ) : (
              <div className="w-16 h-16 bg-neutral-300 dark:bg-neutral-400 rounded-xl flex items-center justify-center">
                <span
                  className={cn('text-sm font-medium', TEXT_COLORS.secondary)}
                >
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom section - Main surface background with title */}
        <div
          className={cn(
            'p-3 flex-shrink-0 flex items-center justify-center min-h-[3rem]',
            SURFACE_COLORS.surface,
          )}
        >
          <h3
            className={cn(
              'text-sm font-medium text-center leading-tight transition-colors',
              TEXT_COLORS.primary,
              clickable && 'group-hover:text-primary-600',
            )}
          >
            {name}
          </h3>
        </div>
      </motion.div>
    );

    return clickable ? (
      <div className="group block h-full">{cardContent}</div>
    ) : (
      cardContent
    );
  },
);

MerchantCard.displayName = 'MerchantCard';
