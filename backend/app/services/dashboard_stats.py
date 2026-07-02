import json
import os
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

DATA_FOLDER = os.path.join(
    BASE_DIR,
    "data"
)

os.makedirs(
    DATA_FOLDER,
    exist_ok=True
)

STATS_FILE = os.path.join(
    DATA_FOLDER,
    "dashboard_stats.json"
)


def initialize_dashboard_stats():
    """
    Create dashboard stats file if missing
    """

    if not os.path.exists(STATS_FILE):

        default_stats = {
            "total_executions": 0,
            "total_passed": 0,
            "total_failed": 0,
            "reports_generated": 0,
            "screenshots_captured": 0,
            "average_health_score": 0,
            "last_execution": None,
            "execution_history": []
        }

        with open(
            STATS_FILE,
            "w"
        ) as f:
            json.dump(
                default_stats,
                f,
                indent=4
            )


def get_dashboard_stats():
    """
    Read dashboard statistics
    """

    initialize_dashboard_stats()

    with open(
        STATS_FILE,
        "r"
    ) as f:
        return json.load(f)


def save_dashboard_stats(stats):
    """
    Save dashboard statistics
    """

    with open(
        STATS_FILE,
        "w"
    ) as f:
        json.dump(
            stats,
            f,
            indent=4
        )


def update_dashboard_stats(
    website,
    summary,
    screenshots,
    execution_time
):
    """
    Update dashboard statistics
    after every successful execution
    """

    stats = get_dashboard_stats()

    stats["total_executions"] += 1

    stats["total_passed"] += summary.get(
        "passed",
        0
    )

    stats["total_failed"] += summary.get(
        "failed",
        0
    )

    stats["reports_generated"] += 2

    stats["screenshots_captured"] += len(
        screenshots
    )

    stats["last_execution"] = datetime.now().strftime(
        "%Y-%m-%d %H:%M:%S"
    )

    history_item = {
        "execution_number":
            stats["total_executions"],

        "website":
            website,

        "health_score":
            summary.get(
                "health_score",
                0
            ),

        "passed":
            summary.get(
                "passed",
                0
            ),

        "failed":
            summary.get(
                "failed",
                0
            ),

        "screenshots":
            len(
                screenshots
            ),

        "execution_time":
            execution_time,

        "timestamp":
            stats["last_execution"]
    }

    stats["execution_history"].append(
        history_item
    )

    total_score = 0

    for item in stats["execution_history"]:
        total_score += item["health_score"]

    stats["average_health_score"] = round(
        total_score /
        len(
            stats["execution_history"]
        ),
        2
    )

    save_dashboard_stats(
        stats
    )

    return stats


def reset_dashboard_stats():
    """
    Reset dashboard statistics
    """

    if os.path.exists(
        STATS_FILE
    ):
        os.remove(
            STATS_FILE
        )

    initialize_dashboard_stats()