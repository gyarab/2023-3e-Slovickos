from datetime import datetime
from random import randint
from django.shortcuts import get_object_or_404
from .models import User, Word_set, Word, User_Word_set_mapping
from .serializers import User_name_serializer, Word_set_serializer, Word_serializer
from rest_framework.decorators import api_view
from django.http import JsonResponse

@api_view(['POST'])
def get_user_word_sets(request):
    user_id = request.data['userId']
    # Ziskam jmeno zakladatele setu
    user_name = User.objects.filter(id=user_id).values('name')
    user_name_serializer = User_name_serializer(user_name, many=True)

    word_set = Word_set.objects.filter(owner_id = user_id)
    # Serializuji vybrane polozky z DB
    word_set_serializer = Word_set_serializer(word_set, many=True)
    # Vratim JsonResponse na FE se serializovanymi data z DB
    response_data = {
            'username': user_name_serializer.data,
            'word_sets': word_set_serializer.data,
        }
    return JsonResponse(response_data, status=200)

# Dostanu z FE informace o novem setu a zapisu to do DB
@api_view(['POST'])
def create_word_set(request):
    curr_date = datetime.now()
    # Dam data z FE do formatu ve kterem s nimi muzu pracovat
    new_word_set = request.data
    name = new_word_set['name']
    #description = new_word_set['description']
    owner_id = new_word_set['owner_id']
    # Musim udelat cely object Usera abych ho mohl pouzit jako ForeignKey
    owner = User.objects.get(id=owner_id)
    # Word_set je model s ForeignKey Usera (owner)
    word_set = Word_set.objects.create(name=name, owner_id=owner, created = curr_date)
    word_set.save()
    # Zapisu rovnou datum zalozeni jako datum prvni navstevy
    time_made = User_Word_set_mapping.objects.create(user_id = owner, word_set_id = word_set, has_access = True, last_view = curr_date)
    time_made.save()

    set_id = word_set.id
    return JsonResponse(set_id, status=200)

#@api_view(['POST'])
#def create_word(request):
#    return JsonResponse("word", safe=False)

@api_view(['GET'])
def get_word_set_detail(request, id):

    queryset = Word.objects.filter(word_set_id = id)

    serializer = Word_serializer(queryset, many=True)

    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def get_user_suggested_word_sets(request):
    user_id = request.data['userId']
    # Ziskam jmeno zakladatele setu
    user_name = User.objects.filter(id=user_id).values('name')
    user_name_serializer = User_name_serializer(user_name, many=True)

    # Ziskam sety, na ktere se uzivatel dival pred nejdelsi dobou 
    # Ziskam id 4 setu, ktere byly navstiveny pred nejdelsi dobou
    oldest_set_ids = User_Word_set_mapping.objects.filter(user_id=user_id).order_by('last_view').values_list('word_set_id', flat=True)[:4]
    oldest_set_ids_list = list(oldest_set_ids)
    # Podle id setu ziskam potrebne sety (musim porovnavat list idecek - oldest_set_ids_list)
    word_sets = Word_set.objects.filter(id__in=oldest_set_ids_list)
    oldest_sets_serializer = Word_set_serializer(word_sets, many=True)

    # Ziskam sety, na ktere se uzivatel dival nedavno 
    # Ziskam id 4 setu, ktere byly navstiveny nedavno
    youngest_set_ids = User_Word_set_mapping.objects.filter(user_id=user_id).order_by('-last_view').values_list('word_set_id', flat=True)[:4]
    youngest_set_ids_list = list(youngest_set_ids)
    # Podle id setu ziskam potrebne sety (musim porovnavat list idecek - youngest_set_ids_list)
    word_sets = Word_set.objects.filter(id__in=youngest_set_ids_list)
    youngest_sets_serializer = Word_set_serializer(word_sets, many=True)

    response_data = {
        'username': user_name_serializer.data,
        'oldest_word_sets': oldest_sets_serializer.data,
        'youngest_word_sets': youngest_sets_serializer.data
    }
    return JsonResponse(response_data, status=200)

@api_view(['POST'])
def create_word(request):

    # Parse the JSON data from the request body
    data = request.data
    
    word_set_id = data['word_set_id']
    base = data['base']
    translation = data['translation']

    if not word_set_id:
        raise ValueError("Missing 'word_set_id' in request data")
    if not base:
        raise ValueError("Missing 'base' in request data")
    if not translation:
        raise ValueError("Missing 'translation' in request data")
    
    #relationship pro wordset - nutný
    wordset = Word_set.objects.get(id=word_set_id) 

    #create a save
    new_word = Word.objects.create(word_set_id=wordset, base=base, translation=translation)
    new_word.save()

    return JsonResponse(status=200, safe=False)


@api_view(['DELETE'])
def delete_word_set(request, setid):
    # Get Word-set / 404
    word_set = get_object_or_404(Word_set, id=setid)
    
    # Delete Word Set
    word_set.delete()
    
    # Respond
    return JsonResponse(status=200, safe=False)

@api_view(['DELETE'])
def delete_word(request, wordid):
    # Get the Word / 404
    word = get_object_or_404(Word, id=wordid)
    
    # Delete Word
    word.delete()
    
    # Respond
    return JsonResponse(status=200, safe=False)

@api_view(['PUT'])
def update_wordset(request):
    word_set_id = request.data['id']
    name = request.data['name']

    word_set = Word_set.objects.filter(id=word_set_id)
    word_set.update(name=name)
    return JsonResponse(status=200, safe=False)

@api_view(['POST'])
def update_word_base(request):
    return JsonResponse(status=200, safe=False)

@api_view(['POST'])
def update_word_transalation(request):
    return JsonResponse(status=200, safe=False)