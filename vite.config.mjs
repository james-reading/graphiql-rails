import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import $monacoEditorPlugin from 'vite-plugin-monaco-editor';

const monacoEditorPlugin = $monacoEditorPlugin.default ?? $monacoEditorPlugin;

export default defineConfig({
  base: '/graphiql-rails/',
  plugins: [
    react(),
    monacoEditorPlugin({
      languageWorkers: ['editorWorkerService', 'json'],
      customWorkers: [
        {
          label: 'graphql',
          entry: 'monaco-graphql/esm/graphql.worker',
        },
      ],
      // https://github.com/vdesjs/vite-plugin-monaco-editor/issues/44
      customDistPath(root, buildOutDir) {
        return path.join(root, buildOutDir, 'monacoeditorwork');
      }
    }),
  ],
  build: {
    outDir: 'public/graphiql-rails',
    emptyOutDir: true,
  },
});
