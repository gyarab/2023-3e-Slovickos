"""
URL configuration for pokus4 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include, re_path
from core import views
#from core.views import core_views  nwm jak se dela

urlpatterns = [
    path('word-sets/', views.get_user_word_sets),
    path('word-sets/new', views.create_word_set),
    re_path(r'word-sets/(?P<id>[0-9]+)$', views.get_word_set_detail),
    path('', views.get_user_suggested_word_sets),
]
