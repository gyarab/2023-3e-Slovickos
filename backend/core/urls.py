from django.contrib import admin
from django.urls import path,include, re_path
from core import views
#from core.views import core_views  nwm jak se dela

urlpatterns = [
    path('word-sets/', views.get_user_word_sets),
    path('word-sets/new', views.create_word_set),
    path('word-sets/delete-word-set/<int:setid>', views.delete_word_set),
    path('word-sets/delete-word/<int:wordid>', views.delete_word),
    re_path(r'word-sets/(?P<id>[0-9]+)$', views.get_word_set_detail),
    path('', views.get_user_suggested_word_sets),
    path('word-sets/new-word', views.create_word),
    path('word-sets/update', views.update_wordset),
    path('word/update-base', views.update_word_base),
    path('word/update-translation', views.update_word_transalation),
]
