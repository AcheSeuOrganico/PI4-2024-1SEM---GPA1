from django.urls import path, include

from apps.map.apis import OrganizationAPIView, OrganizationsAPIView

urlpatterns = [
    path('api/organizations/', OrganizationsAPIView.as_view(), name='organizations'),
    path('api/organizations/<id>', OrganizationAPIView.as_view(), name='organizations')
]
