import requests

default_headers = {
    "accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
}
default_timeout = 100

def find_repository(owner, repo):
    try:
        response = requests.get(f'https://api.github.com/repos/{owner}/{repo}', headers = default_headers)

        return response.json()

    except requests.exceptions.RequestException as error:
        print(f"Error occurred while trying to fetch the repository: {error}")
        return error
