from datetime import datetime
from .models import User, Word_set, Word, User_Word_set_mapping
from .serializers import Word_set_serializer, Word_serializer
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
    # Dam data z FE do formatu ve kterem s nimi muzu pracovat
    new_word_set = request.data
    name = new_word_set['name']
    owner_id = new_word_set['owner_id']
    # Musim udelat cely object Usera abych ho mohl pouzit jako ForeignKey
    owner = User.objects.get(id=owner_id)
    # Word_set je model s ForeignKey Usera (owner)
    word_set = Word_set.objects.create(name=name, owner_id=owner)
    word_set.save()
    # Zapisu rovnou datum zalozeni jako datum prvni navstevy
    curr_date = datetime.now()
    time_made = User_Word_set_mapping.objects.create(user_id = owner, word_set_id = word_set, has_access = True, last_view = curr_date)
    time_made.save()

    set_id = word_set.id
    return JsonResponse(set_id, safe=False)

@api_view(['GET'])
def get_word_set_detail(request, id):

    queryset = Word.objects.filter(word_set_id = id)

    serializer = Word_serializer(queryset, many=True)

    return JsonResponse(serializer.data, safe=False)