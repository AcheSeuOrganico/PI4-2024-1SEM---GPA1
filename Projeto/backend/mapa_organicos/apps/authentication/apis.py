from rest_framework import (
    serializers,
    status,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from django.contrib.auth.models import User

from apps.common.mixins import ApiAuthMixin


class UserLoginApi(TokenObtainPairView):
    pass


class UserRefreshApi(TokenRefreshView):
    pass


class UserVerifyApi(TokenVerifyView):
    pass


#
class UserMeApi(ApiAuthMixin, APIView):
    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = [
                "id",
                "email",
                "is_active",
            ]

    def get(self, request):
        instance = request.user

        serializer = self.OutputSerializer(instance=instance, many=False)
        data = serializer.data

        return Response(data=data, status=status.HTTP_200_OK)