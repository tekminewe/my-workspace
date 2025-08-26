import { HTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils';
import { Radius } from '../utils-client/radius';
import { Shadow, getShadowClass } from '../utils/shadow';
import { getStaticRadiusClass } from '../utils-client/get-radius-class';
import { getCardColors } from '../utils/component-colors';

export type CardShadow = Shadow;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Use the children as the component.
   * @default false
   */
  asChild?: boolean;

  /**
   * The shadow size for the card.
   * @default "none"
   * @example "md"
   */
  shadow?: CardShadow;

  /**
   * The border radius for the card.
   * If not provided, uses the global default radius from RadiusProvider.
   * @default "md" (from global context)
   * @example "lg"
   */
  radius?: Radius;
}

export const Card = (props: CardProps) => {
  const { asChild, shadow = 'none', radius, ...rest } = props;
  const Comp = asChild ? Slot : 'div';
  const radiusClass = getStaticRadiusClass(radius);

  return (
    <Comp
      {...rest}
      className={cn(
        'p-4', // Base padding
        getCardColors('default'), // Standardized card colors
        radiusClass, // Apply the effective radius
        shadow !== 'none' && getShadowClass(shadow), // Apply shadow if specified
        'border', // Ensure border is always present
        props.className,
      )}
    />
  );
};
