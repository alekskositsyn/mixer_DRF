from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('api/v1/', include('mainapp.urls', namespace='mainapp')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/', include('authapp.urls', namespace='authapp')),
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

    # import debug_toolbar

    # urlpatterns += [re_path(r'^__debug__/', include(debug_toolbar.urls))]
