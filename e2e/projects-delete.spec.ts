import { test, expect } from './setup/custom-test.js'

test.beforeEach(async ({ page }) => {
  await page.goto('/task-management-app/projects');
  await page.click('button:has-text("Create project")');
  await page.getByLabel('Title').fill('My new project');
  await page.getByLabel('Due date').fill('2025-12-31');

  const createButton = page.getByRole('button', { name: /^Create$/ });
  await createButton.click({ timeout: 3000 });

  const loader = page.locator('.loader-container');
  if (await loader.isVisible()) {
    await loader.waitFor({ state: 'hidden', timeout: 5000 });
  }
});

test.describe('Delete Project', () => {
  test('User can delete a project', async ({ page }) => {
    await page.click('button.remove-button');
    await expect(page.locator('.project-card')).not.toBeAttached();
  });
});
