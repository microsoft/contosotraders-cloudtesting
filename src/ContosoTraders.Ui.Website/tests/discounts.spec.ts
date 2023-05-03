import { test, expect } from '@playwright/test';

let _productid = 1;

// SETUP: Add product to cart, view cart
test.beforeEach(async ({ page }) => {
    await page.goto(`/product/detail/${_productid}`);
    await page.getByRole('button', { name: 'Add To Bag' }).click();
    await page.getByRole('button', { name: 'cart' }).click();    
})

test.describe('Discount Codes', () => {
    // Loop through each VALID discount code
    let _discountcodeValid = ['DISCOUNT15', 'DISCOUNT10'];
    for (let i = 0; i < _discountcodeValid.length; i++) {
        test(`should be able to use valid discount code ${_discountcodeValid[i]}`, async ({ page }) => {
            await page.getByPlaceholder('Enter coupon code').fill(_discountcodeValid[i]);
            await page.getByRole('button', { name: 'CHECK' }).click();
            await expect(page.getByRole('button', { name: _discountcodeValid[i] })).toBeVisible();
            // check that correct discount is applied
            let _orderDiscount = await page.getByTestId('discount').innerText();
            // append .00 to the end of the discount code
            _discountcodeValid[i] = _discountcodeValid[i] + '.00';
            // assert that both are equal
            await expect( _orderDiscount.replace('-$', '')).toEqual(_discountcodeValid[i].replace('DISCOUNT', ''));
        });
    }

    // Loop through each INVALID discount code
    let _discountcodeInValid = ['DISCOUNT20', 'DISCOUNT30'];
    for (let i = 0; i < _discountcodeInValid.length; i++) {
        test(`should not be able to use invalid discount code ${_discountcodeInValid[i]}`, async ({ page }) => {
            await page.getByPlaceholder('Enter coupon code').fill(_discountcodeInValid[i]);
            await page.getByRole('button', { name: 'CHECK' }).click();
            await expect(page.getByText('This coupon is invalid')).toBeVisible();
        });
    }
});