from django.shortcuts import render
from rest_framework.generics import CreateAPIView

from .serializers import OrderCreateSerializer


class OrderCreateView(CreateAPIView):
    """Добавление отзыва"""
    serializer_class = OrderCreateSerializer