import { test, expect } from '@playwright/test';

test('Verify animated characters render properly', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Wait for images to load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Take a full page screenshot
  await page.screenshot({ path: '/home/jules/verification/screenshots/characters_bust2.png', fullPage: true });

  console.log("Screenshot taken at /home/jules/verification/screenshots/characters_bust2.png");
});
