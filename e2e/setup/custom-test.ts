import { test as base, expect as baseExpect } from '@playwright/test'

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    if (!testInfo.file.includes('authorization')) {
      await page.goto('http://localhost:5173/task-management-app/')
      await page.click('text=Sign in')
      await page.getByPlaceholder('john.doe@example.com').fill('john.doe@example.com');
      await page.getByPlaceholder('password').fill('johndoe-password');
      await page.click('button:has-text("Login")')
      await page.waitForSelector('text=Go to projects')
    }

    await use(page)
  },
})

export const expect = baseExpect
