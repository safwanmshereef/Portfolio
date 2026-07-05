from playwright.sync_api import sync_playwright

def run_cuj(page):
    print("Navigating to local server...")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    print("Scrolling to Experience section...")
    # Scroll down slightly to make sure Experience is in view
    page.evaluate("window.scrollTo(0, document.body.scrollHeight / 3)")
    page.wait_for_timeout(2000)

    # Take screenshot of Experience & Skill tree area
    page.screenshot(path="/home/jules/verification/screenshots/verification.png", full_page=True)
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()  # MUST close context to save the video
            browser.close()
