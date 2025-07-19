# serializers.py
from rest_framework import serializers
from .models import userbio

class PortfolioSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    media = serializers.ImageField(required=False, allow_null=True)
    class Meta:
        model = userbio
        fields = ['bio', 'media', 'media_url', 'college_name', 'college_year', 'location', 'user','user_name']
        read_only_fields = ['user']
    

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
