import { test, expect } from './setup/custom-test.js'

test.beforeEach(async ({ page }) => {
  await page.goto('/task-management-app/projects');
});

test('User sees a list of projects and can open project details', async ({ page }) => {
  await test.step('User can open create project modal', async () => {
    await page.click('button:has-text("Create project")');
    await expect(page.locator('.project-modal')).toBeVisible();
  });

  await test.step('User can create a new project', async () => {
    await page.click('button.base-button.variant-ghost');

    await page.click('button:has-text("Create project")');
    await page.getByLabel('Title').fill('My new project');
    await page.getByLabel('Due date').fill('2025-12-31');
    const createButton = page.getByRole('button', { name: /^Create$/ });
    await createButton.click();
    await expect(page.locator('.project-card', { hasText: 'My new project' })).toBeVisible();
  });

  await test.step('Check projects list is visible', async () => {
    const projectItems = page.locator('.project-card');
    const count = await projectItems.count();
    await expect(projectItems.first()).toBeVisible();
    expect(count).toBeGreaterThan(0);
  });

  let firstProjectTitle = '';
  await test.step('Get the title of the first project', async () => {
    const projectItems = page.locator('.project-card');
    firstProjectTitle = projectItems.first();
    await expect(firstProjectTitle).not.toHaveText('');
  });
});
