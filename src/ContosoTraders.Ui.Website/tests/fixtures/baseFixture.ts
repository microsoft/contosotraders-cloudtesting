import { test, Page } from '@playwright/test';

/* const test = baseTest.extend<{ homePage: page }>({ 
    homePage: async ({ browser }, use) => {
        await use(browser.newPage());
    }
}); */

let homePage: Page;

test.beforeAll(async ({ browser })=>{
    homePage = await browser.newPage();
  })
  
test.beforeEach(async({ page })=>{
    await page.goto('/');
  })

export default test;
export const expect = test.expect;
