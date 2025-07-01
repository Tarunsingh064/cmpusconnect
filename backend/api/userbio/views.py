from django.shortcuts import render
from rest_framework.exceptions import NotFound


# Create your views here
# views.py
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import userbio
from .serializers import PortfolioSerializer

class UserPortfolioView(generics.RetrieveUpdateAPIView):
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        try:
            return userbio.objects.get(user=self.request.user)
        except userbio.DoesNotExist:
            raise NotFound("No portfolio exists for this user.")

    def post(self, request, *args, **kwargs):
        # For frontend: allow POST to update or create if not already created
        instance, _ = userbio.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)