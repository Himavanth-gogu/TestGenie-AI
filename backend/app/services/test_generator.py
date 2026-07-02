def generate_test_cases(analysis):
    tests = []

    tests.append(
        "Homepage loads successfully"
    )

    if analysis["links"] > 0:
        tests.append(
            "Navigation links exist"
        )

    if analysis["forms"] > 0:
        tests.append(
            "Form validation test"
        )

    if analysis["images"] > 0:
        tests.append(
            "Image loading test"
        )

    return tests