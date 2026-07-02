import os
from datetime import datetime
from urllib.parse import urlparse

from playwright.sync_api import (
    sync_playwright,
    TimeoutError as PlaywrightTimeoutError
)


def execute_tests(url):

    execution_id = datetime.now().strftime(
        "%Y%m%d_%H%M%S"
    )

    execution_folder = os.path.join(
        "app",
        "executions",
        execution_id
    )

    screenshots_folder = os.path.join(
        execution_folder,
        "screenshots"
    )

    os.makedirs(
        screenshots_folder,
        exist_ok=True
    )

    automation_results = []
    screenshots = []

    with sync_playwright() as p:

        browser = p.chromium.launch(
            executable_path=
            "/opt/render/.cache/ms-playwright/chromium-1228/chrome-linux/chrome",
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
            ignore_https_errors=True,
            viewport={
                "width": 1440,
                "height": 900
            },
            user_agent=(
                "Mozilla/5.0 "
                "(Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 "
                "(KHTML, like Gecko) "
                "Chrome/138.0 Safari/537.36"
            )
        )

        page = context.new_page()

        page.set_default_timeout(
            10000
        )

        try:

            # -----------------------------------
            # Homepage Test
            # -----------------------------------

            page.goto(
                url,
                wait_until="domcontentloaded",
                timeout=10000
            )

            homepage_path = os.path.join(
                screenshots_folder,
                "homepage.png"
            )

            page.screenshot(
                path=homepage_path,
                full_page=True
            )

            screenshots.append(
                homepage_path
            )

            automation_results.append(
                {
                    "test":
                        "Homepage Accessibility",

                    "status":
                        "PASS",

                    "details":
                        "Homepage loaded successfully."
                }
            )

            # -----------------------------------
            # Page Title Validation
            # -----------------------------------

            title = page.title()

            if title:

                automation_results.append(
                    {
                        "test":
                            "Page Title Validation",

                        "status":
                            "PASS",

                        "details":
                            f"Title detected: {title}"
                    }
                )

            else:

                automation_results.append(
                    {
                        "test":
                            "Page Title Validation",

                        "status":
                            "FAIL",

                        "reason":
                            "No page title was found.",

                        "recommendation":
                            "Ensure the website contains "
                            "a valid HTML title element."
                    }
                )

            # -----------------------------------
            # Discover Internal Links
            # -----------------------------------

            links = page.evaluate("""
                () => Array.from(
                    document.querySelectorAll("a")
                ).map(
                    a => a.href
                )
            """)

            discovered_links = []

            for link in links:

                if not link:
                    continue

                if link.startswith("mailto:"):
                    continue

                if link.startswith("javascript:"):
                    continue

                if "#" in link:
                    continue

                if link in discovered_links:
                    continue

                discovered_links.append(
                    link
                )

            discovered_links = discovered_links[:5]

            automation_results.append(
                {
                    "test":
                        "Dynamic Page Discovery",

                    "status":
                        "PASS",

                    "details":
                        f"{len(discovered_links)} pages discovered."
                }
            )

            # -----------------------------------
            # Internal Navigation Tests
            # -----------------------------------

            for index, link in enumerate(
                discovered_links
            ):

                try:

                    # Login Detection
                    if (
                        "login" in link.lower()
                        or "signin" in link.lower()
                        or "auth" in link.lower()
                    ):

                        automation_results.append(
                            {
                                "test":
                                    f"Navigation {index+1}",

                                "status":
                                    "AUTH_REQUIRED",

                                "reason":
                                    "Authentication is required "
                                    "before automation can continue.",

                                "recommendation":
                                    "Provide test credentials "
                                    "or authenticated session cookies."
                            }
                        )

                        continue

                    page.goto(
                        link,
                        wait_until="domcontentloaded",
                        timeout=8000
                    )

                    screenshot_path = os.path.join(
                        screenshots_folder,
                        f"page_{index+1}.png"
                    )

                    page.screenshot(
                        path=screenshot_path,
                        full_page=True
                    )

                    screenshots.append(
                        screenshot_path
                    )

                    automation_results.append(
                        {
                            "test":
                                f"Navigation {index+1}",

                            "status":
                                "PASS",

                            "details":
                                f"Successfully tested {link}"
                        }
                    )

                except PlaywrightTimeoutError:

                    automation_results.append(
                        {
                            "test":
                                f"Navigation {index+1}",

                            "status":
                                "TIMEOUT",

                            "reason":
                                "The target page exceeded "
                                "the configured timeout limit.",

                            "recommendation":
                                "Increase timeout duration "
                                "or verify website availability."
                        }
                    )

                except Exception as e:

                    error_text = str(e).lower()

                    if (
                        "cloudflare" in error_text
                        or "captcha" in error_text
                        or "blocked" in error_text
                        or "access denied" in error_text
                    ):

                        automation_results.append(
                            {
                                "test":
                                    f"Navigation {index+1}",

                                "status":
                                    "RESTRICTED",

                                "reason":
                                    "This website uses anti-bot "
                                    "protection or security restrictions.",

                                "recommendation":
                                    "Use authenticated sessions "
                                    "or approved testing environments."
                            }
                        )

                    elif (
                        "certificate" in error_text
                        or "ssl" in error_text
                    ):

                        automation_results.append(
                            {
                                "test":
                                    f"Navigation {index+1}",

                                "status":
                                    "RESTRICTED",

                                "reason":
                                    "SSL certificate validation failed.",

                                "recommendation":
                                    "Verify SSL configuration "
                                    "before automation testing."
                            }
                        )

                    else:

                        automation_results.append(
                            {
                                "test":
                                    f"Navigation {index+1}",

                                "status":
                                    "RESTRICTED",

                                "reason":
                                    str(e),

                                "recommendation":
                                    "Manual verification or "
                                    "authenticated testing may be required."
                            }
                        )

            # -----------------------------------
            # Forms Validation
            # -----------------------------------

            forms_count = page.locator(
                "form"
            ).count()

            automation_results.append(
                {
                    "test":
                        "Forms Validation",

                    "status":
                        "PASS"
                        if forms_count > 0
                        else "FAIL",

                    "details":
                        f"{forms_count} forms detected."
                }
            )

            # -----------------------------------
            # Image Validation
            # -----------------------------------

            images_count = page.locator(
                "img"
            ).count()

            automation_results.append(
                {
                    "test":
                        "Image Validation",

                    "status":
                        "PASS"
                        if images_count > 0
                        else "FAIL",

                    "details":
                        f"{images_count} images detected."
                }
            )

        except PlaywrightTimeoutError:

            automation_results.append(
                {
                    "test":
                        "Homepage Accessibility",

                    "status":
                        "TIMEOUT",

                    "reason":
                        "Homepage loading exceeded "
                        "the timeout threshold.",

                    "recommendation":
                        "Increase timeout value or "
                        "verify network connectivity."
                }
            )

        except Exception as e:

            error_text = str(e).lower()

            if (
                "cloudflare" in error_text
                or "captcha" in error_text
            ):

                status = "RESTRICTED"

                reason = (
                    "Anti-bot protection detected."
                )

                recommendation = (
                    "Use approved testing "
                    "environments or "
                    "authenticated sessions."
                )

            elif (
                "login" in error_text
                or "authentication" in error_text
            ):

                status = "AUTH_REQUIRED"

                reason = (
                    "Authentication is required."
                )

                recommendation = (
                    "Provide test credentials "
                    "or session cookies."
                )

            else:

                status = "RESTRICTED"

                reason = str(e)

                recommendation = (
                    "Website restricted automated "
                    "access or browser execution."
                )

            automation_results.append(
                {
                    "test":
                        "Homepage Accessibility",

                    "status":
                        status,

                    "reason":
                        reason,

                    "recommendation":
                        recommendation
                }
            )

        finally:

            browser.close()

    return (
        automation_results,
        screenshots,
        execution_id
    )