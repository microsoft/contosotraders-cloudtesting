import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe.skip('Carousel', () => {
  test('prev and next buttons change slider', async ({ page }) => {
    await expect(page.getByTestId('carousel').getByText('The Fastest, Most Powerful Xbox Ever.')).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByTestId('carousel').getByText('Xbox Wireless Controller - Mineral Camo Special Edition')).toBeVisible();
    await page.getByRole('button', { name: 'Previous' }).click();
  })

  test('carousel buttons change slider', async ({ page }) => {
    await page.getByRole('button', { name: 'carousel indicator 2' }).click();
    await expect(page.getByTestId('carousel').getByText('Xbox Wireless Controller - Mineral Camo Special Edition')).toBeVisible();
    await page.getByRole('button', { name: 'carousel indicator 1' }).click();
    await expect(page.getByTestId('carousel').getByText('The Fastest, Most Powerful Xbox Ever.')).toBeVisible();

  })
  
  test('buy now button links to product page', async ({ page }) => {
    await page.getByRole('button', { name: 'Buy Now' }).click();
    await expect(page).toHaveURL('/product/1');
  })

  test('more details links to list page', async ({ page }) => {
    await page.getByRole('button', { name: 'More Details' }).click();
    await expect(page).toHaveURL('/list/controllers');
  })
});
