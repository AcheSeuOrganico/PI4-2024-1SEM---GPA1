from apps.common.models import (
    Address
)



def create_address(
        cep: str,
        name: str,
        latitude: str,
        longitude: str,
        number: int
):
    address = Address.objects.create(
            cep=cep,
            name=name,
            latitude=latitude,
            longitude=longitude,
            number=number
        )
    address.save()
    return address