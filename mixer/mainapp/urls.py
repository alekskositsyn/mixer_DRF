from django.urls import path
from django.views.decorators.cache import cache_page
import mainapp.views as mainapp


app_name = 'mainapp'

urlpatterns = [
    path('', mainapp.index, name='index'),
    path('api/v1/category/', mainapp.CategoryListView.as_view()),
    path('api/v1/products/<int:pk>/', mainapp.ProductView.as_view()),
    path('products/', mainapp.ProductListView.as_view()),
    path('api/v1/review/', mainapp.ReviewCreateView.as_view()),
    path('api/v1/product/reviews/<int:pk>/', mainapp.ProductsReviewsView.as_view()),
    path('api/v1/rating/', mainapp.AddStarRatingView.as_view()),
    path('catalog/', mainapp.catalog, name='catalog'),
]
