import {
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons';
import * as React from 'react';
import { cn } from '../utils';

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the callout.
   */
  children: React.ReactNode;

  /**
   * The type of the callout.
   * @default "info"
   */
  type?: 'info' | 'warning' | 'error' | 'success';

  /**
   * The visual variant of the callout.
   * @default "inline"
   * @example "card"
   */
  variant?: 'inline' | 'card';

  /**
   * Additional CSS class names.
   */
  className?: string;
}

export function Callout({
  children,
  type = 'info',
  variant = 'inline',
  className,
  ...props
}: CalloutProps) {
  const renderIcon = () => {
    const iconSize = variant === 'card' ? 'h-16 w-16' : 'h-4 w-4';
    const iconColor = variant === 'card' ? getIconColor() : '';

    switch (type) {
      case 'info':
        return (
          <InfoCircledIcon
            className={`${iconSize} ${iconColor} flex-shrink-0`}
          />
        );
      case 'warning':
        return (
          <ExclamationTriangleIcon
            className={`${iconSize} ${iconColor} flex-shrink-0`}
          />
        );
      case 'error':
        return (
          <CrossCircledIcon
            className={`${iconSize} ${iconColor} flex-shrink-0`}
          />
        );
      case 'success':
        return (
          <CheckCircledIcon
            className={`${iconSize} ${iconColor} flex-shrink-0`}
          />
        );
      default:
        return (
          <InfoCircledIcon
            className={`${iconSize} ${iconColor} flex-shrink-0`}
          />
        );
    }
  };

  const getIconColor = () => {
    if (variant === 'inline') return '';

    switch (type) {
      case 'info':
        return 'text-info-600 dark:text-info-400';
      case 'warning':
        return 'text-warning-600 dark:text-warning-400';
      case 'error':
        return 'text-error-600 dark:text-error-400';
      case 'success':
        return 'text-success-600 dark:text-success-400';
      default:
        return 'text-info-600 dark:text-info-400';
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'info':
        return 'bg-info-50 border-info-200 text-info-700 dark:bg-info-50/20 dark:border-info-200/30 dark:text-info-400';
      case 'warning':
        return 'bg-warning-50 border-warning-200 text-warning-700 dark:bg-warning-50/20 dark:border-warning-200/30 dark:text-warning-400';
      case 'error':
        return 'bg-error-50 border-error-200 text-error-700 dark:bg-error-50/20 dark:border-error-200/30 dark:text-error-400';
      case 'success':
        return 'bg-success-50 border-success-200 text-success-700 dark:bg-success-50/20 dark:border-success-200/30 dark:text-success-400';
      default:
        return 'bg-info-50 border-info-200 text-info-700 dark:bg-info-50/20 dark:border-info-200/30 dark:text-info-400';
    }
  };

  return (
    <div
      className={cn(
        variant === 'card'
          ? 'flex flex-col items-center justify-center text-center p-6 md:p-8 space-y-4 rounded-xl shadow-sm max-w-xl mx-auto'
          : 'flex items-center gap-2 rounded-md border p-4',
        getStyles(),
        className,
      )}
      {...props}
    >
      {variant === 'card' ? (
        <>
          <div>{renderIcon()}</div>
          <div className="space-y-2">{children}</div>
        </>
      ) : (
        <>
          <div className="mt-0.5">{renderIcon()}</div>
          <div>{children}</div>
        </>
      )}
    </div>
  );
}
