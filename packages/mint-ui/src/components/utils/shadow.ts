export type Shadow = "none" | "sm" | "md" | "lg" | "xl";

/**
 * Map shadow tokens to CSS variable names
 */
export const shadowMap: Record<Shadow, string> = {
  none: "none",
  sm: "var(--shadow-1)",
  md: "var(--shadow-2)",
  lg: "var(--shadow-3)",
  xl: "var(--shadow-4)",
};

/**
 * Map shadow tokens to Tailwind CSS classes
 */
export const shadowClasses: Record<Shadow, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

/**
 * Default shadow value for components
 */
export const DEFAULT_SHADOW: Shadow = "none";

/**
 * Get the CSS class for a given shadow
 */
export const getShadowClass = (shadow?: Shadow): string => {
  return shadowClasses[shadow ?? DEFAULT_SHADOW];
};

/**
 * Get the CSS variable for a given shadow
 */
export const getShadowVariable = (shadow?: Shadow): string => {
  return shadowMap[shadow ?? DEFAULT_SHADOW];
};
