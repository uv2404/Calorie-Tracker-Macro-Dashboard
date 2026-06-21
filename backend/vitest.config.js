import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    // The first integration run downloads an in-memory mongod binary, so give
    // hooks/tests generous time. Subsequent runs are fast (binary is cached).
    hookTimeout: 120000,
    testTimeout: 30000,
    // Run test files sequentially in one process so the integration suite can
    // share a single in-memory MongoDB instance (faster, simpler lifecycle).
    fileParallelism: false,
  },
});
