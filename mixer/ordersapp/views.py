from rest_framework.generics import CreateAPIView, ListAPIView

from .models import Order
from .serializers import OrderCreateSerializer, OrderListSerializer


class OrderListView(ListAPIView):
    """Вывод заказов пользователя"""
    serializer_class = OrderListSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('id')
        orders = Order.objects.filter(user=user_id)
        return orders


class OrderCreateView(CreateAPIView):
    """Добавление отзыва"""
    serializer_class = OrderCreateSerializer
