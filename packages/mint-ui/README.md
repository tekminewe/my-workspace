# Mint UI - Private Component Library

The private UI library with consistent behavior and theming capabilities for React applications within the my-workspace monorepo.

**Note**: This is now a private package and is not published to npm. It's part of the monorepo workspace and used internally by the my-web application.

## Development Usage in Monorepo

Since this is a workspace package, it's automatically linked via pnpm workspaces. No installation needed.

1. Import CSS styles in your application:

```jsx
import "@tekminewe/mint-ui/styles.css";
```

2. Update your `tailwind.config.ts` to include the plugin and path:

```js
import type { Config } from "tailwindcss";
import mintPlugin from "@tekminewe/mint-ui/tailwind-plugin";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../mint-ui/src/**/*.{js,ts,jsx,tsx,mdx}", // Workspace reference
  ],
  theme: {
    extend: {},
  },
  plugins: [mintPlugin()], // Include the plugin
};
export default config;
```

3. Wrap your root Client component with the `ThemeProvider` component.

```jsx
"use client";

import { ThemeProvider } from "@tekminewe/mint-ui/theme";

function App() {
  return (
    <ThemeProvider>
      <YourRootComponent />
    </ThemeProvider>
  );
}
```

5. Import the components you need

```jsx
import { Button } from "@tekminewe/mint-ui/button";
```

## Theme System

Mint UI includes a built-in theme system that supports both light and dark modes:

### Using the Theme Provider

The `ThemeProvider` component automatically detects user system preferences and supports theme persistence:

```jsx
import { ThemeProvider } from "@tekminewe/mint-ui/theme";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <YourRootComponent />
    </ThemeProvider>
  );
}
```

### Accessing and Changing Themes

Use the `useTheme` hook to access the current theme and change it:

```jsx
import { useTheme } from "@tekminewe/mint-ui/theme";

function MyComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </button>
    </div>
  );
}
```

### Theme Toggle Component

Mint UI provides a ready-to-use theme toggle component:

```jsx
import { ThemeToggle } from "@tekminewe/mint-ui/theme";

function Navbar() {
  return (
    <nav>
      <div className="flex items-center gap-2">
        <ThemeToggle aria-label="Toggle theme" />
        <UserProfile />
      </div>
    </nav>
  );
}
```
