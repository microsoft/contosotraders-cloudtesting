import { expect, test as setup } from '@playwright/test';

const authFile = '.auth/user.json';

setup('authenticate', async ({ browser }) => {
    // skip setup if environment variables for AAD creds are not set
    setup.skip(process.env.REACT_APP_AADUSERNAME === undefined || process.env.REACT_APP_AADPASSWORD === undefined, 'AADUSERNAME and AADPASSWORD environment variables must be set');
    const page = await browser.newPage();
    await page.goto('');
    // Sign in using creds from env variables
    const dialogPromise = page.waitForEvent('popup');
    await page.getByText('LOGIN').click();
    const dialog = await dialogPromise;
    await dialog.getByPlaceholder('Email, phone, or Skype').fill(process.env.REACT_APP_AADUSERNAME!);
    await dialog.getByRole('button', { name: 'Next' }).click();
    await dialog.getByPlaceholder('Password').fill(process.env.REACT_APP_AADPASSWORD!);
    await dialog.getByRole('button', { name: 'Sign in' }).click();
    // Do not stay signed in
    await dialog.getByRole('button', { name: 'No' }).click();
    // If app permissions prompt is shown, click "Yes"
    if (await dialog.getByRole('heading', { name: 'Let this app access your info?' }).isVisible()) {
        await dialog.getByRole('button', { name: 'Yes' }).click();
    }
    // Save auth state to file
    await page.context().storageState({ path: authFile });
}); 