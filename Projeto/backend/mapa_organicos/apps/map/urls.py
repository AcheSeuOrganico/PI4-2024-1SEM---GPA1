from django.urls import path, include

from apps.map.apis import OrganizationAPIView

urlpatterns = [
    path('api/organizations/', OrganizationAPIView.as_view(), name='organizations')
]
