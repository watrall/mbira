import { expect, test } from "@playwright/test";

test("renders navigation shell", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /stage 9 search pipeline/i, level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByText(/ILIKE-powered project search, query-key scaffolding, and React Query/i),
  ).toBeVisible();

  await page.setViewportSize({ width: 640, height: 900 });
  await page.getByRole("button", { name: /open navigation/i }).click();
  await expect(page.getByRole("button", { name: /close navigation/i })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: /close navigation/i })).toBeHidden();
});
