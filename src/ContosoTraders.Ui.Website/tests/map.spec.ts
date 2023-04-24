import { test, expect } from '@playwright/test';

// Emulate geolocation, language and timezone
test.use({
  geolocation: {
    latitude: 41.890221,
    longitude: 12.492348
  },
  locale: 'it-IT',
  permissions: ['geolocation'],
  timezoneId: 'Europe/Rome'
});

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.mouse.wheel(0, 4000); // scroll down to map
});

test.describe('Map', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');
  test('should display bing maps iframe', async ({ page, geolocation }) => {
    await expect.poll(() => page.locator('input#latitude').inputValue()).toEqual(geolocation?.latitude.toString());
    await expect.poll(() => page.locator('input#longitude').inputValue()).toEqual(geolocation?.longitude.toString());
    await expect(page.locator('#current-location')).toBeVisible();
    await expect(async () => {
      const boundingBox = await page.frameLocator('iframe[title="geolocation"]').locator('canvas[aria-label="Interactive Map"]').boundingBox();
      if (!boundingBox || boundingBox?.width < 100 || boundingBox?.height < 100) {
        throw new Error('Map is too small');
      }
    }).toPass();
  });

  test('should zoom in on bing maps iframe', async ({ page }) => {
    await page.frameLocator('iframe[title="geolocation"]').getByRole('button', { name: 'Zoom avanti' }).click();
  });

  test('should zoom out on bing maps iframe', async ({ page }) => {
    await page.frameLocator('iframe[title="geolocation"]').getByRole('button', { name: 'Zoom indietro' }).click();
  });
});
