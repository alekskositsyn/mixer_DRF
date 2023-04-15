from django.db import models
from .models import ProductCategory, Product, Review, ProductImages
from .service import get_client_ip, PaginationProducts
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import ProductCategoryListSerializer, ProductListSerializer, ProductSerializer, \
    ProductsReviewsSerializer, ReviewCreateSerializer, CreateRatingSerializer, ReviewSerializer


# Product
class CategoryListView(ListAPIView):
    """Вывод списка категорий"""
    serializer_class = ProductCategoryListSerializer
    queryset = ProductCategory.objects.filter(is_active=True)


class ProductListView(ListAPIView):
    """Вывод списка продуктов"""
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]
    pagination_class = PaginationProducts

    def get_queryset(self):
        products = Product.objects.filter(is_active=True).annotate(
            rating_user=models.Count('ratings', filter=models.Q(
                ratings__ip=get_client_ip(self.request)))
        ).annotate(
            middle_rating=models.Sum(
                models.F('ratings__star')) / models.Count(models.F('ratings'))
        )
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
