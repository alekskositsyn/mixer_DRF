from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django_filters import rest_framework as filters

from mainapp.models import Product


class PaginationProducts(PageNumberPagination):
    page_size = 12
    max_page_size = 4321

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'results': data
        })


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class CategoriesFilter(filters.FilterSet):
    categories = CharFilterInFilter(field_name='category__id', lookup_expr='in')

    class Meta:
        model = Product
        fields = ['categories']


def get_client_ip(request):
    """Получение IP пользователя"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip
