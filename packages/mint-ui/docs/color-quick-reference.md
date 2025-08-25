# Mint-UI Color Quick Reference

## 🎯 Component Colors - Quick Copy/Paste

### Cards & Surfaces

```typescript
// Standard card
getCardColors('default');
// Result: bg-neutral-50 dark:bg-neutral-100 text-neutral-900 dark:text-neutral-900 border-neutral-200 dark:border-neutral-300

// Elevated card (dropdowns, modals)
getCardColors('elevated');
// Result: bg-white dark:bg-neutral-200 text-neutral-900 dark:text-neutral-900 border-neutral-200 dark:border-neutral-300

// Subtle card
getCardColors('subtle');
// Result: bg-neutral-25 dark:bg-neutral-50 text-neutral-700 dark:text-neutral-700 border-neutral-100 dark:text-neutral-200
```

### Individual Elements

```typescript
// Backgrounds
SURFACE_COLORS.surface; // bg-neutral-50 dark:bg-neutral-100
SURFACE_COLORS.surfaceElevated; // bg-white dark:bg-neutral-200
SURFACE_COLORS.surfaceSubtle; // bg-neutral-25 dark:bg-neutral-50

// Text
TEXT_COLORS.primary; // text-neutral-900 dark:text-neutral-900
TEXT_COLORS.secondary; // text-neutral-700 dark:text-neutral-700
TEXT_COLORS.muted; // text-neutral-500 dark:text-neutral-500
TEXT_COLORS.disabled; // text-neutral-400 dark:text-neutral-400

// Borders
BORDER_COLORS.default; // border-neutral-200 dark:border-neutral-300
BORDER_COLORS.strong; // border-neutral-300 dark:border-neutral-400
BORDER_COLORS.subtle; // border-neutral-100 dark:border-neutral-200
```

## 🚨 Common Mistakes to Avoid

❌ **DON'T** manually write colors:

```typescript
className = 'bg-white dark:bg-neutral-900 text-black dark:text-white';
```

✅ **DO** use standardized utilities:

```typescript
className={cn(getCardColors('default'), 'border')}
```

❌ **DON'T** assume color numbers work the same in both modes:

```typescript
className = 'bg-neutral-800'; // This becomes LIGHT gray in dark mode!
```

✅ **DO** understand the inversion and use documented combinations:

```typescript
className={SURFACE_COLORS.surface} // Properly handles both modes
```

## 📖 Import Statement

```typescript
import {
  getCardColors,
  SURFACE_COLORS,
  TEXT_COLORS,
  BORDER_COLORS,
} from '../utils/component-colors';
```

## 🎨 Available Color Palettes

Mint-UI provides these color palettes for components:

```typescript
// PRIMARY COLORS (Blue-based brand color)
className = 'bg-primary-500'; // Primary brand color
className = 'text-primary-600'; // Primary text color
className = 'border-primary-300'; // Primary borders
className = 'hover:bg-primary-50'; // Subtle hover states
className = 'hover:bg-primary-600'; // Strong hover states

// STATUS COLORS
className = 'bg-success-500'; // Success states
className = 'bg-error-500'; // Error states
className = 'bg-warning-500'; // Warning states
className = 'bg-info-500'; // Info states
```

### Complete Color Scales

```css
/* PRIMARY (Blue-based brand colors) */
primary-50     /* Lightest - subtle backgrounds, hover states */
primary-100    /* Very light - backgrounds, subtle UI */
primary-200    /* Light - hover states, selected items */
primary-300    /* Medium light - focus rings, borders */
primary-400    /* Medium - secondary buttons, icons */
primary-500    /* Base - primary buttons, key UI elements */
primary-600    /* Medium dark - hover states, active elements */
primary-700    /* Dark - text, active states */
primary-800    /* Very dark - text on light backgrounds */
primary-900    /* Darkest - highest contrast text */

/* NEUTRAL (Gray scale for UI framework) */
neutral-50     /* Cards & surfaces - main backgrounds */
neutral-100    /* Elevated surfaces - subtle backgrounds */
neutral-200    /* Default borders - standard borders, dividers */
neutral-300    /* Strong borders - emphasized borders */
neutral-400    /* Disabled text - placeholders, very low contrast */
neutral-500    /* Muted text - secondary text, icons */
neutral-600    /* Medium text - primary text, headings */
neutral-700    /* Secondary text - important secondary text */
neutral-800    /* High contrast - very important text */
neutral-900    /* Primary text - main text color, highest contrast */

/* STATUS COLORS */
success-*      /* Green - success states, confirmations */
error-*        /* Red - errors, destructive actions */
warning-*      /* Yellow - warnings, caution */
info-*         /* Cyan - information, help */
```

### Override Primary Colors in Your Application

You can customize the primary color palette by overriding CSS custom properties:

```css
/* In your globals.css */
:root {
  --color-primary-500: 245 158 11; /* Your brand color (orange) */
  --color-primary-600: 217 119 6; /* Hover state */
  /* ... complete scale 50-900 */
}

.dark {
  --color-primary-500: 251 146 60; /* Brighter for dark mode */
  /* ... complete dark mode overrides */
}
```
