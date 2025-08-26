// .storybook/modes.js
export const allModes = {
  light: {
    backgrounds: { value: "#ffffff" },
    theme: "light",
  },
  dark: {
    backgrounds: { value: "#0c0a09" },
    theme: "dark",
  },
  "light mobile": {
    backgrounds: { value: "#ffffff" },
    theme: "light",
    viewport: "mobile1",
  },
  "dark mobile": {
    backgrounds: { value: "#0c0a09" },
    theme: "dark",
    viewport: "mobile1",
  },
  "light desktop": {
    backgrounds: { value: "#ffffff" },
    theme: "light",
    viewport: "responsive",
  },
  "dark desktop": {
    backgrounds: { value: "#0c0a09" },
    theme: "dark",
    viewport: "responsive",
  },
};
