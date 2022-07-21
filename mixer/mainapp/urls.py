from django.urls import path, re_path
from django.views.decorators.cache import cache_page
import mainapp.views as mainapp


app_name = 'mainapp'

urlpatterns = [
    path('', mainapp.index, name='index'),
    path('api/v1/category/', mainapp.CategoryListView.as_view()),
    path('api/v1/products/<int:pk>/', mainapp.ProductView.as_view()),
    path('api/v1/products/', mainapp.ProductListView.as_view()),
    path('api/v1/review/', mainapp.ReviewCreateView.as_view()),
    path('api/v1/rating/', mainapp.AddStarRatingView.as_view()),
    path('catalog/', mainapp.catalog, name='catalog'),
    re_path(r'^category/(?P<pk>\d+)/products/$',
            mainapp.category_products, name='category_products'),
    re_path(r'^category/(?P<pk>\d+)/products/ajax/$',
            cache_page(3600, key_prefix='mixer')(mainapp.category_products_ajax)),
    re_path(r'^category/(?P<pk>\d+)/products/(?P<page>\d+)/$',
            mainapp.category_products, name='category_products'),
    re_path(r'^category/(?P<pk>\d+)/products/(?P<page>\d+)/ajax/$',
            cache_page(3600, key_prefix='mixer')(mainapp.category_products_ajax)),
    path('contacts/', mainapp.contacts, name='contacts'),
    re_path(r'^product/(?P<pk>\d+)/$', mainapp.product, name='product'),
    re_path(r'^product/detail/(?P<pk>\d+)/async/$',
            mainapp.product_detail_async),
]
