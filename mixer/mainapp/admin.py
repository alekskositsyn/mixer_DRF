from django.contrib import admin
from .models import ProductCatalog, ProductCategory, Product, Review, RatingStar, Rating, ProductImages

admin.site.register(Rating)
admin.site.register(RatingStar)
admin.site.register(ProductImages)
admin.site.register(Product)
@admin.register(ProductCatalog)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "image", "description", "is_active", "slug")
    list_filter = ("name",)
    prepopulated_fields = {"slug": ("name",)}


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "catalog", "image", "description", "is_active", "slug")
    list_filter = ("name",)
    prepopulated_fields = {"slug": ("name",)}


# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ("name", "price", "category", "inventory", "short_desc",
#                     "description", "is_active", "slug")
#     prepopulated_fields = {"slug": ("name",)}


# class ReviewInline(admin.TabularInline):
#     """Отзывы на странице фильма"""
#     model = Review
#     extra = 1
#     readonly_fields = ("name", "email")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    """Отзывы к продукту"""
    list_display = ("name", "email", "parent", "product", "id")
    readonly_fields = ("name", "email")
