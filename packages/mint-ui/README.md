# Mint UI (Under development)

The UI library with consistent behavior and theming capabilities for React applications.

It has successfully powered the following websites:

- tekminewe.com
- onsentalent.com

# Usage

1. Install the package

```bash
$ pnpm add @tekminewe/mint-ui
```

2. Import the CSS styles at the root of your application

```jsx
import "@tekminewe/mint-ui/styles.css";
```

3. Update your `tailwind.config.ts` to include the plugin and path:

```js
import type { Config } from "tailwindcss";
import mintPlugin from "@tekminewe/mint-ui/tailwind-plugin";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tekminewe/mint-ui/**/*.js", // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [mintPlugin()], // Include the plugin
};
export default config;
```

4. Wrap your root Client component with the `ThemeProvider` component.

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
