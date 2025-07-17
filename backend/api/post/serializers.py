# serializers.py
from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(source='owner.username', read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'owner', 'owner_username', 'text', 'media', 'created_at']
        read_only_fields = ['owner', 'created_at']

    def get_media(self, obj):
        return obj.media.url if obj.media else None