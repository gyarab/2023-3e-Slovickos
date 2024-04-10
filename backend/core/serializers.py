from rest_framework import serializers
from .models import Word_set, Word

class Word_set_serializer(serializers.ModelSerializer):
    class Meta:
        model = Word_set
        fields = '__all__'

class Word_serializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = '__all__'
