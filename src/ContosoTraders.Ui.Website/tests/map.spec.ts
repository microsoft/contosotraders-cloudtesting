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

test('verify bing map iframe is displayed and can zoom in and out', async ({ page }) => {
  await page.goto('/');
  // validate inputs
  await expect(page.locator('#latitude')).toBeTruthy();
  await expect(page.locator('#longitude')).toBeTruthy();
  await expect(page.locator('#current-location')).toBeTruthy();
  // scroll to bottomo of the page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  // zoom in
  await page.frameLocator('iframe[title="geolocation"]').getByRole('button', { name: 'Zoom avanti' }).click();
  // zoom out
  await page.frameLocator('iframe[title="geolocation"]').getByRole('button', { name: 'Zoom indietro' }).click();
});

