from rest_framework import mixins, generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from datetime import datetime

from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer
from .services.github import GithubAPI


class CommitView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Commit.objects.all()
    serializer_class = CommitSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return self.list(request)

    def store_commits(self, commits, repository_id):
        try:
            for commit in commits:
                message = commit['commit']['message']
                sha = commit['sha']
                author = commit['commit']['author']['name']
                date_str = commit['commit']['author']['date']
                url = commit['url']

                date = datetime.strptime(date_str, '%Y-%m-%dT%H:%M:%SZ')

                commit_instance = Commit(
                    message = message,
                    sha = sha,
                    author = author,
                    date = date,
                    url = url,
                    repository_id = repository_id
                )

                commit_instance.save()

            return Response({ "message": "created"}, status=status.HTTP_201_CREATED)

        except Exception as error:
            return Response({"error": "Failed to store commits. Please try again."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RepositoryView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return self.list(request)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        repository_name = serializer.validated_data.get('name')
        user = request.user
        repository = GithubAPI().find_repository(user, repository_name)
        commits = GithubAPI().get_commits(user, repository_name)

        try:
            if 'id' in repository:
                already_exists = self.check_if_repository_is_already_in_database(repository_name)

                if already_exists == True:
                    return Response({"message": "Repository already exists."}, status=status.HTTP_200_OK)

                new_repository = Repository()
                new_repository.name = repository_name

                new_repository.save()

                if len(commits) > 0:
                    commit_view = CommitView()

                    commit_view.store_commits(commits, new_repository.id)

                return Response({ "message": "created"}, status=status.HTTP_201_CREATED)

            return Response({"error": "Repository not found."}, status=status.HTTP_409_CONFLICT)

        except Exception as e:
            return Response({"error": "Failed to create commits. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def check_if_repository_is_already_in_database(self, repository_name):
        try:
            existing_repository = Repository.objects.filter(name=repository_name).first()

            if existing_repository:
                return True

            return False
        except Exception as e:
            return Response({"error": "Failed to check if repository exists. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
