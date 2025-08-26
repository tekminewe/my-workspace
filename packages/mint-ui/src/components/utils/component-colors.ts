/**
 * Standardized color classes for components to ensure consistency
 * and prevent common theming issues across the component library.
 */

/**
 * Standard surface/card background colors
 * - Light mode: Very subtle off-white for cards and surfaces
 * - Dark mode: Dark but not extreme background for readability
 */
export const SURFACE_COLORS = {
  /** Main surface background (cards, panels, modals) */
  surface: 'bg-white dark:bg-neutral-100',

  /** Elevated surface background (dropdowns, popovers, tooltips) */
  surfaceElevated: 'bg-white dark:bg-neutral-100',

  /** Subtle surface background (section backgrounds, subtle cards) */
  surfaceSubtle: 'bg-neutral-50 dark:bg-neutral-50',
} as const;

/**
 * Standard text colors that work with surface backgrounds
 */
export const TEXT_COLORS = {
  /** Primary text color with high contrast */
  primary: 'text-neutral-900 dark:text-neutral-900',

  /** Secondary text color with medium contrast */
  secondary: 'text-neutral-700 dark:text-neutral-700',

  /** Muted text color for less important content */
  muted: 'text-neutral-500 dark:text-neutral-500',

  /** Disabled text color */
  disabled: 'text-neutral-400 dark:text-neutral-400',
} as const;

/**
 * Standard border colors that work with surface backgrounds
 */
export const BORDER_COLORS = {
  /** Default border color for cards and surfaces */
  default: '!border-neutral-200 dark:!border-neutral-300',

  /** Subtle border color for less prominent divisions */
  subtle: 'border-neutral-100 dark:border-neutral-200',

  /** Strong border color for emphasis */
  strong: 'border-neutral-300 dark:border-neutral-400',
} as const;

/**
 * Interactive state colors for hover, focus, and active states
 */
export const INTERACTION_COLORS = {
  /** Hover background color for interactive elements */
  hover: 'hover:bg-neutral-100 dark:hover:bg-neutral-200',

  /** Focus ring color for accessibility */
  focus: 'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',

  /** Active/pressed state background */
  active: 'active:bg-neutral-200 dark:active:bg-neutral-300',
} as const;

/**
 * Loading skeleton colors that are visible in both light and dark modes
 */
export const SKELETON_COLORS = {
  /** Primary skeleton background with good visibility */
  primary: 'bg-neutral-200 dark:bg-neutral-300',

  /** Secondary skeleton background for nested elements */
  secondary: 'bg-neutral-100 dark:bg-neutral-200',
} as const;

/**
 * Overlay colors for modals, dialogs, and backdrops
 */
export const OVERLAY_COLORS = {
  /** Dialog/modal backdrop overlay - subtle in light mode, darker in dark mode */
  backdrop: 'bg-neutral-900/80 dark:bg-neutral-300/90',

  /** Lighter overlay for less prominent backdrops */
  light: 'bg-neutral-900/60 dark:bg-neutral-900/70',

  /** Heavy overlay for maximum focus on foreground content */
  heavy: 'bg-neutral-900/90 dark:bg-neutral-900/95',
} as const;

/**
 * Common interactive element colors for navigation items, list items, etc.
 */
export const NAVIGATION_COLORS = {
  /** Default navigation item styling */
  item: `${TEXT_COLORS.secondary} ${INTERACTION_COLORS.hover} hover:text-neutral-900 dark:hover:text-neutral-50`,

  /** Disabled navigation item styling */
  itemDisabled: `${TEXT_COLORS.disabled} cursor-not-allowed pointer-events-none`,
} as const;

/**
 * Complete card styling with consistent background, text, and border
 */
export const CARD_COLORS = {
  /** Standard card styling */
  default: `${SURFACE_COLORS.surface} ${TEXT_COLORS.primary} ${BORDER_COLORS.default}`,

  /** Elevated card styling (with stronger background) */
  elevated: `${SURFACE_COLORS.surfaceElevated} ${TEXT_COLORS.primary} ${BORDER_COLORS.default}`,

  /** Subtle card styling (less prominent) */
  subtle: `${SURFACE_COLORS.surfaceSubtle} ${TEXT_COLORS.secondary} ${BORDER_COLORS.subtle}`,
} as const;

/**
 * Button color system for consistent interactive button styling
 */
