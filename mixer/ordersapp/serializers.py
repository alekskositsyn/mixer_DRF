from django.core.management import execute_from_command_line
from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('product', 'quantity')


class OrderListSerializer(serializers.ModelSerializer):
    """Вывод заказов пользователя"""
    orderitems = OrderItemsSerializer(read_only=True, many=True)

    class Meta:
        model = Order
        fields = ('user', 'created', 'orderitems', 'updated', 'status')
        # exclude = ('updated', 'is_active')


class OrderCreateSerializer(serializers.ModelSerializer):
    """Создание заказа пользователя"""
    orderitems = OrderItemsSerializer(many=True)

    class Meta:
        model = Order
        fields = ('id', 'user', 'orderitems')

    def create(self, validated_data):
        orders_data = validated_data.pop('orderitems')
        order = Order.objects.create(**validated_data)
        for order_data in orders_data:
            OrderItem.objects.create(order=order, **order_data)
        return order
