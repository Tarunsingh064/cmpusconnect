from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField


# Create your models here.
class userbio(models.Model):
    media = CloudinaryField('media', blank=True, null=True)
    user = models.OneToOneField('auth.user',on_delete=models.CASCADE,related_name='usebio')
    bio = models.CharField(max_length=1500,blank=True,null=True)
    college_name = models.CharField(max_length=150,blank=True,null=True)
    college_year = models.CharField(max_length=4,blank=True,null=True)
    location = models.CharField(max_length=150,blank=True,null=True)
