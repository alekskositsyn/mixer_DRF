from django.utils.text import slugify
from django.template import defaultfilters
from unidecode import unidecode

import string
import random


def get_client_ip(request):
    """Получение IP пользователя"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def random_string_generator(size=10, chars=string.ascii_lowercase + string.digits):
    """Функция, генерирующая набор случайных строковых символов"""

    return ''.join(random.choice(chars) for _ in range(size))


def pre_save_receiver(sender, instance, *args, **kwargs):
    """Функция получения и сохранения уникального slug"""

    if instance.slug:
        print(instance.slug)
        instance.slug = instance.slug
    else:
        slug = defaultfilters.slugify(unidecode(instance.name))
        slugs = sender.objects.filter()
        for slug_old in slugs.values("slug"):
            if slug in slug_old["slug"]:
                instance.slug = "%s-%s" % (slug,
                                           random_string_generator(size=4))
                break
            else:
                instance.slug = slug
