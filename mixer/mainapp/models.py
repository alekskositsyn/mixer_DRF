from django.db import models
from django.db.models.signals import pre_save

from .service import pre_save_receiver


class ProductCategory(models.Model):
    """Модель категорий продуктов"""
    name = models.CharField('имя категории', max_length=64)
    description = models.TextField('описание категории', blank=True)
    is_active = models.BooleanField(
        verbose_name='активна', default=True, db_index=True)
    slug = models.SlugField(
        verbose_name='URL', max_length=130, unique=True, db_index=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class Product(models.Model):
    """Модель продуктов"""
    category = models.ForeignKey(ProductCategory,
                                 on_delete=models.CASCADE,
                                 verbose_name='категория продукта')
    name = models.CharField('имя продукта', max_length=128)
    image = models.ImageField(upload_to='products_images', blank=True)
    short_desc = models.CharField(
        verbose_name='краткое описание продукта', max_length=64, blank=True)
    description = models.TextField(
        verbose_name='описание продукта', blank=True)
    price = models.DecimalField(
        verbose_name='цена продукта', max_digits=8, decimal_places=0, default=0)
    inventory = models.PositiveIntegerField(
        verbose_name='количество товара на складе', default=0)
    is_active = models.BooleanField(
        verbose_name='активна', default=True, db_index=True)
    slug = models.SlugField(
        verbose_name='URL', max_length=130, unique=True, db_index=True)

    def __str__(self):
        return f'{self.name} ({self.category.name})'

    @staticmethod
    def get_active_items():
        return Product.objects.select_related().filter(category__is_active=True, is_active=True)

    class Meta:
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"


# pre_save.connect(pre_save_receiver, sender=None)


class RatingStar(models.Model):
    """Звезда рейтинга"""
    value = models.SmallIntegerField("Значение", default=0)

    def __str__(self):
        return f'{self.value}'

    class Meta:
        verbose_name = "Звезда рейтинга"
        verbose_name_plural = "Звезды рейтинга"
        ordering = ["-value"]


class Rating(models.Model):
    """Рейтинг"""
    ip = models.CharField("IP адрес", max_length=15)
    star = models.ForeignKey(
        RatingStar, on_delete=models.CASCADE, verbose_name="звезда")
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        verbose_name="продукт",
        related_name="ratings"
    )

    def __str__(self):
        return f"{self.star} - {self.product}"

    class Meta:
        verbose_name = "Рейтинг"
        verbose_name_plural = "Рейтинги"


class Review(models.Model):
    """Отзывы"""
    email = models.EmailField()
    name = models.CharField("Имя", max_length=100)
    text = models.TextField("Сообщение", max_length=5000)
    parent = models.ForeignKey(
        'self', verbose_name="Родитель", on_delete=models.SET_NULL, blank=True, null=True, related_name="children"
    )
    product = models.ForeignKey(
        Product, verbose_name="Продукт", on_delete=models.CASCADE, related_name="reviews")

    def __str__(self):
        return f"{self.name} - {self.product}"

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
