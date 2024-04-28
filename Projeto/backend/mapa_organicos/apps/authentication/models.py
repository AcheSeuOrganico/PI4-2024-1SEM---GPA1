from django.db import models
from django.contrib.auth.models import Group, Permission
# Create your models here.
from django.contrib.auth.models import AbstractUser, BaseUserManager as BUM
from django.db import models


class BaseUserManager(BUM):
    def create_user(
        self, username, email, is_active=True, password=None
    ):
        user = self.model(
            username=username,
            is_active=is_active
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
    user_type = models.ForeignKey(UserType, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = BaseUserManager()
