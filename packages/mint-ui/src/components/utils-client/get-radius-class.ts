import { Radius, radiusClasses, DEFAULT_RADIUS } from "./radius";

/**
 * Get the CSS class for a given radius without requiring React context
 * This is a server-side compatible function that doesn't rely on React hooks
 *
 * @param radius The radius to get the class for, or undefined to use the default
 * @returns The CSS class for the given radius
 */
export const getStaticRadiusClass = (radius?: Radius): string => {
  return radiusClasses[radius ?? DEFAULT_RADIUS];
};
