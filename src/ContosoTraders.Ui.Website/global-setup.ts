// @ts-nocheck
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(process.env.REACT_APP_BASEURLFORPLAYWRIGHTTESTING);
    // Sign in using creds from env variables
    const dialogPromise = page.waitForEvent('popup');
    await page.getByText('LOGIN').click();
    const dialog = await dialogPromise;
    await dialog.getByPlaceholder('Email, phone, or Skype').fill(process.env.AADUSERNAME);
    await dialog.getByRole('button', { name: 'Next' }).click();
    await dialog.getByPlaceholder('Password').fill(process.env.AADPASSWORD);
    await dialog.getByRole('button', { name: 'Sign in' }).click();
    // Do not stay signed in
    await dialog.getByRole('button', { name: 'No' }).click();
    // Save signed-in state to 'storageState.json'.
    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;

