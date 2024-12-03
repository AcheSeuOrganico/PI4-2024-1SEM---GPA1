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
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User

from apps.common.mixins import ApiAuthMixin
from apps.authentication.services import update_user
from apps.authentication.serializers import (
    RegisterUserSerializer,
    UserTypeSerializer
)
from apps.common.serializers import (
    AddressSerializer,
    ProductSerializer,
    Base64StringField
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
        print(request.data)
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
        description = serializers.CharField(max_length=1024, allow_null=True, allow_blank=True, required=False)
        products = serializers.ListField(child=serializers.CharField(), allow_null=True, required=False)

    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        address_data = {
            'cep': request.data.get('address[cep]'),
            'name': request.data.get('address[name]'),
            'city': request.data.get('address[city]'),
            'state': request.data.get('address[state]'),
            'latitude': request.data.get('address[latitude]'),
            'longitude': request.data.get('address[longitude]'),
            'number': int(request.data.get('address[number]', 0))  
        }
        img = request.data.get('img')
        products = request.data.getlist('products[]')

        missing_address_fields = [field for field, value in address_data.items() if not value]
        if missing_address_fields:
            return Response(status=400, data={'error': f'Missing address fields: {", ".join(missing_address_fields)}'})

        serializer = self.UpdateUserSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            validated_data['address'] = address_data 
            validated_data['img'] = img
            validated_data['products'] = products
            update_user(request.user.id, validated_data)
            return Response(status=200, data=serializer.data)
        print(serializer.errors)
        return Response(status=400, data=serializer.errors)