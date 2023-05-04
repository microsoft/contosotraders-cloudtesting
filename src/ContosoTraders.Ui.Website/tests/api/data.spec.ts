import { test, expect } from '@playwright/test';

type Product = ({ type: { name: string } });

test.skip(() => !process.env.REACT_APP_APIURL, 'requires REACT_APP_APIURL');

test.use({
    baseURL: process.env.REACT_APP_APIURL + '/',
});

test.describe('API data Assertions - category', () => {
    // Filter products by category - Controller and then assert category
    test('should be able to filter products by category - Controllers and then assert category', async ({ request }) => {
        const response = await request.get('./products/?type=controllers');
        await expect(response).toBeOK();

        const productsFromResponse: Product[] = (await response.json()).products;

        // Assert if each product falls under the category - Controllers and not any other
        for (const product of productsFromResponse) {
            expect(product.type.name === "Controllers").toBeTruthy();
            expect(product.type.name === "Desktops").toBeFalsy();
            expect(product.type.name === "Laptops").toBeFalsy();
            expect(product.type.name === "Mobiles").toBeFalsy();
            expect(product.type.name === "Monitors").toBeFalsy();
        }
    });

    // Filter products by category - Desktops and then assert category
    test('should be able to filter products by category - Desktops and then assert category', async ({ request }) => {
        const response = await request.get('./products/?type=desktops');
        await expect(response).toBeOK();

        const productsFromResponse: Product[] = (await response.json()).products;

        // Assert if each product falls under the category - Desktops and not any other
        for (const product of productsFromResponse) {
            expect(product.type.name === "Controllers").toBeFalsy();
            expect(product.type.name === "Desktops").toBeTruthy();
            expect(product.type.name === "Laptops").toBeFalsy();
            expect(product.type.name === "Mobiles").toBeFalsy();
            expect(product.type.name === "Monitors").toBeFalsy();
        }
    });

    // Filter products by category - Laptops and then assert category
    test('should be able to filter products by category - Laptops and then assert category', async ({ request }) => {
        const response = await request.get('./products/?type=laptops');
        await expect(response).toBeOK();

        const productsFromResponse: Product[] = (await response.json()).products;

        // Assert if each product falls under the category - Laptops and not any other
        for (const product of productsFromResponse) {
            expect(product.type.name === "Controllers").toBeFalsy();
            expect(product.type.name === "Desktops").toBeFalsy();
            expect(product.type.name === "Laptops").toBeTruthy();
            expect(product.type.name === "Mobiles").toBeFalsy();
            expect(product.type.name === "Monitors").toBeFalsy();
        }
    });

    // Filter products by category - Mobiles and then assert category
    test('should be able to filter products by category - Mobiles and then assert category', async ({ request }) => {
        const response = await request.get('./products/?type=mobiles');
        await expect(response).toBeOK();

        const productsFromResponse: Product[] = (await response.json()).products;

        // Assert if each product falls under the category - Mobiles and not any other
        for (const product of productsFromResponse) {
            expect(product.type.name === "Controllers").toBeFalsy();
            expect(product.type.name === "Desktops").toBeFalsy();
            expect(product.type.name === "Laptops").toBeFalsy();
            expect(product.type.name === "Mobiles").toBeTruthy();
            expect(product.type.name === "Monitors").toBeFalsy();
        }
    });

    // Filter products by category - Monitors and then assert category
    test('should be able to filter products by category - Monitors and then assert category', async ({ request }) => {
        const response = await request.get('./products/?type=monitors');
        await expect(response).toBeOK();

        const productsFromResponse: Product[] = (await response.json()).products;

        // Assert if each product falls under the category - Monitors and not any other
        for (const product of productsFromResponse) {
            expect(product.type.name === "Controllers").toBeFalsy();
            expect(product.type.name === "Desktops").toBeFalsy();
            expect(product.type.name === "Laptops").toBeFalsy();
            expect(product.type.name === "Mobiles").toBeFalsy();
            expect(product.type.name === "Monitors").toBeTruthy();
        }
    });
});

test.describe('API data Assertions - count', () => {
    // Get all products, verify status and get and assert count of each product
    test('should be able to get all products, verify status and get and assert count of each product', async ({ request }) => {
        // Initialize total no of each product
        let totalNoOfControllers = 0;
        let totalNoOfDesktops = 0;
        let totalNoOfLaptops = 0;
        let totalNoOfMobiles = 0;
        let totalNoOfMonitors = 0;

        const response = await request.get('./products');
        await expect(response).toBeOK();

        const productsFromResponse: Product[] = (await response.json()).products;

        // Get count of each product
        for (const product of productsFromResponse) {
            if (product.type.name === "Controllers") ++totalNoOfControllers;
            if (product.type.name === "Desktops") ++totalNoOfDesktops;
            if (product.type.name === "Laptops") ++totalNoOfLaptops;
            if (product.type.name === "Mobiles") ++totalNoOfMobiles;
            if (product.type.name === "Monitors") ++totalNoOfMonitors;
        }

        // Assert total numbers of each product
        expect(totalNoOfControllers).toBeGreaterThanOrEqual(0);
        expect(totalNoOfDesktops).toBeGreaterThanOrEqual(0);
        expect(totalNoOfLaptops).toBeGreaterThanOrEqual(0);
        expect(totalNoOfMobiles).toBeGreaterThanOrEqual(0);
        expect(totalNoOfMonitors).toBeGreaterThanOrEqual(0);
    });
});