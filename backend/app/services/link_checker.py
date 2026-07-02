import requests
from bs4 import BeautifulSoup


def check_broken_links(url):
    broken_links = []

    try:
        response = requests.get(url, timeout=5)

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        links = soup.find_all("a")

        # Limit to first 10 links for fast execution
        links = links[:10]

        for link in links:
            href = link.get("href")

            if href and href.startswith("http"):
                try:
                    r = requests.get(
                        href,
                        timeout=3
                    )

                    if r.status_code == 404:
                        broken_links.append({
                            "url": href,
                            "status": "Broken Link",
                            "status_code": 404
                        })

                    elif r.status_code == 403:
                        broken_links.append({
                            "url": href,
                            "status": "Access Restricted",
                            "status_code": 403
                        })

                    elif r.status_code == 429:
                        broken_links.append({
                            "url": href,
                            "status": "Rate Limited",
                            "status_code": 429
                        })

                    elif r.status_code >= 500:
                        broken_links.append({
                            "url": href,
                            "status": "Server Error",
                            "status_code": r.status_code
                        })

                except Exception:
                    broken_links.append({
                        "url": href,
                        "status": "Connection Failed",
                        "status_code": "FAILED"
                    })

    except Exception:
        pass

    return broken_links