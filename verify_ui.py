from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # 1. Take screenshot of hero (check profile picture & animations)
    page.screenshot(path="/home/jules/verification/screenshots/hero_updated.png")
    page.wait_for_timeout(1000)

    # 2. Scroll to Projects and click on Finance Dashboard
    page.evaluate("window.scrollTo(0, document.body.scrollHeight / 3)")
    page.wait_for_timeout(1000)

    # Click on Finance Dashboard project card
    page.locator("text=Finance Dashboard").click()
    page.wait_for_timeout(1000)

    page.screenshot(path="/home/jules/verification/screenshots/finance_project.png")
    page.wait_for_timeout(1000)

    # Close modal (using more specific selector)
    page.locator("button", has=page.locator("svg.lucide-x")).click()
    page.wait_for_timeout(1000)

    # Click on STORE APP (Internship) project card
    page.locator("text=STORE APP (Internship)").click()
    page.wait_for_timeout(1000)

    page.screenshot(path="/home/jules/verification/screenshots/store_app_project.png")
    page.wait_for_timeout(1000)


if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={'width': 1280, 'height': 720}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
