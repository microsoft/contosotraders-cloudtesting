// @ts-check
const { test, expect } = require('@playwright/test');
let _productid = 1;
let page = null;
let BingMapsKey = `AkLj1p_g1w7lFb8lJZ-XnicObnu2-ydEpmn6eryraluxl_x3bDo0Jx6w58b7ZJt2`;

test.beforeAll(async ({ browser })=>{
  page = await browser.newPage()
})

test.beforeEach(async({page})=>{
  await page.goto('/');
})
//#region Uncomment below lines to run dark mode tests
// test.describe('Dark Mode', () => {
//   test('shows page in dark mode', async ({ page }) => {
//     await page.locator('input.MuiSwitch-input').check()
//     await expect(page.locator('.App')).toHaveAttribute('class', 'App dark')
//   })
// });
//#endregion
test('Test with geolocation', async ({ page, context, request }) => {
  const ipTest = await request.get('http://ip-api.com/json');
  expect(ipTest.status()).toBe(200);
  expect(ipTest.ok()).toBeTruthy();
  const location = JSON.parse(await ipTest.text())

  const latitude = location.lat//await page.locator('input#latitude').inputValue();
  const longitude = location.lon//await page.locator('input#longitude').inputValue();
  const point = latitude+','+longitude;
  // const response = await request.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
  const response = await request.get(`http://dev.virtualearth.net/REST/v1/Locations/${point}?key=${BingMapsKey}`);
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  if(latitude != null && longitude != null){
    await context.setGeolocation({ longitude: parseFloat(longitude), latitude: parseFloat(latitude) });
  }
  await Promise.all([
    page.waitForSelector('#current-location'),
  ]);
  // await page.screenshot({ path: 'screenshot.png', fullPage: true });
  // await page.goto('https://www.openstreetmap.org');
  // await page.locator('[aria-label="Show My Location"]').click();
  // await page.goto('https://maps.google.com');
  // await page.locator('[aria-label="Show Your Location"]').click();
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

  test('Hover over header menus', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'All Products' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Laptops' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Controllers' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Mobiles' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Monitors' }).hover();
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

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

test.afterAll(async ({ page }) => {
  await page.close();
});