export const BUTTON_COLORS = {
  solid: {
    primary:
      'bg-primary-100 text-primary-700 hover:bg-primary-200 focus:ring-primary-400 dark:bg-primary-200 dark:text-primary-900 dark:hover:bg-primary-100',
    neutral: `${SURFACE_COLORS.surface} ${TEXT_COLORS.secondary} ${INTERACTION_COLORS.hover} focus:ring-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50`,
    success:
      'bg-success-100 text-success-700 hover:bg-success-200 focus:ring-success-500 dark:bg-success-200 dark:text-success-900 dark:hover:bg-success-100',
    error:
      'bg-error-100 text-error-700 hover:bg-error-200 focus:ring-error-500 dark:bg-error-200 dark:text-error-900 dark:hover:bg-error-100',
    warning:
      'bg-warning-100 text-warning-700 hover:bg-warning-200 focus:ring-warning-500 dark:bg-warning-200 dark:text-warning-900 dark:hover:bg-warning-100',
    info: 'bg-info-100 text-info-700 hover:bg-info-200 focus:ring-info-500 dark:bg-info-200 dark:text-info-900 dark:hover:bg-info-100',
  },
  soft: {
    primary:
      'bg-primary-50 text-primary-600 hover:bg-primary-100 focus:ring-primary-400 dark:bg-primary-100 dark:text-primary-700 dark:hover:bg-primary-200',
    neutral: `${SURFACE_COLORS.surfaceSubtle} text-neutral-600 ${INTERACTION_COLORS.hover} focus:ring-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-700`,
    success:
      'bg-success-50 text-success-600 hover:bg-success-100 focus:ring-success-500 dark:bg-success-100 dark:text-success-700 dark:hover:bg-success-200',
    error:
      'bg-error-50 text-error-600 hover:bg-error-100 focus:ring-error-500 dark:bg-error-100 dark:text-error-700 dark:hover:bg-error-200',
    warning:
      'bg-warning-50 text-warning-600 hover:bg-warning-100 focus:ring-warning-500 dark:bg-warning-100 dark:text-warning-700 dark:hover:bg-warning-200',
    info: 'bg-info-50 text-info-600 hover:bg-info-100 focus:ring-info-500 dark:bg-info-100 dark:text-info-700 dark:hover:bg-info-200',
  },
  outline: {
    primary:
      'border-2 border-primary-600 text-primary-700 hover:bg-primary-100 focus:ring-primary-500 dark:border-primary-300 dark:text-primary-300 dark:hover:bg-primary-100',
    neutral: `border-2 ${BORDER_COLORS.strong} ${TEXT_COLORS.secondary} ${INTERACTION_COLORS.hover} focus:ring-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50`,
    success:
      'border-2 border-success-600 text-success-700 hover:bg-success-100 focus:ring-success-500 dark:border-success-300 dark:text-success-300 dark:hover:bg-success-100',
    error:
      'border-2 border-error-600 text-error-700 hover:bg-error-100 focus:ring-error-500 dark:border-error-300 dark:text-error-300 dark:hover:bg-error-100',
    warning:
      'border-2 border-warning-600 text-warning-700 hover:bg-warning-100 focus:ring-warning-500 dark:border-warning-300 dark:text-warning-300 dark:hover:bg-warning-100',
    info: 'border-2 border-info-600 text-info-700 hover:bg-info-100 focus:ring-info-500 dark:border-info-300 dark:text-info-300 dark:hover:bg-info-100',
  },
  ghost: {
    primary:
      'text-primary-700 hover:bg-primary-100 focus:ring-primary-500 dark:text-primary-300 dark:hover:bg-primary-100',
    neutral: `${TEXT_COLORS.secondary} ${INTERACTION_COLORS.hover} focus:ring-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50`,
    success:
      'text-success-700 hover:bg-success-100 focus:ring-success-500 dark:text-success-300 dark:hover:bg-success-100',
    error:
      'text-error-700 hover:bg-error-100 focus:ring-error-500 dark:text-error-300 dark:hover:bg-error-100',
    warning:
      'text-warning-700 hover:bg-warning-100 focus:ring-warning-500 dark:text-warning-300 dark:hover:bg-warning-100',
    info: 'text-info-700 hover:bg-info-100 focus:ring-info-500 dark:text-info-300 dark:hover:bg-info-100',
  },
  link: {
    primary:
      'text-primary-700 hover:underline focus:ring-0 dark:text-primary-300 p-0 font-semibold',
    neutral: `${TEXT_COLORS.secondary} hover:underline focus:ring-0 dark:text-neutral-300 p-0 font-semibold`,
    success:
      'text-success-700 hover:underline focus:ring-0 dark:text-success-300 p-0 font-semibold',
    error:
      'text-error-700 hover:underline focus:ring-0 dark:text-error-300 p-0 font-semibold',
    warning:
      'text-warning-700 hover:underline focus:ring-0 dark:text-warning-300 p-0 font-semibold',
    info: 'text-info-700 hover:underline focus:ring-0 dark:text-info-300 p-0 font-semibold',
  },
} as const;

