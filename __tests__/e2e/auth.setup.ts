import { test as setup, expect } from '@playwright/test';
import { userAuthFile } from './config'

setup('authenticate', async ({ browser }) => {
    // Perform authentication steps. Replace these actions with your own.
    const page = await browser.newPage({ storageState: undefined });

    await page.goto('http://localhost:3000');

    // Auth page
    await expect(page.getByText('Sign in with Google')).toBeVisible()
    await page.getByText('Sign in with Google').click();

    // Google auth
    await page.getByLabel('Email or phone').click();
    await page.getByLabel('Email or phone').fill(process.env.USERNAME ?? '');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByLabel('Enter your password').click();
    await page.getByLabel('Enter your password').fill(process.env.PASSWORD ?? '');
    await page.getByRole('button', { name: 'Next' }).click();

    // Return to app
    await page.waitForURL('http://localhost:3000');

    // End of authentication steps.
    await page.context().storageState({ path: userAuthFile });
});