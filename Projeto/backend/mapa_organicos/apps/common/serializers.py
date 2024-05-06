from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import (
    serializers
)


class AddressSerializer(serializers.Serializer):
    cep = serializers.CharField(max_length=10)
    name = serializers.CharField(max_length=75)
    latitude = serializers.CharField(max_length=25)
    longitude = serializers.CharField(max_length=75)
    number = serializers.IntegerField()
