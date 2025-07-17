from rest_framework import viewsets, permissions
from .models import Post
from .serializers import PostSerializer
from rest_framework.parsers import MultiPartParser, FormParser


# Custom permission: only owners can edit/delete
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow GET, HEAD, OPTIONS for anyone
        if request.method in permissions.SAFE_METHODS:
            return True
        # Only allow update/delete if owner
        return obj.owner == request.user

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    parser_classes = [MultiPartParser, FormParser]  # ⬅️ Required!

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsOwnerOrReadOnly()]
        elif self.action == 'create':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

