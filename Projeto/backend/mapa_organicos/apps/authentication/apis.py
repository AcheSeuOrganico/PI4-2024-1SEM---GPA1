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
from apps.authentication.serializers import (
    RegisterUserSerializer
)

class UserLoginApi(TokenObtainPairView):
    pass


class UserRefreshApi(TokenRefreshView):
    pass


class UserVerifyApi(TokenVerifyView):
    pass


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


class RegisterUserApi(APIView):

    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        return Response(status=400, data=serializer.errors)
