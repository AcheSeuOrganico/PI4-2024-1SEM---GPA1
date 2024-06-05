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
from apps.authentication.services import update_user
from apps.authentication.serializers import (
    RegisterUserSerializer,
    UserTypeSerializer
)
from apps.common.serializers import (
    AddressSerializer,
    ProductSerializer
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
        print(serializer.errors)
        return Response(status=400, data=serializer.errors)
    

class UpdateUserApi(ApiAuthMixin, APIView):

    class UpdateUserSerializer(serializers.Serializer):
        first_name = serializers.CharField(max_length=255)
        last_name = serializers.CharField(max_length=255)
        email = serializers.EmailField()
        fantasy_name = serializers.CharField(max_length=255)
        address = AddressSerializer()
        description = serializers.CharField(max_length=1024, allow_null=True, allow_blank=True, required=False)
        products = serializers.ListField(child=serializers.CharField())

    def post(self, request):
        serializer = self.UpdateUserSerializer(data=request.data)
        if serializer.is_valid():
            update_user(request.user.id, serializer.validated_data)
            return Response(status=200, data=serializer.data)
        return Response(status=400, data=serializer.errors)
