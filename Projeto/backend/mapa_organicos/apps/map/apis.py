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
        username = serializers.CharField(max_length=100)
        email = serializers.CharField(max_length=100)
        user_type = UserTypeSerializer()
        address = AddressSerializer()

    def get(self, request, *args, **kwargs):
        users = User.objects.filter(
            user_type__type_id__in=[1,2,3],
            first_name__contains=request.query_params.get('search')

        ).select_related('address', 'user_type')
        serializer = self.OutputSerializer(data=users, many=True)
        serializer.is_valid()
        return Response(status=200, data=serializer.data)
