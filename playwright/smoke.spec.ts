import { expect, test } from "@playwright/test";

test("renders navigation shell", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /workspace overview/i, level: 1 })).toBeVisible();
  await expect(page.getByText(/stage 3 schema ready/i)).toBeVisible();

  await page.setViewportSize({ width: 640, height: 900 });
  await page.getByRole("button", { name: /open navigation/i }).click();
  await expect(page.getByRole("dialog", { name: /navigation/i })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: /navigation/i })).toBeHidden();
});
