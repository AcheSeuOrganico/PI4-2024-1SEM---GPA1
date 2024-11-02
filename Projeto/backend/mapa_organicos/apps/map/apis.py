from django.shortcuts import render
from django.db.models import Q

from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.authentication.models import User
from apps.authentication.serializers import UserTypeSerializer
from apps.common.serializers import AddressSerializer, ProductSerializer
from apps.common.models import Products
from rest_framework.pagination import PageNumberPagination
from apps.map.models import Organization

# Create your views here.
class OrganizationsPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 100



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
        if search := request.query_params.get('search'):
            users = users.filter(fantasy_name__contains=search)

        paginator = OrganizationsPagination()
        paginated_users = paginator.paginate_queryset(users, request)
        
        serializer = self.OutputSerializer(paginated_users, many=True)
        return paginator.get_paginated_response(serializer.data)


class OrganizationsAPIViewV2(APIView):
    class OutputSerializer(serializers.ModelSerializer):
        address = AddressSerializer()
        products = ProductSerializer(many=True) 

        class Meta:
            model = Organization
            fields = ['id', 'description', 'fantasy_name', 'address', 'products', 'img']

    def get(self, request, *args, **kwargs):
        organization = Organization.objects.select_related('address', 'user_id')
        if search := request.query_params.get('search'):
            search_filter = (
                Q(fantasy_name__icontains=search) |
                Q(user_id__id=search)
            )
            organization = organization.filter(search_filter)

        paginator = OrganizationsPagination()
        paginated_organization = paginator.paginate_queryset(organization, request)
        
        serializer = self.OutputSerializer(paginated_organization, many=True)
        return paginator.get_paginated_response(serializer.data)
    

class OrganizationAPIViewV2(APIView):
    class OutputSerializer(serializers.ModelSerializer):
        address = AddressSerializer()
        products = ProductSerializer(many=True) 

        class Meta:
            model = Organization
            fields = ['id', 'description', 'fantasy_name', 'address', 'products', 'img']

    def get(self, request, id, *args, **kwargs):
        organization = Organization.objects.get(id=id)
        serializer = self.OutputSerializer(organization, many=False) 
        return Response(status=200, data=serializer.data)