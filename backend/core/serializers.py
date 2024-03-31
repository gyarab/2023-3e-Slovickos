from rest_framework import serializers
from .models import Word_set

class Word_set_serializer(serializers.ModelSerializer):
    class Meta:
        model = Word_set
        fields = '__all__'
