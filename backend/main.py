from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

import traceback
import time
import os
import json
from datetime import datetime

# Services
from app.services.analyzer import analyze_website
from app.services.link_checker import check_broken_links
from app.services.health_score import calculate_health_score
from app.services.report_generator import generate_html_report
from app.services.pdf_report_generator import generate_pdf_report
from app.services.test_generator import generate_test_cases
from app.services.dashboard_stats import (
    get_dashboard_stats,
    update_dashboard_stats
)

# Automation
from app.automation.executor import execute_tests


app = FastAPI(
    title="TestGenie AI",
    description="AI Powered QA Automation Platform",
    version="2.0.0"
)

os.makedirs("app/executions", exist_ok=True)
os.makedirs("app/reports", exist_ok=True)
os.makedirs("app/data", exist_ok=True)

# ---------------------------------------------------
# Static Files
# ---------------------------------------------------

app.mount(
    "/executions",
    StaticFiles(directory="app/executions"),
    name="executions"
)

app.mount(
    "/reports",
    StaticFiles(directory="app/reports"),
    name="reports"
)

# ---------------------------------------------------
# CORS
# ---------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# ---------------------------------------------------
# Request Model
# ---------------------------------------------------

class URLRequest(BaseModel):
    url: str


# ---------------------------------------------------
# Home
# ---------------------------------------------------

@app.get("/")
def home():
    return {
        "application": "TestGenie AI",
        "status": "running",
        "version": "2.0.0"
    }


# ---------------------------------------------------
# Analyze Website
# ---------------------------------------------------

