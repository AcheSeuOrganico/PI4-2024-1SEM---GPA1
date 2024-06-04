
from apps.authentication.models import User, UserType
from apps.common.models import Address  


def update_user(id, data, user_type_data, address_data):
    print("Data:", data)
    print("User Type Data:", user_type_data)
    print("Address Data:", address_data)

    user = User.objects.get(id=id)
    
    user.first_name = data.get('first_name')
    user.last_name = data.get('last_name')
    user.email = data.get('email')
    user.description = data.get('description')
    user.fantasy_name = data.get('fantasy_name')

    print("User Type ID:", user_type_data)

    # Fetch UserType object based on user_type_data
    user_type = UserType.objects.get(type_id=user_type_data)
    user.user_type = user_type
    
    print("User Type:", user_type)

    print("Address Data:", address_data)
    user.address = Address.objects.create(**address_data)

    user.save()
