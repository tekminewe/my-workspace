import type { Preview } from '@storybook/react-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import { useEffect } from 'react';
import { ThemeProvider } from '../src/components/theme';
import { allModes } from './modes';
import '../src/globals.css';
import './storybook.css';

// Custom decorator to sync background with theme
const withThemeBackground = (Story: any, context: any) => {
  const theme = context.globals.theme || context.parameters.theme || 'light';

  useEffect(() => {
    // Set the background based on the current theme
    const backgroundColor = theme === 'dark' ? '#0c0a09' : '#ffffff';

    // Update the root body background
    document.body.style.backgroundColor = backgroundColor;

    // Also update the html element for full coverage
    document.documentElement.style.backgroundColor = backgroundColor;

    // Ensure the dark class is applied/removed for proper theme switching
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // Disable default backgrounds since we handle it globally
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0c0a09' },
      ],
    },
    chromatic: {
      // Apply light desktop and dark desktop modes to all stories by default
      modes: {
        'light desktop': allModes['light desktop'],
        'dark desktop': allModes['dark desktop'],
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    withThemeBackground,
  ],
};

export default preview;
