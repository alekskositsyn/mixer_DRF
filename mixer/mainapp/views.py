from django.db import models
from django_filters.rest_framework import DjangoFilterBackend
from .models import ProductCategory, Product, Review, ProductCatalog
from .service import get_client_ip, PaginationProducts, CategoriesFilter
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import ProductCategoryListSerializer, ProductListSerializer, ProductSerializer, \
    ProductsReviewsSerializer, ReviewCreateSerializer, CreateRatingSerializer, ReviewSerializer, \
    ProductCatalogListSerializer


# Product
class CategoryListView(ListAPIView):
    """Вывод списка категорий"""
    serializer_class = ProductCategoryListSerializer

    # queryset = ProductCategory.objects.filter(is_active=True)

    def get_queryset(self):
        catalog_id = self.kwargs.get('pk')
        categories = ProductCategory.objects.filter(catalog=catalog_id)
        return categories


class CatalogListView(ListAPIView):
    """Вывод списка каталогов"""
    serializer_class = ProductCatalogListSerializer
    queryset = ProductCatalog.objects.filter(is_active=True)


class ProductListView(ListAPIView):
    """Вывод списка продуктов"""
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]
    pagination_class = PaginationProducts
    filter_backends = (DjangoFilterBackend,)
    filterset_class = CategoriesFilter

    def get_queryset(self):
        catalog_id = self.kwargs.get('pk')
        products = Product.objects.filter(is_active=True).annotate(
            rating_user=models.Count('ratings', filter=models.Q(
                ratings__ip=get_client_ip(self.request)))
        ).annotate(
            middle_rating=models.Sum(
                models.F('ratings__star')) / models.Count(models.F('ratings'))
        )

        if catalog_id != 0:
            catalog = get_object_or_404(ProductCatalog, id=catalog_id)
            categories = ProductCategory.objects.filter(catalog=catalog)
            products = products.filter(category__in=categories)

        return products


class ProductView(RetrieveAPIView):
    """Вывод продукта"""
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer


# Review
class ReviewListView(ListAPIView):
    """Вывод отзывов"""
    serializer_class = ReviewSerializer


class ProductsReviewsView(ListAPIView):
    """Вывод отзывов продукта"""
    serializer_class = ProductsReviewsSerializer

    def get_queryset(self):
        product_id = self.kwargs.get('pk')
        queryset = Review.objects.filter(product=product_id)
        return queryset


class ReviewCreateView(CreateAPIView):
    """Добавление отзыва"""
    serializer_class = ReviewCreateSerializer


class AddStarRatingView(CreateAPIView):
    """Добавление рейтинга к продукту"""
    serializer_class = CreateRatingSerializer

    def perform_create(self, serializer):
        serializer.save(ip=get_client_ip(self.request))
