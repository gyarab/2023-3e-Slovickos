from .models import Word_set
from .serializers import Word_set_serializer
from rest_framework.decorators import api_view
from django.http import JsonResponse

@api_view(['POST'])
def get_user_word_sets(request):
    user_id = request.data['userId']
    # Vyfiltruji polozky z DB, kde id_vlastnika se rovna id_usera (globalni promenna)
    queryset = Word_set.objects.filter(owner_id = user_id)
    # Serializuji vybrane polozky z DB
    serializer = Word_set_serializer(queryset, many=True)
    # Vratim JsonResponse na FE se serializovanymi data z DB
    return JsonResponse(serializer.data, safe=False)

# Dostanu z FE informace o novem setu a zapisu to do DB
@api_view(['POST'])
def create_word_set(request):
    return JsonResponse("kokot", safe=False)

@api_view(['GET'])
def get_word_set_detail():
    return JsonResponse("kokot", safe=False)