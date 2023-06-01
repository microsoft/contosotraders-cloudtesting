import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe.skip('Dark Mode', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');
  test('should be able to toggle dark mode', async ({ page }) => {
    await page.getByLabel('Dark Mode').check();
    await expect(page.locator('.App')).toHaveAttribute('class', 'App dark')
    await expect(page.locator('.App')).toHaveCSS('background-color', 'rgb(34, 34, 34)')
    await page.getByLabel('Dark Mode').uncheck();
    await expect(page.locator('.App')).toHaveAttribute('class', 'App light')
    await expect(page.locator('.App')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  })
  test('verify dark mode is pixel perfect - on', async ({ page }) => {
    await page.getByLabel('Dark Mode').check();
    await expect(page.getByRole('banner').filter({ hasText: '0Dark Mode' })).toHaveScreenshot();
  })
  test('verify dark mode is pixel perfect - off', async ({ page }) => {
    await expect(page.getByRole('banner').filter({ hasText: '0Dark Mode' })).toHaveScreenshot();
  })
});
