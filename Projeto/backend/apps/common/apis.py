from django.shortcuts import render

from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.common.models import Products
from apps.common.serializers import ProductSerializer

# Create your views here.


class ProductsAPIView(APIView):

    def get(self, request,*args, **kwargs):
        user = Products.objects.all()
        serializer = ProductSerializer(data=user, many=True)
        serializer.is_valid()      
        return Response(status=200, data=serializer.data)
