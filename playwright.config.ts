import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 90000,
  workers: 2,
  use: { baseURL: "http://localhost:3000", headless: true },
  webServer: {
    command: "npm run start -- --listen 3000",
    url: "http://localhost:3000",
    reuseExistingServer: true,
  },
  reporter: "list",
});
