const { test, expect } = require('@playwright/test');
let page = null;

// Hook to run one time before all following tests
test.beforeAll(async ({ browser })=>{
  page = await browser.newPage()
})

//Hook to run before each test
test.beforeEach(async({page})=>{
  await page.goto('/');
})

test.describe('Header', () => {
  test('Hover over header menus', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'All Products' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Laptops' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Controllers' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Mobiles' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Monitors' }).hover();
  });

  test('should be able to select header menu', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'All Products' }).click();
    await expect(page).toHaveURL('/list/all-products');
  });

});