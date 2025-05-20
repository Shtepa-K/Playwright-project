const { test, expect } = require('@playwright/test');

test('example test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveURL('https://playwright.dev/');
});
