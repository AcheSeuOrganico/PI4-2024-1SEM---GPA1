from django.db import models

# Create your models here.



class Address(models.Model):
    cep = models.CharField(max_length=10)
    type = models.CharField(max_length=25)
    name = models.CharField(max_length=100)
    number = models.IntegerField()
    city = models.CharField(max_length=255, blank=True, null=True)
    state = models.CharField(max_length=2)
    district = models.CharField(max_length=100)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)

    def __str__(self):
        return f"{self.cep}"
    

class Products(models.Model):
    product_id = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    icon = models.CharField(max_length=255, null=True, blank=True)
