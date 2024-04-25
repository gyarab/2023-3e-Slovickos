from rest_framework import serializers
from .models import Word_set, Word, User

class Word_set_serializer(serializers.ModelSerializer):
    class Meta:
        model = Word_set
        fields = '__all__'

class Word_serializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = '__all__'

class User_name_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name']

class User_id_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id']
