import type { Config } from 'tailwindcss';
import mintPlugin from '@tekminewe/mint-ui/tailwind-plugin';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tekminewe/mint-ui/**/*.js',
  ],
  plugins: [mintPlugin()],
};
export default config;
