export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Map radius tokens to CSS variable names
 */
export const radiusMap: Record<Radius, string> = {
  none: '0',
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  full: 'var(--radius-full)',
};

/**
 * Map radius tokens to Tailwind CSS classes
 */
export const radiusClasses: Record<Radius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

/**
 * Default radius value for components
 */
export const DEFAULT_RADIUS: Radius = 'full';

/**
 * Get the CSS class for a given radius
 */
export const getRadiusClass = (radius?: Radius): string => {
  return radiusClasses[radius ?? DEFAULT_RADIUS];
};

/**
 * Get the CSS variable for a given radius
 */
export const getRadiusVariable = (radius?: Radius): string => {
  return radiusMap[radius ?? DEFAULT_RADIUS];
};
