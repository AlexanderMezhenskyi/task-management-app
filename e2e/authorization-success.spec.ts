import { test, expect } from '@playwright/test';

test('User can sign in with valid credentials', async ({ page }) => {
  await page.goto('/task-management-app/');
  await page.click('text=Sign in');

  await expect(page.locator('input[placeholder="john.doe@example.com"]')).toBeVisible();

  await page.getByPlaceholder('john.doe@example.com').fill('john.doe@example.com');
  await page.getByPlaceholder('password').fill('johndoe-password');
  await page.click('button:has-text("Login")');
  await expect(page.locator('text=Go to projects')).toBeVisible();
});
