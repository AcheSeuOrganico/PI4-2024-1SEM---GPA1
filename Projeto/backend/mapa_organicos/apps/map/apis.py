from django.shortcuts import render

from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.authentication.models import User
from apps.authentication.serializers import UserTypeSerializer
from apps.common.serializers import AddressSerializer

# Create your views here.


class OrganizationAPIView(APIView):

    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        first_name = serializers.CharField(max_length=255)
        last_name = serializers.CharField(max_length=255)
        fantasy_name = serializers.CharField(max_length=255)
        username = serializers.CharField(max_length=100)
        email = serializers.CharField(max_length=100)
        user_type = UserTypeSerializer()
        address = AddressSerializer()
        description = serializers.CharField(max_length=255)

    def get(self, request, id,*args, **kwargs):
        user = User.objects.filter(
            user_type__type_id__in=[1,2,3],
            id=id
        ).select_related('address', 'user_type')
        serializer = self.OutputSerializer(data=user, many=True)
        serializer.is_valid()      
        return Response(status=200, data=serializer.data)
    


class OrganizationsAPIView(APIView):

    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        fantasy_name = serializers.CharField(max_length=255)
        username = serializers.CharField(max_length=100)
        email = serializers.CharField(max_length=100)
        user_type = UserTypeSerializer()
        address = AddressSerializer()

    def get(self, request, *args, **kwargs):
        users = User.objects.filter(
            user_type__type_id__in=[1,2,3]
        ).select_related('address', 'user_type')
        serializer = self.OutputSerializer(data=users, many=True)
        serializer.is_valid()
        return Response(status=200, data=serializer.data)
