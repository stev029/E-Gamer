from rest_framework import filters


class QProductWithParam(filters.SearchFilter):
    search_param = 'pid'

    def filter_queryset(self, request, queryset, view):
        queryset = super().filter_queryset(request, queryset, view)
        return queryset.first()