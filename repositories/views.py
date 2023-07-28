from rest_framework import mixins, generics
from rest_framework.permissions import IsAuthenticated

from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer


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
        return self.create(request)
