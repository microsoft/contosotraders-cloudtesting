import { test, expect, } from '@playwright/test';

// SETUP: Get first 5 product ID's and add them all to cart
test.beforeEach(async ({ page, request }) => {
    const response = await request.get(process.env.REACT_APP_APIURL + '/products')
    await expect(response).toBeOK();
    const productsFromResponse = (await response.json()).products.slice(0, 5);
    for (const product of productsFromResponse) {
        await page.goto(`/product/detail/${product.id}`);
        await page.getByRole('button', { name: 'Add To Bag' }).click();
    }
    await page.getByRole('button', { name: 'cart' }).click();
});

test.describe('Shopping Cart', () => {
    test('should be able to view cart', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'My Cart' })).toBeVisible();
        await expect(page.getByText('Order Summary')).toBeVisible();
        await expect(page.getByText('Product Name')).toBeVisible();
        await expect(page.getByText('Price', { exact: true })).toBeVisible();
        await expect(page.getByText('Qty', { exact: true })).toBeVisible();
        await expect(page.getByText('Subtotal', { exact: true })).toBeVisible();
    });

    test('should be able to increase quantity', async ({ page }) => {
        await page.getByRole('button', { name: '+' }).first().click();
    });

    test('should be able to decrease quantity', async ({ page }) => {
        await page.getByRole('button', { name: '-' }).first().click();
    });
});

// TEARDOWN: Remove items from cart
test.afterAll(async ({ page }) => {
    // Remove items from the cart
    while (!(await page.getByRole('heading', { name: 'Your Cart is empty' }).isVisible())) {
        await page.getByRole('link', { name: 'Remove' }).first().click();
    }
});