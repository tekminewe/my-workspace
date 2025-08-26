// Storybook modes configuration
export const allModes = {
  light: {
    backgrounds: { value: '#ffffff' },
    theme: 'light',
  },
  dark: {
    backgrounds: { value: '#0c0a09' },
    theme: 'dark',
  },
  'light mobile': {
    backgrounds: { value: '#ffffff' },
    theme: 'light',
    viewport: 'mobile1',
  },
  'dark mobile': {
    backgrounds: { value: '#0c0a09' },
    theme: 'dark',
    viewport: 'mobile1',
  },
  'light tablet': {
    backgrounds: { value: '#ffffff' },
    theme: 'light',
    viewport: 'tablet',
  },
  'dark tablet': {
    backgrounds: { value: '#0c0a09' },
    theme: 'dark',
    viewport: 'tablet',
  },
};
