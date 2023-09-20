import { test, expect } from '@playwright/test';
import { userAuthFile } from './config';

test.use({ storageState: userAuthFile });

test('User can login and logout', async ({ page }) => {

    await page.goto('http://localhost:3000/');
    await page.getByRole('img', { name: 'User profile' }).click();
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByText('Sign in with Google')).toBeVisible()
});

