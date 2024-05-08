from django.db import models
from django.contrib.auth.models import Group, Permission, AbstractUser, BaseUserManager as BUM

from apps.common.models import Address


class BaseUserManager(BUM):
    def create_user(
        self, 
        username, 
        first_name='', 
        last_name='',
        email='',
        user_type=0,
        address=None,
        is_active=True, 
        password=None
    ):
        user = self.model(
            username=username,
            is_active=is_active,
            first_name=first_name,
            last_name=last_name,
            email=email,
            address=address,
            user_type=user_type
        )

        if password is not None:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.full_clean()
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email='', password=None):
        user = self.create_user(
            username=username,
            email=email,
            is_active=True,
            password=password
        )

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user
    
class UserType(models.Model):
    type_name = models.CharField(max_length=120)
    type_id = models.IntegerField()

    def __str__(self) -> str:
        return self.type_name

class User(AbstractUser):
    groups = models.ManyToManyField(Group, related_name='custom_user_groups')
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions')
    user_type = models.ForeignKey(UserType, on_delete=models.CASCADE, related_name='user_type',blank=True, null=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name='address', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = BaseUserManager()
