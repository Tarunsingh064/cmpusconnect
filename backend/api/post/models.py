# models.py
from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    text = models.TextField()
    media = models.FileField(upload_to='posts/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.owner.username} - {self.created_at}"
