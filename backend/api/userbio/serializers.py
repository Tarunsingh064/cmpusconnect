# serializers.py
from rest_framework import serializers
from .models import userbio

class PortfolioSerializer(serializers.ModelSerializer):
    media = serializers.ImageField(required=False, allow_null=True)
    class Meta:
        model = userbio
        fields = '__all__'
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
