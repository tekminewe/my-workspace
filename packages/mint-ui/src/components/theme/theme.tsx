'use client';

import { useEffect, useState } from 'react';
import { type Theme, ThemeContext } from './theme-context';

export type { Theme } from './theme-context';

export interface ThemeProviderProps {
  defaultTheme?: Theme;
  children: React.ReactNode;
}

export const ThemeProvider = ({
  defaultTheme = 'light',
  children,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // Initialize theme on mount
  useEffect(() => {
    // Check localStorage first
    const storedTheme = localStorage.getItem('mint-ui-theme');
    if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
      setTheme(storedTheme as Theme);
    } else {
      // Check user preference
      const userPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      const initialTheme = userPrefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      localStorage.setItem('mint-ui-theme', initialTheme);
    }
  }, []);

  // Update theme class on body and store in localStorage when theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('mint-ui-theme', theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    },
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
