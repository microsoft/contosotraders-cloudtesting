import { test, expect } from '@playwright/test';
const imgPath = require('path').resolve(__dirname, '..')+'/src/assets/images/original/Contoso_Assets/Grid_Products_Collection/product_image.png';

test.beforeEach(async({page})=>{
  await page.goto('/');
})

test.describe('FileUpload', () => {
    test("Upload a file", async ({ page }) => {      
        await page.goto("/");
        await page.getByRole('button', { name: 'iconimage' }).click();
        await page.locator('input[type="file"]').setInputFiles(imgPath);
        await expect(page).toHaveURL('/suggested-products-list');
    });
});