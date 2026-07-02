from playwright.sync_api import sync_playwright


def analyze_website(url):

    with sync_playwright() as p:

        print("CUSTOM CHROMIUM PATH ACTIVE")

        browser = p.chromium.launch(
            headless=True,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--disable-setuid-sandbox",
                "--no-sandbox"
            ]    
        )

        context = browser.new_context(
            ignore_https_errors=True
        )

        page = context.new_page()

        try:
            page.goto(
                url,
                wait_until="domcontentloaded",
                timeout=10000
            )

            result = {
                "url": page.url,
                "title": page.title(),
                "links": page.locator("a").count(),
                "buttons": page.locator("button").count(),
                "forms": page.locator("form").count(),
                "images": page.locator("img").count(),
                "inputs": page.locator("input").count()
            }

        except Exception as e:

            browser.close()

            return {
                "error": str(e),
                "status": "Website unreachable or SSL issue"
            }

        browser.close()

        return result