const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1280, height: 4000 });
  await page.goto('http://localhost:3002');

  // Wait a bit for animations to start and characters to be visible
  await page.waitForTimeout(5000);

  await page.screenshot({ path: '/home/jules/verification/screenshots/characters_bust3.png', fullPage: true });
  await browser.close();
  console.log("Screenshot saved to /home/jules/verification/screenshots/characters_bust3.png");
})();
