const { test, expect } = require('@playwright/test');
let _productid = 1;
test.beforeEach(async({page})=>{
  await page.goto('/');
})
test.describe('APIs', () => {
    //text serach API
    test('should be able to load search by text data', async ({ request }) => {
      const response = await request.get(`${process.env.REACT_APP_APIUrl}/Products/search/laptops`);
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
    });
  
    //load products list
    test('should be able to load products list', async ({ request }) => {
      const response = await request.get(`${process.env.REACT_APP_APIUrl}/Products/?type=laptops`);
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
    });
  
    //load product details
    test('should be able to load product details', async ({ request }) => {
      const response = await request.get(`${process.env.REACT_APP_APIUrl}/Products/`+_productid);
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
    });
  
    //filter products by brands
    test('should be able to filter products by brands', async ({ request }) => {
      const response = await request.get(`${process.env.REACT_APP_APIUrl}/Products/?type=laptops&brand=1`);
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
    });
  });