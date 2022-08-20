from django.contrib import admin
from mainapp.models import ProductCategory, Product, Review, RatingStar, Rating

# admin.site.register(ProductCategory)
# admin.site.register(Product)
# admin.site.register(Review)
admin.site.register(Rating)
admin.site.register(RatingStar)


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "is_active", "slug")
    list_filter = ("name",)
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "category", "quantity", "short_desc",
                    "description", "is_active", "slug")
    prepopulated_fields = {"slug": ("name",)}
    


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