import os


def generate_html_report(
        analysis,
        tests,
        summary,
        broken_links):

    os.makedirs(
        "app/reports",
        exist_ok=True
    )

    report_path = (
        "app/reports/report.html"
    )

    html = f"""
    <html>
    <body>

    <h1>TestGenie AI Report</h1>

    <h2>Website</h2>
    <p>{analysis['url']}</p>

    <h2>Health Score</h2>
    <p>{summary['health_score']}%</p>

    <h2>Tests</h2>
    <p>Executed: {summary['tests_executed']}</p>
    <p>Passed: {summary['passed']}</p>
    <p>Failed: {summary['failed']}</p>

    </body>
    </html>
    """

    with open(
            report_path,
            "w",
            encoding="utf-8") as f:
        f.write(html)

    return report_path