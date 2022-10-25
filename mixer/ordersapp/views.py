from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView

from .models import Order
from .serializers import OrderCreateSerializer, OrderListSerializer


class OrderListView(ListAPIView):
    """Вывод заказов пользователя"""
    serializer_class = OrderListSerializer

    def get_queryset(self):
        orders = Order.objects.all()
        return orders


class OrderCreateView(CreateAPIView):
    """Добавление отзыва"""
    serializer_class = OrderCreateSerializer
