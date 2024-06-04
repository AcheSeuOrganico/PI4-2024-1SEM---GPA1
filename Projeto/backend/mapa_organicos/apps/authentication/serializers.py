from django.contrib.auth import get_user_model 

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from rest_framework import (
    serializers
)

from apps.authentication.selectors import (
    get_user_type_by_type_id
)
from apps.common.serializers import (
    AddressSerializer
)
from apps.common.services import (
    create_address
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
    
    username = serializers.CharField(max_length=30, validators=[UniqueValidator(queryset=UserModel.objects.all())])
    password = serializers.CharField(max_length=30)
    password2 = serializers.CharField(max_length=30)
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    fantasy_name = serializers.CharField(max_length=255, required=False)
    email = serializers.EmailField()
    address = AddressSerializer()
    user_type = serializers.IntegerField()

    def save(self):
        address = create_address(
            cep=self.validated_data['address']['cep'],
            name=self.validated_data['address']['name'],
            city=self.validated_data['address']['city'],
            state=self.validated_data['address']['state'],
            latitude=self.validated_data['address']['latitude'],
            longitude=self.validated_data['address']['longitude'],
            number=self.validated_data['address']['number']
        )

        user_type = get_user_type_by_type_id(self.validated_data['user_type'])

        user = UserModel.objects.create_user(
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            email=self.validated_data['email'],
            fantasy_name=self.validated_data['fantasy_name'],
            address=address,
            user_type=user_type
        )
        user.set_password(self.validated_data['password'])
        user.full_clean()
        user.save()
        return user