from apps.authentication.models import (
    UserType
)



def get_user_type_by_type_id(type_id: int):
    try:
        return UserType.objects.get(type_id=type_id)
    except UserType.MultipleObjectsReturned:
        return UserType.objects.filter(type_id=type_id)
    except UserType.DoesNotExist:
        return None
