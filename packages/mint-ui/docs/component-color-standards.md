# Component Color Standards

This document outlines the standardized color system for mint-ui components to ensure consistency and prevent common theming issues.

## The Problem We Solved

Previously, components were using inconsistent color combinations that led to issues like:

- Cards being too white/bright in dark mode
- Inconsistent text contrast across components
- Manual color selection causing visual inconsistencies
- Difficulty maintaining accessibility standards

## The Solution: Standardized Color Utilities

We've created a centralized color system in `src/components/utils/component-colors.ts` that provides:

### 1. Surface Colors (Backgrounds)

```typescript
SURFACE_COLORS = {
  surface: 'bg-neutral-50 dark:bg-neutral-100', // Main surfaces (cards, panels)
  surfaceElevated: 'bg-white dark:bg-neutral-200', // Elevated surfaces (dropdowns, popovers)
  surfaceSubtle: 'bg-neutral-25 dark:bg-neutral-50', // Subtle surfaces (section backgrounds)
};
```

### 2. Text Colors

```typescript
TEXT_COLORS = {
  primary: 'text-neutral-900 dark:text-neutral-900', // High contrast text
  secondary: 'text-neutral-700 dark:text-neutral-700', // Medium contrast text
  muted: 'text-neutral-500 dark:text-neutral-500', // Less important content
  disabled: 'text-neutral-400 dark:text-neutral-400', // Disabled text
};
```

### 3. Border Colors

```typescript
BORDER_COLORS = {
  default: 'border-neutral-200 dark:border-neutral-300', // Standard borders
  subtle: 'border-neutral-100 dark:text-neutral-200', // Subtle divisions
  strong: 'border-neutral-300 dark:border-neutral-400', // Emphasized borders
};
```

### 4. Complete Card Combinations

```typescript
CARD_COLORS = {
  default:
    'bg-neutral-50 dark:bg-neutral-100 text-neutral-900 dark:text-neutral-900 border-neutral-200 dark:border-neutral-300',
  elevated:
    'bg-white dark:bg-neutral-200 text-neutral-900 dark:text-neutral-900 border-neutral-200 dark:border-neutral-300',
  subtle:
    'bg-neutral-25 dark:bg-neutral-50 text-neutral-700 dark:text-neutral-700 border-neutral-100 dark:text-neutral-200',
};
```

## How to Use

### For New Components

```typescript
import { getCardColors, SURFACE_COLORS, TEXT_COLORS } from '../utils/component-colors';

// Use complete card styling
className={cn('p-4', getCardColors('default'), ...)}

// Or mix and match individual elements
className={cn(SURFACE_COLORS.surface, TEXT_COLORS.primary, 'border', BORDER_COLORS.default)}
```

### For Existing Components

Replace manual color combinations with standardized utilities:

**Before:**

```typescript
className =
  'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700';
```

**After:**

```typescript
className={cn(getCardColors('default'), 'border')}
```

## Color Scale Understanding

The neutral color scale works differently in light vs dark mode:

**Light Mode:**

- `neutral-50`: Very light gray (250, 250, 250) - card backgrounds
- `neutral-200`: Light gray (229, 229, 229) - borders
- `neutral-900`: Nearly black (23, 23, 23) - text

**Dark Mode (inverted):**

- `neutral-50`: Nearly black (23, 23, 23) - page backgrounds
- `neutral-100`: Dark gray (38, 38, 38) - card backgrounds
- `neutral-200`: Medium dark (64, 64, 64) - borders
- `neutral-900`: Nearly white (250, 250, 250) - text

## Benefits

1. **Consistency**: All components use the same color relationships
2. **Accessibility**: Pre-tested color combinations ensure proper contrast
3. **Maintainability**: Single source of truth for component colors
4. **Dark Mode**: Properly inverted colors that work in both themes
5. **Scalability**: Easy to update colors across all components

## Implementation Example: Card Component

```typescript
// Before - manual colors that caused issues
className={cn(
  'p-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700',
  // ... other classes
)}

// After - standardized colors
className={cn(
  'p-4',
  getCardColors('default'),
  'border',
  // ... other classes
)}
```

## Future Component Development

All new components should:

1. Import color utilities from `component-colors.ts`
2. Use `getCardColors()` for card-like components
3. Use individual `SURFACE_COLORS`, `TEXT_COLORS`, `BORDER_COLORS` for custom combinations
4. Never hardcode color combinations in component files
5. Test in both light and dark modes during development

This standardization prevents the "too white" and contrast issues we previously experienced and ensures a consistent, accessible design system.
