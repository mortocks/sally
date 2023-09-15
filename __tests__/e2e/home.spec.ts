import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Create\ T3\ App/);
});

test('login link', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the login button.
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveTitle(/Sign\ In/);
  await expect(page.getByText('Sign in with Discord')).toBeVisible();
});
