from django.contrib import admin
from django.urls import include, path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("signUp", views.signUp, name="signUp"),
    path('activate/<uidb64>/<token>', views.activate, name='activate'),
    path("logIn", views.logIn, name="logIn"),
    path("logOut", views.logOut, name="logOut")
    
]