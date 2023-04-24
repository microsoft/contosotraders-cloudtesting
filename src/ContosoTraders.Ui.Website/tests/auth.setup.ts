import { test as setup } from '@playwright/test';

const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
    // skip setup if environment variables for AAD creds are not set
    setup.skip(!process.env.REACT_APP_AADUSERNAME || !process.env.REACT_APP_AADPASSWORD, 'AADUSERNAME and AADPASSWORD environment variables must be set');

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
    // Use try catch block to handle the case where the consent dialog is shown
    try {
        await dialog.waitForURL('**/Consent/**');
        await dialog.getByRole('button', { name: 'Yes' }).click();
    } catch (e) {
        // Consent dialog was not shown       
    }
    // Save auth state to file (.gitignore'd)
    await page.context().storageState({ path: authFile });
}); 