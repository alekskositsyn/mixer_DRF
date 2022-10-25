from rest_framework import serializers
from .models import Order





class OrderCreateSerializer(serializers.ModelSerializer):

    """Создание заказа"""

    class Meta:
        model = Order
        fields = '__all__'