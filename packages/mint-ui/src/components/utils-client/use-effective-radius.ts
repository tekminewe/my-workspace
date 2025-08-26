import { Radius, getRadiusClass } from "./radius";
import { useRadius } from "./use-radius";

/**
 * Hook that combines the global radius context with component-specific radius prop
 * to determine the effective radius class to use.
 *
 * @param componentRadius - The radius prop passed to the component
 * @returns The CSS class name for the effective radius
 */
export const useEffectiveRadius = (componentRadius?: Radius): string => {
  const { defaultRadius } = useRadius();

  // Component-specific radius takes precedence over global default
  const effectiveRadius = componentRadius ?? defaultRadius;

  return getRadiusClass(effectiveRadius);
};
