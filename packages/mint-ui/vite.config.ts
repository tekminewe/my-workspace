import { defineConfig } from 'vite';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
import packageJson from './package.dist.json';
import { readdirSync } from 'fs';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// Generate package.json for each sub folder in src/components when building the library.
const subFolderJsonConfigs = readdirSync('./src/components/')
  .filter((path) => !path.includes('.'))
  .map((path) => {
    return {
      outputFolder: `./dist/${path}`,
      baseContents: {
        name: `${packageJson.name}/${path}`,
        main: packageJson.main,
        module: packageJson.module,
        types: packageJson.types,
        sideEffects: packageJson.sideEffects,
        exports: packageJson.exports,
      },
    };
  });

const entryFiles = readdirSync('./src/components/').reduce(
  (files, componentName) => {
    if (componentName.includes('.')) {
      return files;
    }

    return {
      ...files,
      [componentName]: path.resolve(
        __dirname,
        `./src/components/${componentName}/index.ts`,
      ),
    };
  },
  {
    // Add main index file
    index: path.resolve(__dirname, './src/index.ts'),
  } as Record<string, string>,
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      beforeWriteFile: (filePath: string) => {
        return { filePath: filePath.replace('/components', '') };
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, './src/globals.css'),
          dest: path.resolve(__dirname, './dist'),
          rename: () => 'styles.css',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
    },
  },
  optimizeDeps: {
    include: ['highlight.js'],
  },
  build: {
    emptyOutDir: true,
    copyPublicDir: false,
    lib: {
      entry: {
        ...entryFiles,
      },
      formats: ['es', 'cjs'],
      fileName(format, entryName) {
        if (entryName === 'plugin' || entryName === 'index') {
          return `${entryName}.${format === 'es' ? 'js' : 'cjs'}`;
        }
        return `${entryName}/index.${format === 'es' ? 'js' : 'cjs'}`;
      },
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
      plugins: [[...subFolderJsonConfigs].map(generatePackageJson)],
    },
  },
});
