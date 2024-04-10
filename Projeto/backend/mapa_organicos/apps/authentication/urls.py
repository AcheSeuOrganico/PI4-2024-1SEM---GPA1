from django.urls import path

from .apis import UserLoginApi, UserRefreshApi, UserVerifyApi, UserMeApi


urlpatterns = [
    path("api/auth/login/", UserLoginApi.as_view(), name="login"),
    path("api/auth/refresh/", UserRefreshApi.as_view(), name="refresh"),
    path("api/auth/verify/", UserVerifyApi.as_view(), name="verify"),
    path("api/auth/me/", UserMeApi.as_view(), name="me"),
]