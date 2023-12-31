from django_filters import rest_framework as filters
from .models import Repository, Commit

class RepositoryFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Repository
        fields = ['name']


class CommitFilter(filters.FilterSet):
    repository = filters.CharFilter(method="filter_repository")

    class Meta:
        model = Commit
        fields = ["repository", "author"]

    def filter_repository(self, queryset, name, value):
        query = {"repository__name": value}
        return queryset.filter(**query)
