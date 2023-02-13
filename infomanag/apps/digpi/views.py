from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class GetMidMapeo(APIView):
    def post(self, request, format=None):
        user = self.request.user
        file = self.request.data
        try:
            return Response(
                    {'res': {}},
                    status=status.HTTP_200_OK
                )
        except:
            return Response(
                {'error': 'Error al cargar los proyectos'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )