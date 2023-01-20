import test, { expect } from './fixtures/baseFixture';

test.describe('Header - HomePage loaded via fixture', () => {
  test('Hover over header menus', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'All Products' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Laptops' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Controllers' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Mobiles' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Monitors' }).hover();
    });
  });

test.describe('Footer - Homepage loaded via fixture', () => {
    test('should be able to select footer menu - fixtures', async ({ page }) => {
    await page.getByRole('listitem').filter({ hasText: 'Monitors' }).getByRole('link', { name: 'Monitors' }).click();
    await expect(page).toHaveURL('/list/monitors');
  });
});