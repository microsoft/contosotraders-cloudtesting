// @ts-check
const { test, expect } = require('@playwright/test');
let _productid = 1;
test.beforeEach(async({page})=>{
  await page.goto('/');
})
test.describe('Dark Mode', () => {
  test('shows page in dark mode', async ({ page }) => {
    await page.locator('input.MuiSwitch-input').check()
    await expect(page.locator('.App')).toHaveAttribute('class', 'App dark')
  })
});
test('Test with geolocation', async ({ page, context, request }) => {
  const ipTest = await request.get('http://ip-api.com/json');
  expect(ipTest.status()).toBe(200);
  expect(ipTest.ok()).toBeTruthy();
  const zip = JSON.parse(await ipTest.text())

  const getLoc = await request.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip.zip}&key=AIzaSyD4F-54JAXsiRIUG621ZLFShFWnOJzQbjc`);
  expect(getLoc.status()).toBe(200);
  expect(getLoc.ok()).toBeTruthy();
  const getCoords = JSON.parse(await getLoc.text())
  // const zip = await Promise.all([
  //   page.waitForResponse(res => {
  //     // const text = await response.text();
  //     return res.body()
  //     &&
  //     res.url() == 'http://ip-api.com/json'
  //   })
  // ])
  await page.locator('[name=console]').fill(getCoords.status);
  const latitude = await page.locator('input#latitude').inputValue();
  const longitude = await page.locator('input#longitude').inputValue();
  const response = await request.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  if(latitude != null && longitude != null){
    await context.setGeolocation({ longitude: parseFloat(longitude), latitude: parseFloat(latitude) });
  }
  await Promise.all([
    page.waitForSelector('#current-location'),
    // page.waitForSelector('#element2')
  ]);
  // await page.goto('https://www.openstreetmap.org');
  // await page.locator('[aria-label="Show My Location"]').click();
  // await page.goto('https://maps.google.com');
  // await page.locator('[aria-label="Show Your Location"]').click();
});
test('Login', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'show 4 new mails' }).click();
  const page1Promise = await page.waitForEvent('popup');
  const page1 = await page1Promise;
  await page1.locator('[name=loginfmt]').click();
  await page1.locator('[name=loginfmt]').fill('TailwindTraders.User@spektrasystems.com');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.locator('[name=passwd]').click();
  await page1.locator('[name=passwd]').fill('Spektra123!@#');
  await page1.getByRole('button', { name: 'Sign in' }).click();
  // if(await page1.$$('#idSIButton9')){
  //   page1.locator('#idSIButton9').click();
  // }
  // await page1.getByRole('button', { name: 'Approve a request on my Microsoft Authenticator app' }).click();
  // await Promise.all([
  //   // Waits for the next response matching some conditions
  //   page.waitForResponse(response => response.url() === `${process.env.REACT_APP_APIUrl}/products/landing` && response.status() === 200),
  // ]);
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
