import { AxeBuilder } from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

test("home workspace passes axe-core scan", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .exclude("nextjs-portal") // Exclude Next.js dev error overlay
    .analyze();

  expect(results.violations).toEqual([]);
});
