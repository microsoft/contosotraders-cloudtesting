import { test as baseTest, page } from '@playwright/test';


let test = baseTest;
let homePage = page;

/* const test = baseTest.extend<{ homePage: page }>({ 
    homePage: async ({ browser }, use) => {
        await use(browser.newPage());
    }
}); */

test.beforeAll(async ({ browser })=>{
    homePage = await browser.newPage();
  })
  
test.beforeEach(async({ page })=>{
    await page.goto('/');
  })

export default test;
export const expect = test.expect;
