import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The test is for telling vitest how to run the tests
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    globals: true,
  },
})
