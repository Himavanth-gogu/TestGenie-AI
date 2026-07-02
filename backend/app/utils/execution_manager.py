import os
from datetime import datetime


def create_execution_folder():
    execution_id = datetime.now().strftime(
        "%Y%m%d_%H%M%S"
    )

    base_path = os.path.join(
        "app",
        "executions",
        execution_id
    )

    screenshots_path = os.path.join(
        base_path,
        "screenshots"
    )

    os.makedirs(
        screenshots_path,
        exist_ok=True
    )

    return {
        "execution_id": execution_id,
        "base_path": base_path,
        "screenshots_path": screenshots_path
    }