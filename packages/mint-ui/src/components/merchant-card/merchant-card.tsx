'use client';

import React from 'react';
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
   * @default "Cashback up to"
   */
  cashbackLabel?: string;
  /**
   * Badge color variant
   * @default "green"
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
      cashbackLabel = 'Cashback up to',
      badgeColor = 'green',
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
      <div
        className={cn(
          'flex flex-col h-full rounded-lg overflow-hidden shadow-sm transition-all duration-200',
          SURFACE_COLORS.surface,
          clickable && 'hover:shadow-md cursor-pointer',
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
        {...props}
      >
        {/* Top section - Subtle surface background with logo */}
        <div
          className={cn(
            'relative flex-1 flex flex-col',
            SURFACE_COLORS.surfaceSubtle,
          )}
        >
          {/* Badge area - always reserve space for consistent height */}
          <div className="h-8 px-3 pt-2 flex justify-end flex-shrink-0">
            {showCashback && (
              <Badge variant="solid" color={badgeColor}>
                {cashbackLabel} {cashbackPercentage}%
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
              <div className="w-16 h-16 bg-neutral-300 dark:bg-neutral-400 rounded-lg flex items-center justify-center">
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
      </div>
    );

    return clickable ? (
      <div className="group block h-full">{cardContent}</div>
    ) : (
      cardContent
    );
  },
);

MerchantCard.displayName = 'MerchantCard';
