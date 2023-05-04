import { test, expect } from '@playwright/test';

let _productid = 1;

test.skip(() => !process.env.REACT_APP_APIURL, 'requires REACT_APP_APIURL');

test.use({
  baseURL: process.env.REACT_APP_APIURL + '/',
});

test.describe('Products API', () => {
  // Text search API
  test('should be able to load search by text data', async ({ request }) => {
    const response = await request.get('./Products/search/laptops');
    await expect(response).toBeOK();
  });

  // Load products list
  test('should be able to load products list', async ({ request }) => {
    const response = await request.get('./Products/?type=laptops');
    await expect(response).toBeOK();
  });

  // Load product details
  test('should be able to load product details', async ({ request }) => {
    const response = await request.get('./Products/' + _productid);
    await expect(response).toBeOK();
  });

  // Filter products by brands
  test('should be able to filter products by brands', async ({ request }) => {
    const response = await request.get('./Products/?type=laptops&brand=1');
    await expect(response).toBeOK();
  });
});
