from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)


def generate_pdf_report(
        analysis,
        tests,
        summary,
        broken_links):

    path = (
        "app/reports/report.pdf"
    )

    doc = SimpleDocTemplate(path)

    styles = getSampleStyleSheet()

    story = []

    story.append(
        Paragraph(
            "TestGenie AI Report",
            styles["Title"]
        )
    )

    story.append(
        Paragraph(
            f"Website: {analysis['url']}",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"Health Score: "
            f"{summary['health_score']}%",
            styles["Normal"]
        )
    )

    doc.build(story)

    return path