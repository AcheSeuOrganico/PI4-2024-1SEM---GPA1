
import os, django, json
from time import sleep

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

import random, requests
from apps.authentication.models import User
from apps.authentication.models import UserType, Address, Products
from faker import Faker

fake = Faker()

ceps = ['01513000',
'69600000',
'45428000',
'85926800',
'59460000',
'97827000',
'97980000',
'01202001',
'01202000',
'01202003',
'01202002',
'01404000',
'01404100',
'01404002',
'01404003',
'01404200',
'01404001',
'01403020',
'01403000',
'01403001',
'01403002',
'01403003',
'01155040',
'01331001',
'01331000',
'01332010',
'01403010',
'02127000',
'02127001',
'02127002',
'02077000',
'01141060',
'02288015',
'01402000',
'01401000',
'01401001',
'01402001',
'01401002',
'01402002',
'02282050',
'02072000',
'02072002',
'02072001',
'01109000',
'01503000',
'01502000',
'01503001',
'01502001',
'02124000',
'02124001',
'02124002',
'01107000',
'01108000',
'01516000',
'01516100',
'01156050',
'02240000',
'02242000',
'02242001',
'02242002',
'01150001',
'01150000',
'02053003',
'02053002',
'01538001',
'02239000',
'02239010',
'01156001',
'01406000',
'01406100',
'01406200',
'01141030',
'01155000',
'01262010',
'01517020',
'01142200',
'01142000',
'01142300',
'01142100',
'02124090',
'02287280',
'02286000',
'02285000',
'01405020',
'01405005',
'01402010',
'01151040',
'01503020',
'02060065',
'01156040',
'01501050',
'01120030',
'01405010',
'02124060',
'02282003',
'01156049',
'01109100',
'01141090',
'01515000',
'02076045',
'01510010',
'01327010',
'02129030',
'01332060',
'01154070',
'01545110',
'01501040',
'01125030',
'02124010',
'02127006',
'01257160',
'02076060',
'01306060',
'01124060',
'01106130',
'02127010',
'01503010',
'01120010',
'02129065',
'01154025',
'01501001',
'01501000',
'01541015',
'02127050',
'01514020',
'01330015',
'01332100',
'01547140',
'01541020',
'01144070',
'01303020',
'01545100',
'01332050',
'01457060',
'01259110',
'01545080',
'02126000',
'01517080',
'01302040',
'01541040',
'01256130',
'01547160',
'01150011',
'01150010',
'02127030',
'01512040',
'01517090',
'01262020',
'01517030',
'02124030',
'02123035',
'02054005',
'01201050',
'01127050',
'01257150',
'02073105',
'01547120',
'02241090',
'01547180',
'02129040',
'01332070',
'01545090',
'01154080',
'01546110',
'02127040',
'01332080',
'02284000',
'02283000',
'02079002',
'02073080',
'01306030',
'01144010',
'02214090',
'02241120',
'01128080',
'02281266',
'01124000',
'02241130',
'01258020',
'01122011',
'01122010',
'02214070',
'02281216',
'02281250',
'02126010',
'01333040',
'01540020',
'01546020',
'01259050',
'01144050',
'01106010',
'02060040',
'01109050',
'01257130',
'01330010',
'01514040',
'02238240',
'01106060',
'02211010',
'01501030',
'01540010',
'02242010',
'02076080',
'01543040',
'01123030',
'01259080',
'01106120',
'01506010',
'02242020',
'02128030',
'01201060',
'02073070',
'02287250',
'01259040',
'02210170',
'02060080',
'01544040',
'01505010',
'02212070',
'02281248',
'01126030',
'02126050',
'01517070',
'02242005',
'02285010',
'02055090',
'02075060',
'01257110',
'02077005',
'01544050',
'01333050',
'02126100',
'01542010',
'01201030',
'01258001',
'01258000',
'01543030',
'02073130',
'01306020',
'02123050',
'02123055',
'02078015',
'02055030',
'01546030',
'02212010',
'01305000',
'01304000',
'01305100',
'01304001',
'02079003',
'01303040',
'02054070',
'01109030',
'01123040',
'01105040',
'01517060',
'02078050',
'01144080',
'02077050',
'01404010',
'01259000',
'01543000',
'01543001',
'01512020',
'01141050',
'01543060',
'01541050',
'02054050',
'02126040',
'01257030',
'01308020',
'01540000',
'02073030',
'02125030',
'02073020',
'01457050',
'01541070',
'02211050',
'01107050',
'02238330',
'02054090',
'01546010',
'01144000',
'02214040',
'01259060',
'01128070',
'02079006',
'02079010',
'01332000',
'01106050',
'01308030',
'02281220',
'01544030',
'01257120',
'02211000',
'02281223',
'01151030',
'01512030',
'02288022',
'01303030',]

def get_random_image():
    img1 = '/images/logo.png'
    img2 = '/images/logo2.jpeg'
    img3 = '/images/logo3.png'
    img4 = '/images/logo4.jpeg'
    img5 = '/images/logo5.jpeg'
    images= [img1, img2, img3, img4, img5]
    return random.choice(images)

def generate_random_user():
    user = User.objects.create_user(
        username=fake.user_name(),
        email=fake.email(),
        password=fake.password(),
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        fantasy_name=fake.company(),
        description=fake.text(),
        user_type=UserType.objects.order_by('?').first(),  # Random user type
        address=generate_random_address(),
        img = get_random_image()
    )
    user.products.set(Products.objects.order_by('?')[:random.randint(0, 4)])  # Assign random products
    user.save()
    return user

def generate_random_address():
    cep = random.choice(ceps)
    del ceps[ceps.index(cep)]

    response = requests.get(f'https://cep.awesomeapi.com.br/json/{cep}')
    
    if response.ok:
        data = response.json()
        return Address.objects.create(
            cep=cep,
            name=data.get('address'),
            number=random.randint(1,2000),
            city=data.get('city'),
            state=data.get('state'),
            district=data.get('district'),
            latitude=data.get('lat'),
            longitude=data.get('lng'),
        )
    

def generate_users():
    for _ in ceps:
        generate_random_user()

if __name__ == "__main__":
    generate_users()



