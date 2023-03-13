import { test, expect } from './baseFixtures';
let _productid = 1;

test.describe('Products API', () => {
  // Text search API
  test('should be able to load search by text data', async ({ request }) => {
    const response = await request.get(`${process.env.REACT_APP_APIURL}/Products/search/laptops`);
    await expect(response.ok()).toBeTruthy();
  });

  // Load products list
  test('should be able to load products list', async ({ request }) => {
    const response = await request.get(`${process.env.REACT_APP_APIURL}/Products/?type=laptops`);
    await expect(response.ok()).toBeTruthy();
  });

  // Load product details
  test('should be able to load product details', async ({ request }) => {
    const response = await request.get(`${process.env.REACT_APP_APIURL}/Products/` + _productid);
    await expect(response.ok()).toBeTruthy();
  });

  // Filter products by brands
  test('should be able to filter products by brands', async ({ request }) => {
    const response = await request.get(`${process.env.REACT_APP_APIURL}/Products/?type=laptops&brand=1`);
    await expect(response.ok()).toBeTruthy();
  });
});