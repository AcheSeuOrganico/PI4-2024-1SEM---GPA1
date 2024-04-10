from rest_framework_simplejwt.serializers import TokenObtainPairSerializer



class JWTLoginSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        return token