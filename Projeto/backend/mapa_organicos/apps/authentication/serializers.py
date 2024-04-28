from rest_framework_simplejwt.serializers import TokenObtainPairSerializer



class JWTLoginSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        token['user_type'] = user.user_type.type_id
        return token
