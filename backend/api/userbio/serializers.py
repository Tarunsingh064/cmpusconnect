# serializers.py
from rest_framework import serializers
from .models import userbio

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = userbio
        fields = '__all__'
        read_only_fields = ['user']
