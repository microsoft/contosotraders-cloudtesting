import { test, expect } from '@playwright/test';

test.describe('Mocks', () => {
    // Mock home page
    test('should be able to load mock home page', async ({ page }) => {
        await page.route(`${process.env.REACT_APP_BASEURLFORPLAYWRIGHTTESTING}`, async route => {
            await route.fulfill({ status: 200, body: "<html>Test Content</html>" });
        });

        // Load home page
        await page.goto(`${process.env.REACT_APP_BASEURLFORPLAYWRIGHTTESTING}`);
        
        // Assert content of mock page
        await expect(await page.locator('html').first().innerText()).toContain("Test Content");
    });


    // Mock API - load product details
    test('should be able to load product details', async ({ page }) => {
      await page.route(`${process.env.REACT_APP_APIURL}/Products/1`, async route => {
          const jsonResponse = 
          {
            "id": 1,
            "name": "Test Product 01",
            "price": 10
          };
          await route.fulfill({ status: 200, json: jsonResponse });
      });

      await page.goto(`${process.env.REACT_APP_APIURL}/Products/1`);

      let data = await page.locator('pre').first().allInnerTexts();
      let product = JSON.parse(data[0]);
      expect(product.name).toBe("Test Product 01");
    });
});