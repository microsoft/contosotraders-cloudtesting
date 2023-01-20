import { test, expect } from '@playwright/test';
let _productid = 1;
test.beforeEach(async({page})=>{
  await page.goto('/');
})
//Test all the APIs in the application
test.describe('APIs', () => {
    //text serach API
    test('should be able to load search by text data', async ({ request }) => {
      const response = await request.get(`${process.env.REACT_APP_APIURL}/Products/search/laptops`);
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
    });
  
    //load products list
    test('should be able to load products list', async ({ request }) => {
      const response = await request.get(`${process.env.REACT_APP_APIURL}/Products/?type=laptops`);
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
    });
  
    //load product details
    test('should be able to load product details', async ({ request }) => {
      const response = await request.get(`${process.env.REACT_APP_APIURL}/Products/`+_productid);
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
    });
  
    //filter products by brands
    test('should be able to filter products by brands', async ({ request }) => {
      const response = await request.get(`${process.env.REACT_APP_APIURL}/Products/?type=laptops&brand=1`);
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
    });

});