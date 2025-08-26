import type { Config } from 'tailwindcss';
import mintPlugin from '@tekminewe/mint-ui/tailwind-plugin';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../mint-ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [mintPlugin()],
};
export default config;
