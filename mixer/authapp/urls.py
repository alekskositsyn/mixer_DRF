from django.urls import path, include
import authapp.views as authapp
from django.views.generic import TemplateView



app_name = 'authapp'

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
]
