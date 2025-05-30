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

test.describe('Edit Project', () => {
  test('User can open edit modal for a project', async ({ page }) => {
    await page.click('button.edit-button');
    await expect(page.locator('.project-modal')).toBeVisible();
  });

  test('User can update project title', async ({ page }) => {
    await page.click('button.edit-button');

    const titleInput = page.locator('input[id="title"]');
    await titleInput.fill('Updated Project Title');
    await page.click('button:has-text("Update")');

    await expect(page.locator('.project-link')).toContainText('Updated Project Title');
  });
});
