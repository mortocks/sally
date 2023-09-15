import { test, expect } from '@playwright/test';

test('User can login and logout', async ({ browser }) => {
    const page = await browser.newPage({ storageState: undefined });

    await page.goto('http://localhost:3000');

    // Navigate to the login pages 
    await page.getByRole('button', { name: 'Sign In' }).click();

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

    // Return
    await page.waitForURL('http://localhost:3000');
    await expect(page.getByTestId('logged-in-as')).toBeVisible();

    await page.getByRole('button', { name: 'Sign out' }).click();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();

});

