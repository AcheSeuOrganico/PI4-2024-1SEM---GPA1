from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import (
    serializers
)
import base64

from apps.common.models import Products, Address
from apps.common.services import create_address

class AddressSerializer(serializers.Serializer):
    cep = serializers.CharField(max_length=10)
    name = serializers.CharField(max_length=75)
    city = serializers.CharField(max_length=255)
    state = serializers.CharField(max_length=2)
    latitude = serializers.CharField(max_length=25)
    longitude = serializers.CharField(max_length=75)
    number = serializers.CharField(max_length=100)

    def save(self):
        return create_address(
            cep=self.validated_data['cep'],
            name=self.validated_data['name'],
            city=self.validated_data['city'],
            state=self.validated_data['state'],
            latitude=self.validated_data['latitude'],
            longitude=self.validated_data['longitude'],
            number=self.validated_data['number']
        )


class Base64StringField(serializers.Field):
    def to_representation(self, value):
        if value is None:
            return value
        return base64.b64encode(value).decode('utf-8')

    def to_internal_value(self, data):
        try:
            return base64.b64decode(data)
        except TypeError:
            self.fail('invalid')

class ProductSerializer(serializers.ModelSerializer):  # Use ModelSerializer for related models
    class Meta:
        model = Products
        fields = ['id', 'product_id', 'name', 'icon']