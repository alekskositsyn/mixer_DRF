from rest_framework import serializers
from .models import Product, ProductCategory, Rating, Review


class ProductCategoryListSerializer(serializers.ModelSerializer):
    """Список категорий продуктов"""

    class Meta:
        model = ProductCategory
        fields = ('id','name')


class FilterReviewListSerializer(serializers.ListSerializer):
    """Фильтр комментариев, только parents"""

    def to_representation(self, data):
        data = data.filter(parent=None)
        return super().to_representation(data)


class RecursiveSerializer(serializers.Serializer):
    """Вывод рекурсивно children"""

    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class ReviewCreateSerializer(serializers.ModelSerializer):
    """Добавление отзывов"""

    class Meta:
        model = Review
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    """Вывод отзывов"""
    children = RecursiveSerializer(many=True)

    class Meta:
        list_serializer_class = FilterReviewListSerializer
        model = Review
        fields = ('id', 'name', 'product', 'text', 'children')


class ProductsReviewsSerializer(serializers.ModelSerializer):
    """Вывод отзывов"""
    children = RecursiveSerializer(many=True)

    class Meta:
        list_serializer_class = FilterReviewListSerializer
        model = Review
        fields = ('id', 'name', 'product', 'text', 'children')


class ProductSerializer(serializers.ModelSerializer):
    """Список категорий продуктов"""
    category = serializers.SlugRelatedField(slug_field='name', read_only=True)
    reviews = ReviewSerializer(many=True)

    class Meta:
        model = Product
        exclude = ('is_active',)


class ProductListSerializer(serializers.ModelSerializer):
    """Список продуктов"""
    rating_user = serializers.BooleanField()
    middle_rating = serializers.IntegerField()

    class Meta:
        model = Product
        exclude = ('is_active',)


class CreateRatingSerializer(serializers.ModelSerializer):
    """Добавление рейтинга пользователем"""
    class Meta:
        model = Rating
        fields = ("star", "product")

    def create(self, validated_data):
        rating, _ = Rating.objects.update_or_create(
            ip=validated_data.get('ip', None),
            product=validated_data.get('product', None),
            defaults={'star': validated_data.get("star")}
        )
        return rating
