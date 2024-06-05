from django.shortcuts import render

from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.authentication.models import User
from apps.authentication.serializers import UserTypeSerializer
from apps.common.serializers import AddressSerializer, ProductSerializer
from apps.common.models import Products

# Create your views here.


class OrganizationAPIView(APIView):
    class OutputSerializer(serializers.ModelSerializer):
        user_type = UserTypeSerializer()
        address = AddressSerializer()
        products = ProductSerializer(many=True) 

        class Meta:
            model = User
            fields = ['id', 'first_name', 'last_name', 'description', 'fantasy_name', 'username', 'email', 'user_type', 'address', 'products', 'img']

    def get(self, request, id, *args, **kwargs):
        user = User.objects.filter(
            user_type__type_id__in=[1,2,3],
            id=id
        ).select_related('address', 'user_type')
        serializer = self.OutputSerializer(user, many=True) 
        return Response(status=200, data=serializer.data)
    



class OrganizationsAPIView(APIView):
    class OutputSerializer(serializers.ModelSerializer):
        user_type = UserTypeSerializer()
        address = AddressSerializer()
        products = ProductSerializer(many=True) 

        class Meta:
            model = User
            fields = ['id', 'fantasy_name', 'username', 'email', 'user_type', 'address', 'products', 'img']

    def get(self, request, *args, **kwargs):
        users = User.objects.filter(user_type__type_id__in=[1,2,3]).select_related('address', 'user_type')
        serializer = self.OutputSerializer(users, many=True) 
        return Response(status=200, data=serializer.data)
