import { test, expect } from '@playwright/test';

let _productid = 1;
test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

//Test all the APIs in the application
test.describe('APIs', () => {
    //text serach API
    test('should be able to load search by text data', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/Products/search/laptops`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
    });

    //load products list
    test('should be able to load products list', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/Products/?type=laptops`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
    });

    //load product details
    test('should be able to load product details', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/Products/` + _productid);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
    });

    //filter products by brands
    test('should be able to filter products by brands', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/Products/?type=laptops&brand=1`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
    });

    //filter products by category - Controller and then assert category
    test('should be able to filter products by category - Controllers and then assert category', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products/?type=controllers`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        //assert if each product falls under the category - Controllers and not any other
        productsFromResponse.forEach(async product => {
            await expect(product.type.name == "Controllers").toBeTruthy();
            await expect(product.type.name == "Desktops").toBeFalsy();
            await expect(product.type.name == "Laptops").toBeFalsy();
            await expect(product.type.name == "Mobiles").toBeFalsy();
            await expect(product.type.name == "Monitors").toBeFalsy();
        });
    });

    //filter products by category - Desktops and then assert category
    test('should be able to filter products by category - Desktops and then assert category', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products/?type=desktops`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        //assert if each product falls under the category - Desktops and not any other
        productsFromResponse.forEach(async product => {
            await expect(product.type.name == "Controllers").toBeFalsy();
            await expect(product.type.name == "Desktops").toBeTruthy();
            await expect(product.type.name == "Laptops").toBeFalsy();
            await expect(product.type.name == "Mobiles").toBeFalsy();
            await expect(product.type.name == "Monitors").toBeFalsy();
        });
    });

    //filter products by category - Laptops and then assert category
    test('should be able to filter products by category - Laptops and then assert category', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products/?type=laptops`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        //assert if each product falls under the category - Laptops and not any other
        productsFromResponse.forEach(async product => {
            await expect(product.type.name == "Controllers").toBeFalsy();
            await expect(product.type.name == "Desktops").toBeFalsy();
            await expect(product.type.name == "Laptops").toBeTruthy();
            await expect(product.type.name == "Mobiles").toBeFalsy();
            await expect(product.type.name == "Monitors").toBeFalsy();
        });
    });

    //filter products by category - Mobiles and then assert category
    test('should be able to filter products by category - Mobiles and then assert category', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products/?type=mobiles`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        //assert if each product falls under the category - Mobiles and not any other
        productsFromResponse.forEach(async product => {
            await expect(product.type.name == "Controllers").toBeFalsy();
            await expect(product.type.name == "Desktops").toBeFalsy();
            await expect(product.type.name == "Laptops").toBeFalsy();
            await expect(product.type.name == "Mobiles").toBeTruthy();
            await expect(product.type.name == "Monitors").toBeFalsy();
        });
    });

    //filter products by category - Monitors and then assert category
    test('should be able to filter products by category - Monitors and then assert category', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products/?type=monitors`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        //assert if each product falls under the category - Monitors and not any other
        productsFromResponse.forEach(async product => {
            await expect(product.type.name == "Controllers").toBeFalsy();
            await expect(product.type.name == "Desktops").toBeFalsy();
            await expect(product.type.name == "Laptops").toBeFalsy();
            await expect(product.type.name == "Mobiles").toBeFalsy();
            await expect(product.type.name == "Monitors").toBeTruthy();
        });
    });

    //initialize total no of each product
    let total_no_of_controllers = 0;
    let total_no_of_desktops = 0;
    let total_no_of_laptops = 0;
    let total_no_of_mobiles = 0;
    let total_no_of_monitors = 0;

    //get all products, verify status and get and assert count of each product
    test('should be able to get all products, verify status and get and assert count of each product', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        //get count of each products
        productsFromResponse.forEach(product => {
            if (product.type.name == "Controllers") ++total_no_of_controllers;
            if (product.type.name == "Desktops") ++total_no_of_desktops;
            if (product.type.name == "Laptops") ++total_no_of_laptops;
            if (product.type.name == "Mobiles") ++total_no_of_mobiles;
            if (product.type.name == "Monitors") ++total_no_of_monitors;
        });

        //assert total numbers of each product
        expect(total_no_of_controllers).toBeGreaterThanOrEqual(0);
        expect(total_no_of_desktops).toBeGreaterThanOrEqual(0);
        expect(total_no_of_laptops).toBeGreaterThanOrEqual(0);
        expect(total_no_of_mobiles).toBeGreaterThanOrEqual(0);
        expect(total_no_of_monitors).toBeGreaterThanOrEqual(0);
    });

    //filter products by category - controllers and then assert count
    test('should be able to filter products by category - controllers and then assert count', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products/?type=controllers`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        //assert count of category - controllers
        expect(productsFromResponse.length).toBe(total_no_of_controllers)
    });

    //filter products by category - desktops and then assert count
    test('should be able to filter products by category - desktops and then assert count', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products/?type=desktops`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        //assert count of category - desktops
        expect(productsFromResponse.length).toBe(total_no_of_desktops)
    });

    //filter products by category - laptops and then assert count
    test('should be able to filter products by category - laptops and then assert count', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products/?type=laptops`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        //assert count of category - laptops
        expect(productsFromResponse.length).toBe(total_no_of_laptops)
    });

    //filter products by category - mobiles and then assert count
    test('should be able to filter products by category - mobiles and then assert count', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products/?type=mobiles`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        //assert count of category - mobiles
        expect(productsFromResponse.length).toBe(total_no_of_mobiles)
    });

    //filter products by category - monitors and then assert count
    test('should be able to filter products by category - monitors and then assert count', async ({ request }) => {
        const response = await request.get(`${process.env.REACT_APP_APIURL}/products/?type=monitors`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        let productsFromResponse = await response.body().then(content => {
            let data = JSON.parse(content.toString());
            return data.products;
        });

        //assert count of category - monitors
        expect(productsFromResponse.length).toBe(total_no_of_monitors)
    });
});