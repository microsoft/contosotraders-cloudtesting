import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

// Use the already logged in storage state for all tests
test.use({ storageState: 'storageState.json' });

test.describe('My profile', () => {
    test.skip('should be able to fill out personal info', async ({ page }) => {
        // Fill out the form using data from CSV
        const data = parse(fs.readFileSync(path.join(__dirname, 'test-data.csv')), {
            columns: true,
            skip_empty_lines: true
        });
        await page.goto('/profile/personal');
        await page.locator('#firstName').fill(data.firstName);
        await page.locator('#lastName').fill(data.lastName);
        await page.getByLabel('Email').fill(data.email);
        await page.getByLabel('Mobile Number').fill(data.mobile);
        await page.getByLabel('Date of birth').fill(data.dob);
        await page.locator('#currentpassword').fill(data.currentpassword);
        await page.locator('#newpassword').fill(data.newpassword);
        await page.locator('#confirmpassword').fill(data.confirmpassword);
        await page.getByRole('button', { name: 'Save Changes' }).click();
    });
});


