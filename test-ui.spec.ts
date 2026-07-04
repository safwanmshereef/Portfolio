import { test, expect } from '@playwright/test';

test('projects UI update', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click on the Hybrid-RAG-AI-Assistant project
  const projectCard = await page.getByText('Hybrid-RAG-AI-Assistant');
  await projectCard.click();

  // Wait for modal to load
  await page.waitForTimeout(1000);

  // Take screenshot
  await page.screenshot({ path: 'projects_ui_update.png', fullPage: true });
});
