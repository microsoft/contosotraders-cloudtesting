// @ts-check
const { test, expect } = require('@playwright/test');
let _productid = 1;

test.beforeEach(async({page})=>{
  await page.goto('/');
})

test('Login', async ({ page }) => {
  await page.goto('/');
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'login' }).click()
  ]);
  await page1.locator('[name=loginfmt]').click();
  await page1.locator('[name=loginfmt]').fill('TailwindTraders.User@spektrasystems.com');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.locator('[name=passwd]').click();
  await page1.locator('[name=passwd]').fill('wQf4yMFy6BcT3JQ@ywUE');
  await page1.getByRole('button', { name: 'Sign in' }).click();
  await page1.getByRole('button', { name: 'Approve a request on my Microsoft Authenticator app' }).click();
  await Promise.all([
    // Waits for the next response matching some conditions
    page.waitForResponse(response => response.url() === `${process.env.REACT_APP_APIUrl}/products/landing` && response.status() === 200),
  ]);
});
test.describe('Header', () => {
  test('should be able to search by text', async ({ page }) => {
    await page.getByPlaceholder('Search by product name or search by image').click();
    await page.getByPlaceholder('Search by product name or search by image').fill('laptops');
    await page.getByPlaceholder('Search by product name or search by image').press('Enter');
    await expect(page).toHaveURL('/suggested-products-list');
  });

  test('should be able to select category', async ({ page }) => {
    await page.getByRole('button', { name: 'All Categories' }).click();
    await page.getByRole('menuitem', { name: 'Laptops' }).click();
    await expect(page).toHaveURL('/list/laptops');
  });

  test('should be able to select header menu', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'All Products' }).click();
    await expect(page).toHaveURL('/list/all-products');
  });

});

test.describe('Home page', () => {
  //Corousel
  test('should be able to select buy now in corosel', async ({ page }) => {
    await page.getByRole('button', { name: 'Buy Now' }).click();
    await expect(page).toHaveURL('/product/detail/'+_productid);
  });
  test('should be able to select more details in corosel', async ({ page }) => {
    await page.getByRole('button', { name: 'More Details' }).click();
    await expect(page).toHaveURL('/list/controllers');
  });

  //Banner
  test('should be able to click start shopping', async ({ page }) => {
    await page.locator('section').getByRole('button', { name: 'Start Shopping' }).click();
    await expect(page).toHaveURL('/list/controllers');
  });
  test('should be able to explore other products', async ({ page }) => {
    await page.getByRole('button', { name: 'Explore Other Products' }).click();
    await expect(page).toHaveURL('/list/laptops');
  });
  test('should be able to start shopping in footer', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Shopping' }).nth(1).click();
    await expect(page).toHaveURL('/list/controllers');
  });
});
test.describe('Product Listing', () => {
  test('should be able to select product to view details', async ({ page }) => {
    await page.goto('/list/all-products');
    await page.locator('.MuiGrid-root > .MuiPaper-root').first().click();
    await expect(page).toHaveURL('/product/detail/'+_productid);
  });
  test('should be able to filter product by brands', async ({ page }) => {
    await page.goto('/list/all-products');
    await page.locator('[id="\\32 "]').check();
    await Promise.all([
      page.waitForResponse(response => response.url() === `${process.env.REACT_APP_APIUrl}/products/?&type=all-products&brand=2` && response.status() === 200),
    ]);
  });
});
test.describe('Footer', () => {
  test('should be able to select footer menu', async ({ page }) => {
    await page.getByRole('listitem').filter({ hasText: 'Monitors' }).getByRole('link', { name: 'Monitors' }).click();
    await expect(page).toHaveURL('/list/monitors');
  });
});

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
