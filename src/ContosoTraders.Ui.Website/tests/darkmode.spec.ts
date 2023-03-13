import { test, expect } from './baseFixtures';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe.skip('Dark Mode', () => {
  test('should be able to toggle dark mode', async ({ page }) => {
    await page.getByLabel('Dark Mode').check();
    await expect(page.locator('.App')).toHaveAttribute('class', 'App dark')
    await page.getByLabel('Dark Mode').uncheck();
    await expect(page.locator('.App')).toHaveAttribute('class', 'App light')
  })
  test('verify dark mode is pixel perfect - on', async ({ page }) => {
    await page.getByLabel('Dark Mode').check();
    await expect(page).toHaveScreenshot();

  })
  test('verify dark mode is pixel perfect - off', async ({ page }) => {
    await expect(page).toHaveScreenshot();
  })
});
