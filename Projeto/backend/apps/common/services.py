from apps.common.models import (
    Address
)



def create_address(
        cep: str,
        name: str,
        city:str,
        state:str,
        latitude: str,
        longitude: str,
        number: int
):
    address = Address.objects.create(
            cep=cep,
            name=name,
            city=city,
            state=state,
            latitude=latitude,
            longitude=longitude,
            number=number
        )
    address.save()
    return address