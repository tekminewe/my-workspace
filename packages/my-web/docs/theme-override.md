# 🎨 My-Web Theme Override

## Overview

This project overrides mint-ui's primary color palette to use an orange-based theme optimized for affiliate marketing conversions.

## Implementation

### CSS Variables Override

The theme is implemented in `src/app/[lang]/globals.css` by overriding mint-ui's CSS custom properties:

```css
:root {
  /* Override mint-ui primary colors with affiliate-optimized orange */
  --color-primary-500: 245 158 11; /* #f59e0b - Main affiliate orange */
  --color-primary-600: 217 119 6; /* #d97706 - Hover states */
  /* ... complete palette 50-900 */
}

.dark {
  /* Dark mode color overrides */
  --color-primary-500: 251 146 60; /* Brighter for dark backgrounds */
  /* ... inverted palette */
}
```

### Usage in Components

All components use the primary color system:

```tsx
// CTAs and buttons automatically use overridden colors
<Button>Join Now</Button>

// Manual usage for custom elements
<div className="bg-primary-500 text-white">Affiliate Deal</div>
<span className="text-primary-600">12% Cashback</span>
```

## Why Orange?

Orange is optimal for affiliate marketing because it:

- Creates urgency without being aggressive
- Encourages immediate action
- Stands out on most backgrounds
- Performs best in A/B tests for CTAs

## Benefits

- **Easy to change**: Modify colors in one CSS file
- **Consistent theming**: All mint-ui components automatically use new colors
- **Dark mode support**: Automatically handles theme switching
- **Performance**: CSS-only solution with no runtime overhead
