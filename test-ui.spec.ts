import { test, expect } from '@playwright/test';

test('projects UI update', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Wait for the text to appear
  await page.waitForSelector('text=Hybrid-RAG-AI-Assistant', { state: 'visible', timeout: 5000 });
  const projectCard = await page.getByText('Hybrid-RAG-AI-Assistant').first();
  await projectCard.click();

  // Wait for modal to load
  await page.waitForTimeout(1000);

  // Take screenshot
  await page.screenshot({ path: 'projects_ui_update.png', fullPage: true });
});
