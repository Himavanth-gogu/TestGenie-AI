def calculate_health_score(results):
    total = len(results)

    passed = len(
        [
            r for r in results
            if r["status"] == "PASS"
        ]
    )

    failed = total - passed

    score = (
        passed / total
    ) * 100 if total else 0

    return {
        "health_score": round(score),
        "tests_executed": total,
        "passed": passed,
        "failed": failed
    }