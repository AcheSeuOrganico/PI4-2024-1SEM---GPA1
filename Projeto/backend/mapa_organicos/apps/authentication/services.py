
from apps.authentication.models import User, UserType
from apps.common.models import Address  
from apps.common.serializers import AddressSerializer  


def update_user(id, data):
    user = User.objects.get(id=id)
    
    user.first_name = data.get('first_name')
    user.last_name = data.get('last_name')
    user.email = data.get('email')
    user.description = data.get('description')
    user.fantasy_name = data.get('fantasy_name')
    
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
        # Handle serializer errors if needed
        pass
    
    user.save()
