import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

// Test all the APIs in the application
test.describe('API data Assertions - category', () => {

    // Filter products by category - Controller and then assert category
    test('should be able to filter products by category - Controllers and then assert category', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products/?type=controllers`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        // Assert if each product falls under the category - Controllers and not any other
        productsFromResponse.forEach((product: { type: { name: string; }; }) => {
            expect(product.type.name === "Controllers").toBeTruthy();
            expect(product.type.name === "Desktops").toBeFalsy();
            expect(product.type.name === "Laptops").toBeFalsy();
            expect(product.type.name === "Mobiles").toBeFalsy();
            expect(product.type.name === "Monitors").toBeFalsy();
        });
    });

    // Filter products by category - Desktops and then assert category
    test('should be able to filter products by category - Desktops and then assert category', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products/?type=desktops`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        // Assert if each product falls under the category - Desktops and not any other
        productsFromResponse.forEach((product: { type: { name: string; }; }) => {
            expect(product.type.name === "Controllers").toBeFalsy();
            expect(product.type.name === "Desktops").toBeTruthy();
            expect(product.type.name === "Laptops").toBeFalsy();
            expect(product.type.name === "Mobiles").toBeFalsy();
            expect(product.type.name === "Monitors").toBeFalsy();
        });
    });

    // Filter products by category - Laptops and then assert category
    test('should be able to filter products by category - Laptops and then assert category', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products/?type=laptops`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        // Assert if each product falls under the category - Laptops and not any other
        productsFromResponse.forEach((product: { type: { name: string; }; }) => {
            expect(product.type.name === "Controllers").toBeFalsy();
            expect(product.type.name === "Desktops").toBeFalsy();
            expect(product.type.name === "Laptops").toBeTruthy();
            expect(product.type.name === "Mobiles").toBeFalsy();
            expect(product.type.name === "Monitors").toBeFalsy();
        });
    });

    // Filter products by category - Mobiles and then assert category
    test('should be able to filter products by category - Mobiles and then assert category', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products/?type=mobiles`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        // Assert if each product falls under the category - Mobiles and not any other
        productsFromResponse.forEach((product: { type: { name: string; }; }) => {
            expect(product.type.name === "Controllers").toBeFalsy();
            expect(product.type.name === "Desktops").toBeFalsy();
            expect(product.type.name === "Laptops").toBeFalsy();
            expect(product.type.name === "Mobiles").toBeTruthy();
            expect(product.type.name === "Monitors").toBeFalsy();
        });
    });

    // Filter products by category - Monitors and then assert category
    test('should be able to filter products by category - Monitors and then assert category', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products/?type=monitors`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        // Assert if each product falls under the category - Monitors and not any other
        productsFromResponse.forEach((product: { type: { name: string; }; }) => {
            expect(product.type.name === "Controllers").toBeFalsy();
            expect(product.type.name === "Desktops").toBeFalsy();
            expect(product.type.name === "Laptops").toBeFalsy();
            expect(product.type.name === "Mobiles").toBeFalsy();
            expect(product.type.name === "Monitors").toBeTruthy();
        });
    });
});

test.describe('API data Assertions - count', () => {

    // Initialize total no of each product
    let total_no_of_controllers = 0;
    let total_no_of_desktops = 0;
    let total_no_of_laptops = 0;
    let total_no_of_mobiles = 0;
    let total_no_of_monitors = 0;

    // Get all products, verify status and get and assert count of each product
    test('should be able to get all products, verify status and get and assert count of each product', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        // Get count of each product
        productsFromResponse.forEach((product: { type: { name: string; }; }) => {
            if (product.type.name === "Controllers") ++total_no_of_controllers;
            if (product.type.name === "Desktops") ++total_no_of_desktops;
            if (product.type.name === "Laptops") ++total_no_of_laptops;
            if (product.type.name === "Mobiles") ++total_no_of_mobiles;
            if (product.type.name === "Monitors") ++total_no_of_monitors;
        });

        // Assert total numbers of each product
        expect(total_no_of_controllers).toBeGreaterThanOrEqual(0);
        expect(total_no_of_desktops).toBeGreaterThanOrEqual(0);
        expect(total_no_of_laptops).toBeGreaterThanOrEqual(0);
        expect(total_no_of_mobiles).toBeGreaterThanOrEqual(0);
        expect(total_no_of_monitors).toBeGreaterThanOrEqual(0);
    });
});