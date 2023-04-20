import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

test.beforeEach(async () => {
    // skip test if environment variables for AAD creds are not set
    test.skip(!process.env.REACT_APP_AADUSERNAME || !process.env.REACT_APP_AADPASSWORD, 'AADUSERNAME and AADPASSWORD environment variables must be set');
});

test.describe('My Profile', () => {
    test('should be able to fill out personal info', async ({ page }) => {
        // Fill out the form using data from CSV
        const records = parse(fs.readFileSync(path.join(__dirname, 'test-data.csv')), {
            columns: true,
            skip_empty_lines: true
        });
        // For each record in CSV, fill out the form
        for (const record of records) {
            // Fill out the form
            await page.goto('/profile/personal');
            await page.locator('#firstName').fill(`${record.firstName}`);
            await page.locator('#lastName').fill(`${record.lastName}`);
            await page.getByLabel('Email').fill(`${record.email}`);
            await page.getByLabel('Mobile Number').fill(`${record.mobile}`);
            await page.getByLabel('Date of birth').fill(`${record.dob}`);
            await page.locator('#currentpassword').fill(`${record.currentpassword}`);
            await page.locator('#newpassword').fill(`${record.newpassword}`);
            await page.locator('#confirmpassword').fill(`${record.confirmpassword}`);
            await page.getByRole('button', { name: 'Save Changes' }).click();
            // Verify no validation errors are present
            await expect(page.locator('.Mui-error')).toHaveCount(0);
        }
    });
});

test.describe('My Cart', () => {
    test('should be able to view cart', async ({ page }) => {
        await page.goto('');
        await page.getByRole('button', { name: 'cart' }).click();
        await expect(page).toHaveURL('/cart');
        await expect(page.getByRole('heading', { name: 'My Cart' })).toBeVisible();
    });
});
