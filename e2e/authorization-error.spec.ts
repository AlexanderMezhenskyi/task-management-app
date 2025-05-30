import { test, expect } from '@playwright/test';

test('User sees error with invalid credentials', async ({ page }) => {
  await page.goto('/task-management-app/')
  await page.click('text=Sign in')
  await page.getByPlaceholder('john.doe@example.com').fill('wrong@example.com');
  await page.getByPlaceholder('password').fill('wrongpassword');
  await page.click('button:has-text("Login")')
  await expect(page.locator('text=Invalid credentials.')).toBeVisible()
})
