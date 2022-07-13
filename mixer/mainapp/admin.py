from django.contrib import admin
from mainapp.models import ProductCategory, Product, Review, RatingStar,Rating

admin.site.register(ProductCategory)
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Rating)
admin.site.register(RatingStar)
