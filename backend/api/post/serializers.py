from rest_framework import serializers
from .models import Post
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(source='owner.username', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'owner', 'owner_username', 'text', 'created_at']
        read_only_fields = ['owner', 'created_at']

class PostSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(source='owner.username', read_only=True)
    media = serializers.ImageField(required=False, allow_null=True)
    like_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()


    class Meta:
        model = Post
        fields = ['id', 'owner', 'owner_username', 'text', 'media', 'created_at','like_count', 'is_liked']
        read_only_fields = ['owner', 'created_at']

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return user in obj.likes.all()
        return False
    
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
