import { test as baseTest } from '@playwright/test';

let test = baseTest;

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

export default test;
export const expect = test.expect;