@app.post("/analyze")
def analyze(request: URLRequest):

    try:

        url = request.url.strip()

        if not url.startswith(
            ("http://", "https://")
        ):
            url = "https://" + url

        start_time = time.time()

        print(
            f"\nStarting analysis -> {url}"
        )

        # ------------------------------------
        # Website Analysis
        # ------------------------------------

        analysis = analyze_website(url)

        # ------------------------------------
        # Restricted Site Handling
        # ------------------------------------

        if "error" in analysis:

            error_text = str(
                analysis["error"]
            ).lower()

            if "timeout" in error_text:

                status = "TIMEOUT"
                reason = (
                    "The website exceeded "
                    "the configured timeout."
                )

                recommendation = (
                    "Increase timeout "
                    "or verify availability."
                )

            elif (
                "ssl" in error_text
                or "certificate" in error_text
            ):

                status = "RESTRICTED"

                reason = (
                    "SSL certificate "
                    "validation failed."
                )

                recommendation = (
                    "Verify SSL "
                    "configuration."
                )

            elif (
                "cloudflare" in error_text
                or "captcha" in error_text
                or "blocked" in error_text
                or "access denied" in error_text
            ):

                status = "RESTRICTED"

                reason = (
                    "Anti-bot protection "
                    "blocked automation."
                )

                recommendation = (
                    "Use authenticated "
                    "sessions or approved "
                    "testing environments."
                )

            elif (
                "login" in error_text
                or "authentication" in error_text
            ):

                status = "AUTH_REQUIRED"

                reason = (
                    "Authentication "
                    "is required."
                )

                recommendation = (
                    "Provide credentials "
                    "or session cookies."
                )

            else:

                status = "RESTRICTED"

                reason = analysis["error"]

                recommendation = (
                    "Website restricted "
                    "automated access."
                )

            return {
                "success": True,
                "execution_id": None,
                "execution_time_seconds": 0,
                "analysis": {},
                "generated_tests": [],
                "automation_results": [
                    {
                        "test": "Website Accessibility",
                        "status": status,
                        "reason": reason,
                        "recommendation": recommendation
                    }
                ],
                "summary": {
                    "health_score": 0,
                    "tests_executed": 1,
                    "passed": 0,
                    "failed": 1
                },
                "broken_links": [],
                "screenshots": [],
                "reports": {
                    "html_report": None,
                    "pdf_report": None
                }
            }

        # ------------------------------------
        # Generate Test Cases
        # ------------------------------------

        generated_tests = generate_test_cases(
            analysis
        )

        # ------------------------------------
        # Execute Automation
        # ------------------------------------

        (
            automation_results,
            screenshots,
            execution_id
        ) = execute_tests(url)

        # ------------------------------------
        # Screenshot URLs
        # ------------------------------------

        screenshot_urls = []

        for path in screenshots:

            normalized = path.replace(
                "\\",
                "/"
            )

            if "app/executions/" in normalized:

                relative = normalized.split(
                    "app/"
                )[1]

                screenshot_urls.append(
                    f"http://127.0.0.1:8000/{relative}"
                )

        # ------------------------------------
        # Broken Links
        # ------------------------------------

        broken_links = check_broken_links(
            url
        )

        # ------------------------------------
        # Health Score
        # ------------------------------------

        summary = calculate_health_score(
            automation_results
        )

        # ------------------------------------
        # Reports
        # ------------------------------------

        html_report = generate_html_report(
            analysis=analysis,
            tests=automation_results,
            summary=summary,
            broken_links=broken_links
        )

        pdf_report = generate_pdf_report(
            analysis=analysis,
            tests=automation_results,
            summary=summary,
            broken_links=broken_links
        )

        execution_time = round(
            time.time() - start_time,
            2
        )

        # ------------------------------------
        # Save Execution History
        # ------------------------------------

        history_file = os.path.join(
            "app",
            "data",
            "executions_history.json"
        )

        execution_record = {
            "execution_id": execution_id,
            "url": url,
            "health_score": summary["health_score"],
            "tests_executed": summary["tests_executed"],
            "passed": summary["passed"],
            "failed": summary["failed"],
            "screenshots": len(screenshot_urls),
            "execution_time": execution_time,
            "created_at": datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"
            )
        }

        try:
            os.makedirs(
                "app/data",
                exist_ok=True
            )

            if os.path.exists(history_file):
                with open(
                    history_file,
                    "r"
                ) as f:
                    history_data = json.load(f)
            else:
                history_data = []

            history_data.insert(
                0,
                execution_record
            )

            with open(
                history_file,
                "w"
            ) as f:
                json.dump(
                    history_data,
                    f,
                    indent=4
                )

        except Exception as history_error:
            print(
                "History Save Error:",
                history_error
            )

        # ------------------------------------
        # Dashboard Stats
        # ------------------------------------

        update_dashboard_stats(
            website=url,
            summary=summary,
            screenshots=screenshot_urls,
            execution_time=execution_time
        )

        return {
            "success": True,
            "execution_id": execution_id,
            "execution_time_seconds": execution_time,
            "analysis": analysis,
            "generated_tests": generated_tests,
            "automation_results": automation_results,
            "summary": summary,
            "broken_links": broken_links,
            "screenshots": screenshot_urls,
            "reports": {
                "html_report": html_report,
                "pdf_report": pdf_report
            }
        }

    except Exception as e:

        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# ---------------------------------------------------
# Dashboard Stats
# ---------------------------------------------------

@app.get("/dashboard/stats")
def dashboard_stats():
    return get_dashboard_stats()


# ---------------------------------------------------
# History API
# ---------------------------------------------------

@app.get("/dashboard/history")
def get_execution_history():

    history_file = os.path.join(
        "app",
        "data",
        "executions_history.json"
    )

    if not os.path.exists(history_file):
        return []

    with open(
        history_file,
        "r"
    ) as f:
        return json.load(f)


# ---------------------------------------------------
# Download HTML Report
# ---------------------------------------------------

@app.get("/download/html")
def download_html():

    path = os.path.join(
        "app",
        "reports",
        "report.html"
    )

    if not os.path.exists(path):
        raise HTTPException(
            status_code=404,
            detail="HTML report not found"
        )

    return FileResponse(
        path,
        media_type="text/html",
        filename="TestGenie_Report.html"
    )


# ---------------------------------------------------
# Download PDF Report
# ---------------------------------------------------

@app.get("/download/pdf")
def download_pdf():

    path = os.path.join(
        "app",
        "reports",
        "report.pdf"
    )

    if not os.path.exists(path):
        raise HTTPException(
            status_code=404,
            detail="PDF report not found"
        )

    return FileResponse(
        path,
        media_type="application/pdf",
        filename="TestGenie_Report.pdf"
    )