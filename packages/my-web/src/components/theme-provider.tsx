'use client';

import { ThemeProvider as MintThemeProvider } from '@tekminewe/mint-ui/theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <MintThemeProvider>{children}</MintThemeProvider>;
};
