const { test, expect } = require('@playwright/test');

test.beforeEach(async({page})=>{
    await page.goto('/');
})

test('should be able to search by text', async ({ page }) => {
    await page.getByPlaceholder('Search by product name or search by image').click();
    await page.getByPlaceholder('Search by product name or search by image').fill('laptops');
    await page.getByPlaceholder('Search by product name or search by image').press('Enter');
    await expect(page).toHaveURL('/suggested-products-lists');
});