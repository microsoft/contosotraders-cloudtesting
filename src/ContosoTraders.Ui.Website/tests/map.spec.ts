import { test, expect } from './baseFixtures';

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
  test('should display bing maps iframe', async ({ page }) => {
    await expect(page.locator('#latitude')).toBeTruthy();
    await expect(page.locator('#longitude')).toBeTruthy();
    await expect(page.locator('#current-location')).toBeTruthy();
    await expect(page.frameLocator('iframe[title="geolocation"]').locator('div[aria-label="Mappa"]')).toBeTruthy();
  });
  test('should zoom in on bing maps iframe', async ({ page }) => {
    await page.frameLocator('iframe[title="geolocation"]').getByRole('button', { name: 'Zoom avanti' }).click();
  });
  test('should zoom out on bing maps iframe', async ({ page }) => {
    await page.frameLocator('iframe[title="geolocation"]').getByRole('button', { name: 'Zoom indietro' }).click();
  });
});
