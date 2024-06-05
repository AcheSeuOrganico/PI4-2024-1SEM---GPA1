from django.urls import path, include

from apps.common.apis import ProductsAPIView 

urlpatterns = [
    path("api/products/", ProductsAPIView.as_view(), name="products"),
]
