# serializers.py
from rest_framework import serializers
from .models import userbio
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class PortfolioSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    media = serializers.SerializerMethodField()

    class Meta:
        model = userbio
        fields = ['bio', 'media', 'college_name', 'college_year', 'location', 'user']
        
    def to_representation(self, instance):
        """ Add media URL formatting while keeping field writeable """
        rep = super().to_representation(instance)
        if rep.get("media"):
            rep["media"] = rep["media"].replace("http://", "https://")
        return rep

    def get_media(self, obj):
        if obj.media:
            return obj.media.url.replace("http://", "https://")
        return None
