from django.urls import path, include

from apps.map.apis import (
    OrganizationAPIView, 
    OrganizationsAPIView,
    OrganizationsAPIViewV2,
    OrganizationAPIViewV2
)

urlpatterns = [
    path('api/organizations/', OrganizationsAPIView.as_view(), name='organizations'),
    path('api/organizations/<id>', OrganizationAPIView.as_view(), name='organizations'),

    path('api/v2/organizations/', OrganizationsAPIViewV2.as_view(), name='organizations'),
    path('api/v2/organization/<id>', OrganizationAPIViewV2.as_view(), name='organizations'),
    path('api/v2/organizations/<id>', OrganizationAPIViewV2.as_view(), name='organizations')
]
