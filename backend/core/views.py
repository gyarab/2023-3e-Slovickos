from django.shortcuts import render
from .models import Seznam_slov
from .serializers import Seznam_slov_serializer
from rest_framework.decorators import api_view
from django.http import JsonResponse

            
@api_view(['GET', 'POST',])
def show_sets(request):
    global user_id
    if request.method == 'POST':
        user_id = request.data['userId']
            # Return the serialized data
        return JsonResponse("Diky moc Angular bro")
        # Query the database for objects with id_vlastnik equal to user_id
    elif request.method == 'GET':
        queryset = Seznam_slov.objects.filter(id_vlastnik_id=user_id)
        # Serialize the queryset
        serializer = Seznam_slov_serializer(queryset, many=True)
            # For GET requests, you might want to return an empty response or a message
        return JsonResponse(serializer.data, safe=False)