import { test, expect } from '@playwright/test';
import { userAuthFile } from './config';

test.describe('Create client form', () => {
    test.use({ storageState: userAuthFile });

    test('Can create a client', async ({ page }) => {
        await page.goto('/clients/new');
        await page.getByPlaceholder('Company name').click();
        await page.getByPlaceholder('Company name').fill('Client name');
        await page.getByPlaceholder('First name').click();
        await page.getByPlaceholder('First name').fill('John');
        await page.getByPlaceholder('First name').press('Tab');
        await page.getByPlaceholder('Last name').fill('Smith');
        await page.getByPlaceholder('Last name').press('Tab');
        await page.getByPlaceholder('Email name').fill('john@email.com');
        await page.getByRole('button', { name: 'Create client' }).click();
    });

    test('Company name name is required', async ({ page }) => {
        await page.goto('/clients/new');
        await page.getByRole('button', { name: 'Create client' }).click();
        await expect(page.getByText('Name is required').first()).toBeVisible();
    });

    test('Contacts name is required', async ({ page }) => {
        await page.goto('/clients/new');
        await page.getByRole('button', { name: 'Create client' }).click();
        await expect(page.getByText('Name is required').first()).toBeVisible();
    });

    test('Contacts email name is required', async ({ page }) => {
        await page.goto('/clients/new');
        await page.getByRole('button', { name: 'Create client' }).click();
        await expect(page.getByText('Email is required').first()).toBeVisible();
    });

    test('Contacts email must be an email', async ({ page }) => {
        await page.goto('/clients/new');
        await page.getByPlaceholder('Email name').fill('not-an-email');
        await page.getByRole('button', { name: 'Create client' }).click();
        await expect(page.getByText('Not an email address').first()).toBeVisible();
    });
})