from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', include('apps.authentication.urls')),
    path('', include('apps.map.urls')),
    path('', include('apps.common.urls')),
]
