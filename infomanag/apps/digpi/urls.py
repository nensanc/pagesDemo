from django.urls import path
from .views import GetMidMapeo

app_name="section"

urlpatterns = [
    path('get-mid_mapeo', GetMidMapeo.as_view()),
]