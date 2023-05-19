import { test, expect } from '@playwright/test';

const productId = 1;
const validDiscountCodes = ['DISCOUNT15', 'DISCOUNT10'];
const invalidDiscountCodes = ['DISCOUNT20', 'DISCOUNT30'];

// SETUP: Add product to cart, view cart
test.beforeEach(async ({ page }) => {
    await page.goto(`/product/detail/${productId}`);
    await page.getByRole('button', { name: 'Add To Bag' }).click();
    await page.getByRole('button', { name: 'cart' }).click();
})

test.describe('Discount Codes', () => {
    for (const code of validDiscountCodes) {
        test(`should be able to use VALID discount code ${code}`, async ({ page }) => {
            await page.getByPlaceholder('Enter coupon code').fill(code);
            await page.getByRole('button', { name: 'CHECK' }).click();
            await expect(page.getByRole('button', { name: code })).toBeVisible();
            // check that correct discount is applied
            await expect(page.getByTestId('discount')).toHaveText(`-$${code.replace('DISCOUNT', '')}.00`);
        });
    }

    for (const code of invalidDiscountCodes) {
        test(`should not be able to use INVALID discount code ${code}`, async ({ page }) => {
            await page.getByPlaceholder('Enter coupon code').fill(code);
            await page.getByRole('button', { name: 'CHECK' }).click();
            await expect(page.getByText('This coupon is invalid')).toBeVisible();
        });
    }
});