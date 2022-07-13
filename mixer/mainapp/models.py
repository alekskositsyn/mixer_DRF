from django.db import models


class ProductCategory(models.Model):
    name = models.CharField('имя категории', max_length=64)
    description = models.TextField('описание категории', blank=True)
    is_active = models.BooleanField(
        verbose_name='активна', default=True, db_index=True)

    def __str__(self):
        return f'{self.name}'


class Product(models.Model):
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
    quantity = models.PositiveIntegerField(
        verbose_name='количество товара', default=0)
    is_active = models.BooleanField(
        verbose_name='активна', default=True, db_index=True)
    url = models.SlugField(max_length=130, unique=True)

    def __str__(self):
        return f'{self.name} ({self.category.name})'

    @staticmethod
    def get_active_items():
        return Product.objects.select_related().filter(category__is_active=True, is_active=True)




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
        return f"{self.name} - {self.movie}"

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