/**
 * Helper function to get consistent card colors
 * @param variant - The card variant
 * @returns Tailwind classes string
 */
export function getCardColors(
  variant: keyof typeof CARD_COLORS = 'default',
): string {
  return CARD_COLORS[variant];
}

/**
 * IconButton color system for consistent icon button styling
 */
export const ICON_BUTTON_COLORS = {
  solid: {
    gray: `bg-neutral-900 text-neutral-50 hover:bg-neutral-800 ${SURFACE_COLORS.surfaceElevated} dark:text-neutral-900 dark:hover:text-neutral-50`,
    red: 'bg-error-600 text-neutral-50 hover:bg-error-700 dark:bg-error-700 dark:hover:bg-error-600',
    green:
      'bg-success-600 text-neutral-50 hover:bg-success-700 dark:bg-success-700 dark:hover:bg-success-600',
    blue: 'bg-primary text-neutral-50 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600',
  },
  outline: {
    gray: `border ${BORDER_COLORS.default} ${TEXT_COLORS.secondary} hover:border-neutral-400 ${INTERACTION_COLORS.hover} hover:text-neutral-900 dark:hover:text-neutral-50`,
    red: 'border border-red-300 text-red-700 hover:border-red-400 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:border-red-600 dark:hover:bg-red-950',
    green:
      'border border-green-300 text-green-700 hover:border-green-400 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:border-green-600 dark:hover:bg-green-950',
    blue: 'border border-blue-300 text-blue-700 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:border-blue-600 dark:hover:bg-blue-950',
  },
  soft: {
    gray: `${SURFACE_COLORS.surface} text-neutral-900 ${INTERACTION_COLORS.hover} hover:text-neutral-900 dark:hover:text-neutral-50`,
    red: 'bg-red-100 text-red-900 hover:bg-red-200 dark:bg-red-950 dark:text-red-100 dark:hover:bg-red-900',
    green:
      'bg-green-100 text-green-900 hover:bg-green-200 dark:bg-green-950 dark:text-green-100 dark:hover:bg-green-900',
    blue: 'bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:hover:bg-blue-900',
  },
  ghost: {
    gray: `${TEXT_COLORS.secondary} ${INTERACTION_COLORS.hover} hover:text-neutral-900 dark:hover:text-neutral-50`,
    red: 'text-red-700 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-950',
    green:
      'text-green-700 hover:bg-green-100 dark:text-green-300 dark:hover:bg-green-950',
    blue: 'text-blue-700 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-blue-950',
  },
} as const;

/**
 * Calendar/DatePicker specific colors for consistent theming
 */
export const CALENDAR_COLORS = {
  /** Primary text color for calendar dates and labels */
  text: 'text-neutral-900 dark:text-neutral-200',

  /** Secondary text color for weekday headers */
  textSecondary: 'text-neutral-600 dark:text-neutral-400',

  /** Muted text color for disabled or outside dates */
  textMuted: 'text-neutral-400 dark:text-neutral-500',

  /** Hover text color for interactive elements */
  textHover: 'hover:text-neutral-700 dark:hover:text-neutral-200',

  /** Background color for date hover states */
  backgroundHover: 'bg-neutral-100 dark:bg-neutral-700',

  /** Background color for selected dates */
  backgroundSelected: 'bg-primary-500 text-white',

  /** Background color for today's date */
  backgroundToday: 'bg-neutral-200 dark:bg-neutral-600',
} as const;

/**
 * Helper function to get consistent button colors
 * @param variant - The button variant
 * @param color - The button color
 * @returns Tailwind classes string
 */
export function getButtonColors(
  variant: keyof typeof BUTTON_COLORS,
  color: keyof typeof BUTTON_COLORS.solid,
): string {
  return BUTTON_COLORS[variant][color];
}

/**
 * Helper function to get consistent icon button colors
 * @param variant - The icon button variant
 * @param color - The icon button color
 * @returns Tailwind classes string
 */
export function getIconButtonColors(
  variant: keyof typeof ICON_BUTTON_COLORS,
  color: keyof typeof ICON_BUTTON_COLORS.solid,
): string {
  return ICON_BUTTON_COLORS[variant][color];
}
