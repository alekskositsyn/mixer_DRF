from django.urls import path
from django.views.decorators.cache import cache_page
import mainapp.views as mainapp


app_name = 'mainapp'

urlpatterns = [
    path('catalog/', mainapp.CatalogListView.as_view()),
    # path('catalog/<int:pk>/', mainapp.ProductsCatalogListView.as_view()),
    path('category/<int:pk>/', mainapp.CategoryListView.as_view()),
    path('products/<int:pk>/', mainapp.ProductView.as_view()),
    path('catalog/<int:pk>/products/', mainapp.ProductListView.as_view()),
    path('review/', mainapp.ReviewCreateView.as_view()),
    path('product/reviews/<int:pk>/', mainapp.ProductsReviewsView.as_view()),
    path('rating/', mainapp.AddStarRatingView.as_view()),
    path('search/', mainapp.SearchProductByName.as_view())
]
