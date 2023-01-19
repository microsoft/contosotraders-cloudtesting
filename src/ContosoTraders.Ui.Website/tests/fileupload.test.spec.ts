import { test, expect } from '@playwright/test';

test.beforeEach(async({page})=>{
  await page.goto('/');
})

test.describe('FileUpload', () => {
    test("Upload a file", async ({ page }) => {      
        await page.goto("/");
        await page.getByRole('button', { name: 'iconimage' }).click();
        await page.locator('input[type="file"]').setInputFiles(__dirname+'/product_image.png')
        await expect(page).toHaveURL('/suggested-products-list');
    });
});