from rest_framework import mixins, generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters import rest_framework as filters
from datetime import datetime
from django.db import transaction

from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer
from .services.github import GithubAPI
from .filters import CommitFilter, RepositoryFilter


class CommitView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Commit.objects.all()
    serializer_class = CommitSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CommitFilter


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
                avatar = ''

                if commit['author'] != None :
                    avatar = commit['author']['avatar_url']

                date = datetime.strptime(date_str, '%Y-%m-%dT%H:%M:%SZ')

                commit_instance = Commit(
                    message = message,
                    sha = sha,
                    author = author,
                    date = date,
                    url = url,
                    repository_id = repository_id,
                    avatar = avatar,
                )

                commit_instance.save()

            return Response({ "message": "Commits added successfully!"}, status=status.HTTP_201_CREATED)

        except Exception as error:
            return Response({"error": "Failed to store commits. Please try again."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def check_for_new_commits(self, owner, repository_name, repository_id):
        remote_repository_commits = GithubAPI().get_commits(owner, repository_name)
        database_commits =  Commit.objects.filter(repository_id=repository_id)

        remote_commit_shas = {commit['sha'] for commit in remote_repository_commits}
        database_commit_shas = {commit.sha for commit in database_commits}

        new_commit_shas = remote_commit_shas - database_commit_shas

        new_commits = [commit for commit in remote_repository_commits if commit['sha'] in new_commit_shas]

        return new_commits


class RepositoryView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer
    permission_classes = [IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = RepositoryFilter


    def get(self, request):
        return self.list(request)


    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        repository_name = serializer.validated_data.get('name')
        user = request.user
        github_api = GithubAPI()

        try:
            remote_repository = github_api.find_repository(user, repository_name)
            remote_commits = github_api.get_commits(user, repository_name)

            if 'id' in remote_repository:
                repository_in_database = self.check_if_repository_is_already_in_database(repository_name)

                if repository_in_database != None:
                    new_commits = CommitView().check_for_new_commits(user, repository_name, repository_in_database.id)

                    if not new_commits:
                        return Response({"message": "Repository and it's commits already exists at the database."}, status=status.HTTP_200_OK)

                    with transaction.atomic():
                        CommitView().store_commits(new_commits, repository_in_database.id)

                    return Response({ "message": "New commits from repository added successfuly!" }, status=status.HTTP_201_CREATED)

                with transaction.atomic():
                    new_repository = Repository.objects.create(name=repository_name)

                    if remote_commits:
                        CommitView().store_commits(remote_commits, new_repository.id)

                return Response({ "message": "Repository added successfully!"}, status=status.HTTP_201_CREATED)

            return Response({"error": "Repository not found."}, status=status.HTTP_409_CONFLICT)

        except Exception as e:
            return Response({"error": "Failed to create commits. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def check_if_repository_is_already_in_database(self, repository_name):
        try:
            existing_repository = Repository.objects.filter(name=repository_name).first()

            if existing_repository:
                return existing_repository

            return None
        except Exception as e:
            return Response({"error": "Failed to check if repository exists. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
