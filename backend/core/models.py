from datetime import datetime
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender,instance=None,created=False,**kwargs):
    if created:
        Token.objects.create(user=instance)

class UserManager(BaseUserManager):

    def create_user(self,email,username=None,password=None,**extrafields):
        if not email:
            raise ValueError('Users must have an email')
        user = self.model(username=username,email=self.normalize_email(email), **extrafields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self,email,password,username=None):
        user = self.create_user(email,username,password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=200,unique=True,null=True)
    email = models.EmailField(max_length=255,unique=True)
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

class User_group(models.Model):
    id = models.AutoField(unique=True, primary_key=True)
    name = models.CharField(max_length=50)
    admin_id = models.ForeignKey(User, on_delete=models.CASCADE)

class Folder(models.Model):
    id = models.AutoField(unique=True, primary_key=True)
    name = models.CharField(max_length=50)
    #description = models.TextField(blank=True)
    group_id = models.ForeignKey(User_group, on_delete=models.CASCADE, default=None)
    owner_id = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

class Word_set(models.Model):
    id = models.AutoField(unique=True, primary_key=True)
    name = models.CharField(max_length=50)
    #description = models.TextField(blank=True)
    owner_id = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    created = models.DateField()

class Word(models.Model):
    id = models.AutoField(unique=True, primary_key=True)
    word_set_id = models.ForeignKey(Word_set, on_delete=models.CASCADE, default=None)
    base = models.CharField(max_length=1000)
    translation = models.CharField(max_length=1000)

class User_User_group_mapping(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    group_id = models.ForeignKey(User_group, on_delete=models.CASCADE, default=None)
    has_access = models.BooleanField(default=False)

class User_Word_set_mapping(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    word_set_id = models.ForeignKey(Word_set, on_delete=models.CASCADE, default=None)
    has_access = models.BooleanField(default=False)
    last_view = models.DateTimeField()

class User_group_Word_set_mapping(models.Model):
    group_id = models.ForeignKey(User_group, on_delete=models.CASCADE, default=None)
    word_set_id = models.ForeignKey(Word_set, on_delete=models.CASCADE, default=None)

class Folder_Word_set_mapping(models.Model):
    folder_id = models.ForeignKey(Folder, on_delete=models.CASCADE, default=None)
    word_set_id = models.ForeignKey(Word_set, on_delete=models.CASCADE, default=None)

class Success_rate(models.Model):
    word_id = models.ForeignKey(Word, on_delete=models.CASCADE, default=None)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    successfuly_translated = models.BooleanField(default=False)
