'use client';

import React from 'react';
import { Badge } from '../badge';
import { cn } from '../utils';

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
          'flex flex-col h-full rounded-lg overflow-hidden bg-white dark:bg-neutral-100 shadow-sm transition-all duration-200',
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
        {/* Top section - Gray background with logo */}
        <div className="relative bg-neutral-100 dark:bg-neutral-200 p-6 flex-shrink-0">
          {/* Cashback Badge - positioned at top right */}
          {showCashback && (
            <div className="absolute top-3 right-3 z-10">
              <Badge variant="solid" color={badgeColor}>
                {cashbackLabel} {cashbackPercentage}%
              </Badge>
            </div>
          )}

          {/* Logo container - centered, fixed height */}
          <div className="flex items-center justify-center h-28 pt-4">
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
                <span className="text-neutral-600 dark:text-neutral-700 text-sm font-medium">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom section - White background with title */}
        <div className="bg-white dark:bg-neutral-50 p-4 flex-grow flex items-center justify-center">
          <h3
            className={cn(
              'text-sm font-medium text-neutral-900 dark:text-neutral-900 text-center leading-tight transition-colors',
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
