/// <reference types="vitest" />
import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, '__tests__/e2e/*'],
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
  },
});