import { test, expect } from '@playwright/test';

test.describe('Mocks', () => {
    // Mock home page
    test('should be able to load mock home page', async ({ page }) => {
        await page.route('/', async route => {
            await route.fulfill({ status: 200, body: "<html>Test Content</html>" });
        });

        // Load home page
        await page.goto('/');
        
        // Assert content of mock page
        await expect(page.locator('html').first()).toContainText("Test Content");
    });

    // Mock API - load product details
    test('should be able to load product details', async ({ page }) => {
      await page.route('/Products/1', async route => {
          const jsonResponse = 
          {
            "id": 1,
            "name": "Test Product 01",
            "price": 10
          };
          await route.fulfill({ status: 200, json: jsonResponse });
      });

      await page.goto('/Products/1');
      await expect(async () => {
        const data = await page.locator('pre').first().allInnerTexts();
        const product = JSON.parse(data[0]);
        expect(product.name).toBe("Test Product 01");
      }).toPass();
    });
});