from rest_framework import mixins, generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer
from .services.Github import find_repository


class CommitView(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = Commit.objects.all()
    serializer_class = CommitSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return self.list(request)


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
        repository = find_repository(user, repository_name)

        if 'id' in repository:
            return self.create(request)

        return Response({"error": "Repository not found."}, status=status.HTTP_409_CONFLICT)
