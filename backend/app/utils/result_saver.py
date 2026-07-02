import json
import os


def save_result(result, path):
    file_path = os.path.join(
        path,
        "result.json"
    )

    with open(
        file_path,
        "w",
        encoding="utf-8"
    ) as file:
        json.dump(
            result,
            file,
            indent=4
        )

    return file_path