from django.shortcuts import render

from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.common.models import Products


# Create your views here.


class ProductsAPIView(APIView):

    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        product_id = serializers.CharField(max_length=255)
        name = serializers.CharField(max_length=255)
        icon = serializers.CharField(max_length=255)

    def get(self, request,*args, **kwargs):
        user = Products.objects.all()
        serializer = self.OutputSerializer(data=user, many=True)
        serializer.is_valid()      
        return Response(status=200, data=serializer.data)
