import { expect, test } from "@playwright/test";

test("renders Next.js starter content", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /mbira authoring tool/i })).toBeVisible();
});
