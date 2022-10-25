from django.urls import path
import ordersapp.views as ordersapp


app_name = 'ordersapp'

urlpatterns = [
    path('orders/', ordersapp.OrderCreateView.as_view()),
]
