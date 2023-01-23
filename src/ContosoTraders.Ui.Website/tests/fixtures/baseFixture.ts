import { test as baseTest } from '@playwright/test';

let test = baseTest;

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

test.afterEach(async ({ page }) => {
    await page.close();
})

export default test;
export const expect = test.expect;

