import { Fallback, Root, Image } from '@radix-ui/react-avatar';
import { forwardRef, ReactNode } from 'react';
import { cn } from '../utils';

export interface AvatarProps {
  /**
   * The URL of the image to display.
   * @default undefined
   * @example "https://example.com/avatar.jpg"
   */
  src?: string;

  /**
   * Fallback content to display when the image fails to load.
   * @default undefined
   * @example <span>JD</span>
   */
  fallback?: ReactNode;

  /**
   * The alternative text for the image.
   * @default undefined
   * @example "John Doe"
   */
  alt?: string;

  /**
   * Additional class names to apply to the component.
   * @default undefined
   */
  className?: string;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, fallback, alt, className }, ref) => {
    return (
      <Root ref={ref} className={cn('avatar', className)}>
        <Image src={src} alt={alt} />
        <Fallback>{fallback}</Fallback>
      </Root>
    );
  },
);

Avatar.displayName = 'Avatar';
