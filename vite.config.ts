/// <reference types="vitest" />
import { defineConfig, configDefaults } from "vitest/config";
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    exclude: [...configDefaults.exclude, '__tests__/e2e/*'],
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
    environment: 'jsdom',
  },
});