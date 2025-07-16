# models.py
from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

class Post(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    text = models.TextField()
    media = CloudinaryField('media', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.owner.username} - {self.created_at}"
