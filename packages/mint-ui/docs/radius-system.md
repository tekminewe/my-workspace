# Radius System

The Mint UI library provides a comprehensive radius system that allows you to control border radius globally and per component.

## Overview

The radius system includes:

- **5 predefined radius values**: `sm`, `md`, `lg`, `xl`, `full`
- **Special values**: `none` for sharp corners
- **Global control** via `RadiusProvider`
- **Component-level override** via `radius` prop
- **Default value**: `md` (8px)

## Radius Scale

| Token  | Value     | Use Case                               |
| ------ | --------- | -------------------------------------- |
| `none` | `0`       | Sharp, geometric designs               |
| `sm`   | `0.25rem` | Small buttons, inputs, subtle rounding |
| `md`   | `0.5rem`  | Default for most components            |
| `lg`   | `0.75rem` | Large cards, prominent elements        |
| `xl`   | `1rem`    | Hero sections, major containers        |
| `full` | `9999px`  | Pills, avatars, fully rounded          |

## Global Configuration

Use `RadiusProvider` to set a global default radius for all components:

```tsx
import { RadiusProvider } from "@tekminewe/mint-ui/utils";

function App() {
  return (
    <RadiusProvider defaultRadius="lg">
      {/* All components will use "lg" radius by default */}
      <YourApp />
    </RadiusProvider>
  );
}
```

## Component-Level Override

Override the global default on individual components:

```tsx
import { Button, Card } from "@tekminewe/mint-ui";

function Example() {
  return (
    <div>
      {/* Uses global default radius */}
      <Button>Default Button</Button>

      {/* Override with specific radius */}
      <Button radius="full">Pill Button</Button>
      <Button radius="none">Square Button</Button>

      {/* Cards also support radius */}
      <Card radius="xl" shadow="md">
        Large radius card
      </Card>
    </div>
  );
}
```

## Supported Components

The following components support the `radius` prop:

- `Button`
- `Card`
- More components will be added in future updates

## TypeScript Support

The radius system is fully typed:

```tsx
import { Radius } from "@tekminewe/mint-ui/utils";

// Radius type: "none" | "sm" | "md" | "lg" | "xl" | "full"
const myRadius: Radius = "lg";

// Component props are typed
<Button radius={myRadius}>Typed Button</Button>;
```

## CSS Variables

The radius system uses CSS variables that can be customized:

```css
:root {
  --radius-sm: 0.25rem; /* 4px */
  --radius-md: 0.5rem; /* 8px - default */
  --radius-lg: 0.75rem; /* 12px */
  --radius-xl: 1rem; /* 16px */
  --radius-full: 9999px; /* fully rounded */
}
```

## Utilities

The radius system provides utility functions:

```tsx
import {
  getRadiusClass,
  getRadiusVariable,
  useEffectiveRadius,
} from "@tekminewe/mint-ui/utils";

// Get CSS class for radius
const className = getRadiusClass("lg"); // "rounded-lg"

// Get CSS variable for radius
const variable = getRadiusVariable("md"); // "var(--radius-md)"

// Hook for component development (respects global context)
function MyComponent({ radius }: { radius?: Radius }) {
  const radiusClass = useEffectiveRadius(radius);
  return <div className={radiusClass}>My Component</div>;
}
```

## Design Principles

### Consistency

All components using the radius system maintain visual consistency across your application.

### Flexibility

- Global control for consistent theming
- Component-level overrides for specific use cases
- CSS variable support for custom values

### Progressive Enhancement

- Works without JavaScript
- Graceful fallbacks
- CSS-first approach

## Best Practices

### 1. Use Global Defaults

Set a global radius that matches your design system:

```tsx
// Conservative, professional look
<RadiusProvider defaultRadius="sm">

// Balanced, modern look (default)
<RadiusProvider defaultRadius="md">

// Friendly, approachable look
<RadiusProvider defaultRadius="lg">
```

### 2. Strategic Overrides

Use component overrides sparingly and with purpose:

```tsx
// Good: Semantic use of radius
<Button radius="full">Subscribe</Button> {/* Call-to-action pill */}
<Card radius="none">Data Table</Card>     {/* Clean, data-focused */}

// Avoid: Random radius values without design rationale
<Button radius="xl">Random</Button>
```

### 3. Hierarchy and Emphasis

Use different radius values to create visual hierarchy:

```tsx
// Hero card with prominent radius
<Card radius="xl" shadow="lg">
  <h1>Main Content</h1>

  {/* Nested cards with subtle radius */}
  <Card radius="sm" shadow="sm">
    <p>Supporting content</p>
  </Card>
</Card>
```

### 4. Context-Appropriate Choices

```tsx
// Data-heavy interfaces: minimal radius
<RadiusProvider defaultRadius="sm">
  <DataDashboard />
</RadiusProvider>

// Consumer apps: friendly radius
<RadiusProvider defaultRadius="lg">
  <ConsumerApp />
</RadiusProvider>

// Gaming/creative apps: mixed approach
<RadiusProvider defaultRadius="md">
  <Button radius="full">Play</Button>
  <Card radius="xl">Feature Card</Card>
</RadiusProvider>
```

## Migration from Legacy

If upgrading from the old numbered radius system:

```tsx
// Old way (still supported)
<Card className="rounded-4" />

// New way (recommended)
<Card radius="lg" />
```

Legacy mapping:

- `rounded-1` → `radius="sm"`
- `rounded-2` → `radius="sm"`
- `rounded-3` → `radius="md"`
- `rounded-4` → `radius="lg"`
- `rounded-5` → `radius="xl"`
- `rounded-6` → `radius="xl"`
