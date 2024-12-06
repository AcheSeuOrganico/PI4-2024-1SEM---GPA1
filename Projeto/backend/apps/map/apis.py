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
from apps.common.models import (
    Address,
    Products
)

from rest_framework import status
from django.shortcuts import get_object_or_404

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

    class InputSerializer(serializers.ModelSerializer):
        fantasy_name = serializers.CharField(max_length=255)
        description = serializers.CharField(max_length=1024, allow_null=True, allow_blank=True, required=False)
        address = AddressSerializer()
        products = serializers.ListField(child=serializers.IntegerField(), allow_null=True, required=False)
        user_id = serializers.CharField(max_length=100, allow_null=True, allow_blank=True, required=False)

        class Meta:
            model = Organization
            fields = ['description', 'fantasy_name', 'address', 'products', 'img', 'user_id']

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
        print(serializer.data)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request, *args, **kwargs):
        print("Userrr -->", request.data)
        user = User.objects.order_by('-id')[0]
        input_serializer = self.InputSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)

        address_data = input_serializer.validated_data.pop('address', None)
        products_data = input_serializer.validated_data.pop('products', [])

        user_id = input_serializer.validated_data.pop('user_id', None)

        if user_id:
            user = User.objects.get(id=user_id)

        if address_data:
            address, created = Address.objects.get_or_create(**address_data)
        else:
            address = None

        organization = Organization.objects.create(
            **input_serializer.validated_data,
            address=address,
            user_id=user
        )

        if products_data:
            products = Products.objects.filter(pk__in=products_data)
            organization.products.set(products)

        output_serializer = self.OutputSerializer(organization)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)

    def patch(self, request, pk, *args, **kwargs):
        print(request.data)
        organization = get_object_or_404(Organization, pk=pk)

        input_serializer = self.InputSerializer(organization, data=request.data, partial=True)
        input_serializer.is_valid(raise_exception=True)

        address_data = input_serializer.validated_data.pop('address', None)
        products_data = input_serializer.validated_data.pop('products', [])
        user_id = input_serializer.validated_data.pop('user_id', None)

        if address_data:
            if organization.address:
                for attr, value in address_data.items():
                    setattr(organization.address, attr, value)
                organization.address.save()
            else:
                address = Address.objects.create(**address_data)
                organization.address = address

        for attr, value in input_serializer.validated_data.items():
            setattr(organization, attr, value)

        if user_id:
            user = get_object_or_404(User, pk=user_id)
            organization.user = user

        if products_data:
            products = Products.objects.filter(pk__in=products_data)
            organization.products.set(products)

        organization.save()

        output_serializer = self.OutputSerializer(organization)
        return Response(output_serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk, *args, **kwargs):
        print('PK -->', pk)
        organization = get_object_or_404(Organization, pk=pk)
        organization.delete()
        return Response({"detail": "Organization deleted successfully."}, status=status.HTTP_200_OK)

class OrganizationAPIViewV2(APIView):
    class OutputSerializer(serializers.ModelSerializer):
        address = AddressSerializer()
        products = ProductSerializer(many=True) 

        class Meta:
            model = Organization
            fields = ['id', 'description', 'fantasy_name', 'address', 'products', 'img', 'user_id']

    def get(self, request, id, *args, **kwargs):
        organization = Organization.objects.get(id=id)
        serializer = self.OutputSerializer(organization, many=False) 
        return Response(status=200, data=serializer.data)
    