// Storybook mode configuration interface
interface StorybookMode {
  backgrounds: { value: string };
  theme: 'light' | 'dark';
  viewport?: string;
}

// Storybook modes configuration
export const allModes: Record<string, StorybookMode> = {
  light: {
    backgrounds: { value: '#ffffff' },
    theme: 'light',
  },
  dark: {
    backgrounds: { value: '#0c0a09' },
    theme: 'dark',
  },
  'light desktop': {
    backgrounds: { value: '#ffffff' },
    theme: 'light',
    viewport: 'desktop',
  },
  'dark desktop': {
    backgrounds: { value: '#0c0a09' },
    theme: 'dark',
    viewport: 'desktop',
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
