from django.urls import path
from .views import SaveProcess

app_name="listas"

urlpatterns = [
    path('save-process', SaveProcess.as_view()),
]