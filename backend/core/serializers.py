from rest_framework import serializers
from .models import Seznam_slov

class SeznamSlovSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seznam_slov
        fields = '__all__'
