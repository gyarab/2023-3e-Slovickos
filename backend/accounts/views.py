from rest_framework import generics
from .serializers import UserDataSerializer, UserSerializer,AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from  core.models import User, Word_set, Word, User_Word_set_mapping

from accounts import serializers

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

class LoginView(ObtainAuthToken):

    serializer_class = AuthTokenSerializer

    def post(self, request, *args,**kwargs):
        serializers = self.serializer_class(data=request.data,context={'request':request})
        serializers.is_valid(raise_exception=True)
        user = serializers.validated_data['user']
        token,created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'user_id': user.id,
            'email': user.email,
            'name': user.name
        })

@api_view(['PUT'])
def update_name(request):
    user_id = request.data['id']
    name = request.data['name']

    user = User.objects.filter(id=user_id).update(name=name)
    updated_user = User.objects.filter(id=user_id)
    user_serializer = UserDataSerializer(updated_user, many=True)
    return JsonResponse(user_serializer.data, safe=False)

@api_view(['PUT'])
def update_user_name(request):
    user_id = request.data['id']
    username = request.data['username']

    user = User.objects.filter(id=user_id).update(username=username)
    updated_user = User.objects.filter(id=user_id)
    user_serializer = UserDataSerializer(updated_user, many=True)
    return JsonResponse(user_serializer.data, safe=False)

@api_view(['PUT'])
def update_email(request):
    user_id = request.data['id']
    email = request.data['email']

    user = User.objects.filter(id=user_id).update(email=email)
    updated_user = User.objects.filter(id=user_id)
    user_serializer = UserDataSerializer(updated_user, many=True)
    return JsonResponse(user_serializer.data, safe=False)


@api_view(['PUT'])
def update_password(request):
    user_id = request.data['id']
    password = request.data['password']

    user = User.objects.get(id=user_id)
    user.set_password(password)
    user.save()
    return JsonResponse(status=200, safe=False)