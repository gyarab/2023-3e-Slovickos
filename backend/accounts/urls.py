from django.urls import path
from . import views

urlpatterns = [
    path('signup/',views.CreateUserView.as_view(),name='signup'),
    path('login/',views.LoginView.as_view(),name='login'),
    path('update-name', views.update_name, name='update-name'),
    path('update-username', views.update_user_name, name='update-username'),
    path('update-email', views.update_email, name='update-email'),
    path('update-password', views.update_password, name='update-password'),

]