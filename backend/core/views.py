from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from .models import User

from rest_framework import generics
from .models import Seznam_slov
from .serializers import SeznamSlovSerializer

class getSet(generics.ListAPIView):
    queryset = Seznam_slov.objects.all()
    serializer_class = SeznamSlovSerializer
    
'''
def seznam_slov_view(request):
    seznam_slovs = Seznam_slov.objects.all().values('jmeno')
    return JsonResponse(list(seznam_slovs), safe=False)
'''

'''
obj = MyModel.objects.get(pk=1)
print(obj.my_boolean_field)  # Output: False

obj.my_boolean_field = True
obj.save()
'''