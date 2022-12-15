from django.urls import path
import ordersapp.views as ordersapp


app_name = 'ordersapp'

urlpatterns = [
    path('orders/<int:id>/', ordersapp.OrderListView.as_view()),
    path('orders/create/', ordersapp.OrderCreateView.as_view()),
]
