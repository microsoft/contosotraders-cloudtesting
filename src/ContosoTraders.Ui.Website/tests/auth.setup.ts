import { test as setup } from '@playwright/test';

const authFile = '.auth/user.json';

setup('authenticate', async ({ browser }) => {
    // skip setup if environment variables for AAD creds are not set
    setup.skip(process.env.AADUSERNAME === undefined || process.env.AADPASSWORD === undefined, 'AADUSERNAME and AADPASSWORD environment variables must be set');
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
    await page.context().storageState({ path: authFile });
});