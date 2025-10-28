import { defineConfig, devices } from "@playwright/test";

const ensureEnv = (key: string, fallback: string) => {
  if (!process.env[key]) {
    process.env[key] = fallback;
  }
};

ensureEnv("NEXT_PUBLIC_SUPABASE_URL", "http://127.0.0.1:54321");
ensureEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");
ensureEnv("SUPABASE_SERVICE_ROLE_KEY", "test-service-role-key");

const PORT = process.env.PORT ?? "3000";
const HOST = process.env.HOST ?? "127.0.0.1";

export default defineConfig({
  testDir: "./playwright",
  timeout: 30 * 1000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  forbidOnly: !!process.env.CI,
  reporter: [["list"], ["html", { outputFolder: "playwright-report" }]],
  use: {
    baseURL: `http://${HOST}:${PORT}`,
    trace: "on-first-retry",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  expect: {
    timeout: 5000,
  },
  webServer: {
    command: `npm run dev -- --hostname ${HOST} --port ${PORT}`,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
