from django.contrib import admin
from .models import Address, Products

# Register your models here.


admin.site.register(Address, admin.ModelAdmin)
admin.site.register(Products, admin.ModelAdmin)