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

class Trida(models.Model):
    id = models.AutoField(unique=True, primary_key=True)
    jmeno = models.CharField(max_length=50)
    id_spravce = models.ForeignKey(User, on_delete=models.CASCADE)

class Slozka(models.Model):
    id = models.AutoField(unique=True, primary_key=True)
    jmeno = models.CharField(max_length=50)
    trida_id = models.ForeignKey(Trida, on_delete=models.CASCADE, default=None)
    id_vlastnik = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

class Seznam_slov(models.Model):
    id = models.AutoField(unique=True, primary_key=True)
    jmeno = models.CharField(max_length=50)
    id_vlastnik = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

class Slovo(models.Model):
    id = models.AutoField(unique=True, primary_key=True)
    zaklad = models.CharField(max_length=100)
    preklad = models.CharField(max_length=100)

class Uzivatel_Trida(models.Model):
    uzivatel_id = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    trida_id = models.ForeignKey(Trida, on_delete=models.CASCADE, default=None)
    prava = models.BooleanField(default=False)

class Uzivatel_Seznam_slov(models.Model):
    uzivatel_id = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    seznam_slov_id = models.ForeignKey(Seznam_slov, on_delete=models.CASCADE, default=None)
    prava = models.BooleanField(default=False)
    cas = models.DateField()

class Trida_Seznam(models.Model):
    trida_id = models.ForeignKey(Trida, on_delete=models.CASCADE, default=None)
    seznam_slov_id = models.ForeignKey(Seznam_slov, on_delete=models.CASCADE, default=None)

class Slozka_Seznam(models.Model):
    slozka_id = models.ForeignKey(Slozka, on_delete=models.CASCADE, default=None)
    seznam_slov_id = models.ForeignKey(Seznam_slov, on_delete=models.CASCADE, default=None)

class Uspesnost(models.Model):
    slovo_id = models.ForeignKey(Slovo, on_delete=models.CASCADE, default=None)
    uzivatel_id = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    zaklad = models.BooleanField(default=True)
