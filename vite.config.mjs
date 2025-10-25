import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

export default defineConfig({
  plugins: [
    react(),
    monacoEditorPlugin.default({
      languageWorkers: ['editorWorkerService', 'json'],
      customWorkers: [
        {
          label: 'graphql',
          entry: 'monaco-graphql/esm/graphql.worker'
        }
      ],
      publicPath: 'javascripts/graphiql/rails/'
    }),
  ],
  build: {
    minify: false,
    sourcemap: true,
    rollupOptions: {
      input: "src/index.jsx",
      output: {
        inlineDynamicImports: true,
        entryFileNames: 'javascripts/graphiql/rails/[name].js',
        assetFileNames: 'stylesheets/graphiql/rails/[name].[ext]'
      }
    },
    outDir: 'app/assets',
    emptyOutDir: true
  },
  publicDir: false,
});
