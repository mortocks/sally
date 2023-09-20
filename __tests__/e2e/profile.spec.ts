import { test, expect } from '@playwright/test';
import { userAuthFile } from './config';
import { describe } from 'node:test';
import { faker } from '@faker-js/faker';

test.use({ storageState: userAuthFile });

describe('User profile', () => {


    test('User can update their profile', async ({ page }) => {

        await page.goto('/');
        await page.getByRole('img', { name: 'User profile' }).click();
        await page.getByRole('link', { name: 'Profile' }).click();

        // Fill out the form
        const newName = faker.person.firstName('male');
        await page.getByPlaceholder('Your name').fill(newName);
        await page.getByRole('button', { name: 'Save profile' }).click();

        await page.goto('/');
        await page.getByRole('img', { name: 'User profile' }).click();
        await page.getByRole('link', { name: 'Profile' }).click();
        await expect(page.getByPlaceholder('Your name')).toHaveValue(newName)
    });

})