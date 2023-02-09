import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// Uncomment to add dark mode tests
/* test.describe('Dark Mode', () => {
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
}); */

// Geolocation Testing
test('test with geolocation', async ({ page, context, request }) => {
  const latitude = await page.locator('input#latitude').inputValue();//location.latitude
  const longitude = await page.locator('input#longitude').inputValue();//location.longitude
  const point = latitude + ',' + longitude;
  const response = await request.get(`${process.env.REACT_APP_GEOAPIBASEURL}/Locations/${point}?key=${process.env.REACT_APP_BINGMAPSKEY}`);
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  if (latitude != null && longitude != null) {
    await context.setGeolocation({ longitude: parseFloat(longitude), latitude: parseFloat(latitude) });
  }
  await Promise.all([
    page.waitForSelector('#current-location'),
  ]);
});

// Iframe Testing
test.skip('test with Iframes', async ({ page }) => {
  await page.mouse.wheel(0, 15000);
  await Promise.all([
    page.waitForSelector('#current-location'),
  ]);
  expect(await page.frameLocator("iframe").locator('#embedMap').count()).toBe(1);
});

