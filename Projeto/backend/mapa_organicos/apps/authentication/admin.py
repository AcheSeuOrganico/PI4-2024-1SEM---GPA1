from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, UserType


class UserTypeAdmin(admin.ModelAdmin):  # Renamed the model admin class to UserTypeAdmin
    list_display = ['type_name']


class UserAdmin(UserAdmin):
    fieldsets = (
        *UserAdmin.fieldsets,
        ("User Type", {"fields": ("user_type",)}),
        ("Products", {"fields": ("products",)}),
        ("img", {"fields": ("img",)})
    )


admin.site.register(User, UserAdmin)
admin.site.register(UserType, UserTypeAdmin) 