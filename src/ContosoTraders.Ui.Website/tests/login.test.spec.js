const { test, expect } = require('@playwright/test');

test.beforeEach(async({page})=>{
  await page.goto('/');
})
//Test the login scenarios
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
  });