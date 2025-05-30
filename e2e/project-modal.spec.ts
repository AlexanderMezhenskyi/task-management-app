import { test, expect } from './setup/custom-test.js'

test('Project modal behaves correctly on open, fill, and close', async ({ page }) => {
  await page.goto('/task-management-app/projects');

  await page.getByRole('button', { name: 'Create project' }).click();
  const modal = page.locator('.project-modal');
  await expect(modal).toBeVisible();

  const createButton = page.getByRole('button', { name: /^Create$/ });
  await expect(createButton).toBeDisabled();

  await page.getByLabel('Title').fill('My new project');
  await page.getByLabel('Due date').fill('2025-12-31');

  await expect(createButton).toBeEnabled();

  const closeButton = page.locator('.project-modal .project-modal-header button');
  await closeButton.click();

  await expect(modal).toBeHidden();
});
