from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Process
from .Serializers import ProcessSerializer
# Create your views here.
class SaveProcess(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data
        try:
            Process.objects.create(
                parent = user,
                desc = data['desc'],
                name =  data['name'],
            ) 
            process = ProcessSerializer(Process.objects.filter(id=user.id).order_by(('created_at'), many=True))
            return Response(
                {'msg': 'Se crea la sección de forma exitosa', 'data': process},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'msg': 'Error al crear el proceso'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )        