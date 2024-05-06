from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model 
from rest_framework import (
    serializers
)
from apps.common.serializers import (
    AddressSerializer
)

UserModel = get_user_model()

class JWTLoginSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        token['user_type'] = user.user_type.type_id
        return token


class UserTypeSerializer(serializers.Serializer):
    type_name = serializers.CharField(max_length=100)
    type_id = serializers.IntegerField()


class RegisterUserSerializer(serializers.Serializer):
    
    username = serializers.CharField(max_length=30)
    password = serializers.CharField(max_length=30)
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    email = serializers.EmailField()
    cep = serializers.CharField(max_length=10)
    address = serializers.CharField(max_length=75)
    latitude = serializers.CharField(max_length=25)
    longitude = serializers.CharField(max_length=75)


    def save(self):
        user = UserModel.objects.create_user(
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            email=self.validated_data['email'],
        )
        user.set_password(self.validated_data['password'])
        user.save()
        return user