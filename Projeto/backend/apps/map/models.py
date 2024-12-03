from django.db import models
from django.contrib.auth import get_user_model

from apps.common.models import Address, Products

# Create your models here.

User = get_user_model()

class Organization(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='organization_user')
    fantasy_name = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField( blank=True, null=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name='organization_address', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    products = models.ManyToManyField(Products, blank=True)
    img = models.ImageField(upload_to='images/', default=None, blank=True, null=True)