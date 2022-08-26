from django.urls import path
from django.views.decorators.cache import cache_page
import mainapp.views as mainapp


app_name = 'mainapp'

urlpatterns = [
    path('', mainapp.index, name='index'),
    path('category/', mainapp.CategoryListView.as_view()),
    path('products/<int:pk>/', mainapp.ProductView.as_view()),
    path('products/', mainapp.ProductListView.as_view()),
    path('review/', mainapp.ReviewCreateView.as_view()),
    path('product/reviews/<int:pk>/', mainapp.ProductsReviewsView.as_view()),
    path('rating/', mainapp.AddStarRatingView.as_view()),
]
