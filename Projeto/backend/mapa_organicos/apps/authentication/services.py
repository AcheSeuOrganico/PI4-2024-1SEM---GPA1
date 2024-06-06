import base64
import uuid
from apps.authentication.models import User, UserType
from apps.common.models import Address , Products
from apps.common.serializers import AddressSerializer  
from django.core.files.base import ContentFile
from django.core.files import uploadedfile

from apps.common.utils import is_base64

def update_user(id, data):
    user = User.objects.get(id=id)
    
    user.first_name = data.get('first_name')
    user.last_name = data.get('last_name')
    user.email = data.get('email')
    user.description = data.get('description')
    user.fantasy_name = data.get('fantasy_name')

    if products := data.get('products'):
        products = [Products.objects.get(product_id=i) for i in products]
        user.products.set(products)

    img = data.get('img')

    if img:
        if isinstance(img, uploadedfile.InMemoryUploadedFile):
            user.img = img
    
    data = data.get('address')
    address_data = {
        'cep': data.get('cep'),
        'name': data.get('name'),
        'city': data.get('city'),
        'state': data.get('state'),
        'latitude': data.get('latitude'),
        'longitude': data.get('longitude'),
        'number': int(data.get('number'))  
    }
    
    address_serializer = AddressSerializer(data=address_data)
    if address_serializer.is_valid():
        address_instance = address_serializer.save()
        user.address = address_instance
    else:
        pass

    
    user.save()
