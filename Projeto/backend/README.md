# Ache seu organico!

## Projeto Integrador 3º Semestre


## Setup 

Ambiente virtual:

    python -m venv venv
######
    source venv/Scripts/activate

Dependencias:

    pip install -r requirements.txt

.env:

    SECRET_KEY=

    DEBUG=

    ALLOWED_HOSTS=

    DB_NAME=
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_PORT=

Banco de dados:

    python manage.py migrate


Frontend:

    npm install 

    npm run dev 

    npm run build


# Api


#### Contrato criar usuario:

    # POST: /api/accounts/register/
    {
        "username":"teste",
        "password": "senha123",
        "first_name": "Teste",
        "last_name": "André",
        "email": "andre@andre.com",
        "address": {
            "name":"Rua do produtor",
            "cep":"11111111",
            "latitude":"-23.0000",
            "longitude":"-46.0000",
            "number": "666"
            },
        "user_type": 1
    }

