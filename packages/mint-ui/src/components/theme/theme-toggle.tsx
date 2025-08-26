"use client";

import { IconButton } from "../icon-button";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "./use-theme";

export interface ThemeToggleProps {
  /**
   * Class name for the toggle button
   * @default undefined
   * @example "mr-2"
   */
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <IconButton
      className={className}
      onClick={toggleTheme}
      aria-label={
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      }
    >
      {theme === "light" ? <FiMoon /> : <FiSun />}
    </IconButton>
  );
};
