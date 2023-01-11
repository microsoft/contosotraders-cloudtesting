const { test, expect } = require('@playwright/test');

test.beforeEach(async({page})=>{
  await page.goto('/');
})

test('Login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'show 4 new mails' }).hover();//hover login button
    await page.getByRole('button', { name: 'show 4 new mails' }).click();//click login button
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