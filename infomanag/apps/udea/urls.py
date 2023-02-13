from django.urls import path
from .views import my_view

urlpatterns = [
    path('api', my_view, name='my_view'),
]