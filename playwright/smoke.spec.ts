import { expect, test } from "@playwright/test";

test("renders Stage 1 layout shell", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /workspace overview/i, level: 1 })).toBeVisible();
});
