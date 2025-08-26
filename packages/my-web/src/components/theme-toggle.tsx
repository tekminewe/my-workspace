'use client';

import { ThemeToggle as MintThemeToggle } from '@tekminewe/mint-ui/theme';

export interface ThemeToggleProps {
  /**
   * Class name for the toggle button
   * @default undefined
   * @example "mr-2"
   */
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  return <MintThemeToggle className={className} />;
};
