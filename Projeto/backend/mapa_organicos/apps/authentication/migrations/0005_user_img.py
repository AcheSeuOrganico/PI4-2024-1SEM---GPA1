# Generated by Django 5.0.4 on 2024-06-05 06:23

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("authentication", "0004_user_products"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="img",
            field=models.ImageField(blank=True, null=True, upload_to=""),
        ),
    ]
