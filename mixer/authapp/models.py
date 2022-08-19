from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

class ShopUser(AbstractUser):
    age = models.PositiveIntegerField(verbose_name='возраст', null=True)
    avatar = models.ImageField(upload_to='users_avatar', blank=True)
    phoneNumberRegex = RegexValidator(regex = r"^\+?1?\d{11}$")
    phoneNumber = models.CharField(validators = [phoneNumberRegex], max_length = 12, unique = True)
