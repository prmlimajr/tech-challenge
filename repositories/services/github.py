from datetime import datetime, timedelta
import requests

class GithubAPI:
    GITHUB_API_BASE_URL = 'https://api.github.com'

    def find_repository(self, owner, repository):
        try:
            response = requests.get(f'{self.GITHUB_API_BASE_URL}/repos/{owner}/{repository}')
            return response.json()

        except requests.exceptions.RequestException as error:
            print(f"Error occurred while trying to fetch the repository: {error}")
            return error

    def get_commits(self, owner, repository):
        current_date = datetime.now().date()
        date_30_days_ago = current_date - timedelta(days=30)

        try:
            response = requests.get(f'{self.GITHUB_API_BASE_URL}/repos/{owner}/{repository}/commits?since={date_30_days_ago}')
            return response.json()

        except requests.exceptions.RequestException as error:
            print(f'Error occurred while trying to fetch the commits: {error}')
            return error
