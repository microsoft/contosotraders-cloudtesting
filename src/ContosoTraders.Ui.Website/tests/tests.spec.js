// @ts-check
const { test, expect } = require('@playwright/test');
let _productid = 1;
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
  const response = await request.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
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
    console.log(process.env.REACT_APP_APIUrl);
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

  //filter products by category - Controller and then assert category
  test('should be able to filter products by category - Controllers and then assert category', async ({ request }) => {
    const response = await request.get(`${process.env.REACT_APP_APIUrl}/products/?type=controllers`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    let productsFromResponse = await response.body().then(content => { 
      let data = JSON.parse(content.toString()); 
      return data.products;
    });

    //assert if each product falls under the category - Controllers and not any other
    productsFromResponse.forEach(async product => {
      await expect(product.type.name == "Controllers").toBeTruthy();
      await expect(product.type.name == "Desktops").toBeFalsy();
      await expect(product.type.name == "Laptops").toBeFalsy();
      await expect(product.type.name == "Mobiles").toBeFalsy();
      await expect(product.type.name == "Monitors").toBeFalsy();
    });
  });

  //filter products by category - Desktops and then assert category
  test('should be able to filter products by category - Desktops and then assert category', async ({ request }) => {
    const response = await request.get(`${process.env.REACT_APP_APIUrl}/products/?type=desktops`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    let productsFromResponse = await response.body().then(content => { 
      let data = JSON.parse(content.toString()); 
      return data.products;
    });

    //assert if each product falls under the category - Desktops and not any other
    productsFromResponse.forEach(async product => {
      await expect(product.type.name == "Controllers").toBeFalsy();
      await expect(product.type.name == "Desktops").toBeTruthy();
      await expect(product.type.name == "Laptops").toBeFalsy();
      await expect(product.type.name == "Mobiles").toBeFalsy();
      await expect(product.type.name == "Monitors").toBeFalsy();
    });
  });

  //filter products by category - Laptops and then assert category
  test('should be able to filter products by category - Laptops and then assert category', async ({ request }) => {
    const response = await request.get(`${process.env.REACT_APP_APIUrl}/products/?type=laptops`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    let productsFromResponse = await response.body().then(content => { 
      let data = JSON.parse(content.toString()); 
      return data.products;
    });

    //assert if each product falls under the category - Laptops and not any other
    productsFromResponse.forEach(async product => {
      await expect(product.type.name == "Controllers").toBeFalsy();
      await expect(product.type.name == "Desktops").toBeFalsy();
      await expect(product.type.name == "Laptops").toBeTruthy();
      await expect(product.type.name == "Mobiles").toBeFalsy();
      await expect(product.type.name == "Monitors").toBeFalsy();
    });
  });

  //filter products by category - Mobiles and then assert category
  test('should be able to filter products by category - Mobiles and then assert category', async ({ request }) => {
    const response = await request.get(`${process.env.REACT_APP_APIUrl}/products/?type=mobiles`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    let productsFromResponse = await response.body().then(content => { 
      let data = JSON.parse(content.toString()); 
      return data.products;
    });

    //assert if each product falls under the category - Mobiles and not any other
    productsFromResponse.forEach(async product => {
      await expect(product.type.name == "Controllers").toBeFalsy();
      await expect(product.type.name == "Desktops").toBeFalsy();
      await expect(product.type.name == "Laptops").toBeFalsy();
      await expect(product.type.name == "Mobiles").toBeTruthy();
      await expect(product.type.name == "Monitors").toBeFalsy();
    });
  });

  //filter products by category - Monitors and then assert category
  test('should be able to filter products by category - Monitors and then assert category', async ({ request }) => {
    const response = await request.get(`${process.env.REACT_APP_APIUrl}/products/?type=monitors`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    let productsFromResponse = await response.body().then(content => { 
      let data = JSON.parse(content.toString()); 
      return data.products;
    });

    //assert if each product falls under the category - Monitors and not any other
    productsFromResponse.forEach(async product => {
      await expect(product.type.name == "Controllers").toBeFalsy();
      await expect(product.type.name == "Desktops").toBeFalsy();
      await expect(product.type.name == "Laptops").toBeFalsy();
      await expect(product.type.name == "Mobiles").toBeFalsy();
      await expect(product.type.name == "Monitors").toBeTruthy();
    });
  });

  //initialize total no of each product
  let total_no_of_controllers = 0;
  let total_no_of_desktops = 0;
  let total_no_of_laptops = 0;
  let total_no_of_mobiles = 0;
  let total_no_of_monitors = 0;

  //get all products, verify status and get and assert count of each product
  test('should be able to get all products, verify status and get and assert count of each product', async ({ request }) => {
      const response = await request.get(`${process.env.REACT_APP_APIUrl}/products`);
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();

    let productsFromResponse = await response.body().then(content => { 
      let data = JSON.parse(content.toString()); 
      return data.products;
    });

    //get count of each products
    productsFromResponse.forEach(product => {
      if(product.type.name == "Controllers") ++total_no_of_controllers;
      if(product.type.name == "Desktops") ++total_no_of_desktops;
      if(product.type.name == "Laptops") ++total_no_of_laptops;
      if(product.type.name == "Mobiles") ++total_no_of_mobiles;
      if(product.type.name == "Monitors") ++total_no_of_monitors;
    });

    //assert total numbers of each product
    expect(total_no_of_controllers).toBeGreaterThanOrEqual(0);
    expect(total_no_of_desktops).toBeGreaterThanOrEqual(0);
    expect(total_no_of_laptops).toBeGreaterThanOrEqual(0);
    expect(total_no_of_mobiles).toBeGreaterThanOrEqual(0);
    expect(total_no_of_monitors).toBeGreaterThanOrEqual(0);
  });

  //filter products by category - controllers and then assert count
  test('should be able to filter products by category - controllers and then assert count', async ({ request }) => {
    const response = await request.get(`${process.env.REACT_APP_APIUrl}/products/?type=controllers`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    let productsFromResponse = await response.body().then(content => { 
      let data = JSON.parse(content.toString()); 
      return data.products;
    });

    //assert count of category - controllers
    expect(productsFromResponse.length).toBe(total_no_of_controllers)
  });

  //filter products by category - desktops and then assert count
  test('should be able to filter products by category - desktops and then assert count', async ({ request }) => {
    const response = await request.get(`${process.env.REACT_APP_APIUrl}/products/?type=desktops`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    let productsFromResponse = await response.body().then(content => { 
      let data = JSON.parse(content.toString()); 
      return data.products;
    });

    //assert count of category - desktops
    expect(productsFromResponse.length).toBe(total_no_of_desktops)
  });

  //filter products by category - laptops and then assert count
  test('should be able to filter products by category - laptops and then assert count', async ({ request }) => {
    const response = await request.get(`${process.env.REACT_APP_APIUrl}/products/?type=laptops`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    let productsFromResponse = await response.body().then(content => { 
      let data = JSON.parse(content.toString()); 
      return data.products;
    });

    //assert count of category - laptops
    expect(productsFromResponse.length).toBe(total_no_of_laptops)
  });

  //filter products by category - mobiles and then assert count
  test('should be able to filter products by category - mobiles and then assert count', async ({ request }) => {
    const response = await request.get(`${process.env.REACT_APP_APIUrl}/products/?type=mobiles`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    let productsFromResponse = await response.body().then(content => { 
      let data = JSON.parse(content.toString()); 
      return data.products;
    });

    //assert count of category - mobiles
    expect(productsFromResponse.length).toBe(total_no_of_mobiles)
  });

  //filter products by category - monitors and then assert count
  test('should be able to filter products by category - monitors and then assert count', async ({ request }) => {
    const response = await request.get(`${process.env.REACT_APP_APIUrl}/products/?type=monitors`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    let productsFromResponse = await response.body().then(content => { 
      let data = JSON.parse(content.toString()); 
      return data.products;
    });

    //assert count of category - monitors
    expect(productsFromResponse.length).toBe(total_no_of_monitors)
  });

});