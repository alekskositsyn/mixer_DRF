# Generated by Django 4.1.5 on 2023-01-24 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authapp', '0002_auto_20220829_1736'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shopuser',
            name='first_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='first name'),
        ),
    ]