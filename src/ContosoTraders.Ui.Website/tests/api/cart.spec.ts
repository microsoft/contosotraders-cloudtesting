import { test, expect } from '@playwright/test';

// Shopping cart data
const USER = 'fake@outlook.com';
const PRODUCT = 'Xbox Wireless Controller Lunar Shift Special Edition';
const PRODUCTID = 1;
const PRODUCTIMAGE = 'PID1-1.jpg';
const PRODUCTPRICE = 99;
const PRODUCTQUANTITY = 1;

test.skip(() => !process.env.REACT_APP_APIURLSHOPPINGCART, 'requires REACT_APP_APIURLSHOPPINGCART');

test.use({
    baseURL: process.env.REACT_APP_APIURLSHOPPINGCART + '/'
});

// SETUP: Create a new cart
test.beforeAll(async ({ request }) => {
    const newCart = await request.post('./ShoppingCart', {
        data: {
            cartItemId: "string",
            email: USER,
            productId: PRODUCTID,
            name: PRODUCT,
            price: PRODUCTPRICE,
            imageUrl: PRODUCTIMAGE,
            quantity: PRODUCTQUANTITY
        }
    });
    expect(newCart.status()).toBe(201);
});

test.describe('Shopping Cart API', () => {
    test('should be able to GET shopping cart', async ({ request }) => {
        const cart = await request.get('./ShoppingCart', {
            headers: {
                'Accept': 'accept: */*',
                'x-tt-email': USER,
            }
        });
        await expect(cart).toBeOK();

        expect(await cart.json()).toContainEqual(expect.objectContaining({
            email: USER,
            productId: PRODUCTID,
            name: PRODUCT,
            price: PRODUCTPRICE,
            imageUrl: PRODUCTIMAGE,
            quantity: PRODUCTQUANTITY
        }));
    });
});

// TEARDOWN: Delete the cart
test.afterAll(async ({ request }) => {
    const cart = await request.get('./ShoppingCart', {
        headers: {
            'Accept': 'accept: */*',
            'x-tt-email': USER,
        }
    });
    await expect(cart).toBeOK();

    // Loop through each cart item and delete it
    const cartBody = JSON.parse(await cart.text());
    for (let i = 0; i < cartBody.length; i++) {
        const deleteCart = await request.delete('./ShoppingCart/product', {
            data: {
                cartItemId: cartBody[i].cartItemId,
                email: USER,
                productId: cartBody[i].productId,
                name: cartBody[i].name,
                price: cartBody[i].price,
                imageUrl: cartBody[i].imageUrl,
                quantity: cartBody[i].quantity
            }
        });
        await expect(deleteCart).toBeOK();
    }
});
