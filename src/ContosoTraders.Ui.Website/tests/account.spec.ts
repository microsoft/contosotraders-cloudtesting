import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Log in once before underlying test cases run
// NOTE: This can also be setup as a fixture or as part of global setup
test.beforeAll(async ({ browser }) => {
    // Skip if AADUSERNAME and AADPASSWORD environment variables are not set
    test.skip(process.env.AADUSERNAME === undefined || process.env.AADPASSWORD === undefined, 'AADUSERNAME and AADPASSWORD environment variables must be set');
    // Only run if storageState.json file does not exist on disk
    if (!fs.existsSync('storageState.json')) {
        const page = await browser.newPage();
        await page.goto('');
        // Sign in using creds from env variables
        const dialogPromise = page.waitForEvent('popup');
        await page.getByText('LOGIN').click();
        const dialog = await dialogPromise;
        await dialog.getByPlaceholder('Email, phone, or Skype').fill(process.env.AADUSERNAME!);
        await dialog.getByRole('button', { name: 'Next' }).click();
        await dialog.getByPlaceholder('Password').fill(process.env.AADPASSWORD!);
        await dialog.getByRole('button', { name: 'Sign in' }).click();
        // Do not stay signed in
        await dialog.getByRole('button', { name: 'No' }).click();
        // Save signed-in state to 'storageState.json'.
        await page.context().storageState({ path: 'storageState.json' });
        await page.close();
    }
});

test.skip('My profile', () => {
    test('should be able to fill out personal info', async ({ browser }) => {
        test.skip(process.env.AADUSERNAME === undefined || process.env.AADPASSWORD === undefined, 'AADUSERNAME and AADPASSWORD environment variables must be set');
        // Fill out the form using data from CSV
        const records = parse(fs.readFileSync(path.join(__dirname, 'test-data.csv')), {
            columns: true,
            skip_empty_lines: true
        });
        // For each record in CSV, fill out the form
        for (const record of records) {
            // Use the saved signed-in state to set context
            const loggedInContext = await browser.newContext({ storageState: 'storageState.json' });
            const loggedInPage = await loggedInContext.newPage();
            // Fill out the form
            await loggedInPage.goto('/profile/personal');
            await loggedInPage.locator('#firstName').fill(`${record.firstName}`);
            await loggedInPage.locator('#lastName').fill(`${record.lastName}`);
            await loggedInPage.getByLabel('Email').fill(`${record.email}`);
            await loggedInPage.getByLabel('Mobile Number').fill(`${record.mobile}`);
            await loggedInPage.getByLabel('Date of birth').fill(`${record.dob}`);
            await loggedInPage.locator('#currentpassword').fill(`${record.currentpassword}`);
            await loggedInPage.locator('#newpassword').fill(`${record.newpassword}`);
            await loggedInPage.locator('#confirmpassword').fill(`${record.confirmpassword}`);
            await loggedInPage.getByRole('button', { name: 'Save Changes' }).click();
            // Verify no validation errors are present
            expect(await loggedInPage.locator('.Mui-error').count()).toEqual(0);
            // Close the page and context
            await loggedInPage.close();
            await loggedInContext.close();
        }
    });
});


