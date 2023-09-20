import { test, expect } from '@playwright/test';
import { userAuthFile } from './config';

test.describe('Auth example', () => {
  test.use({ storageState: userAuthFile });

  test('test with auth', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });
})