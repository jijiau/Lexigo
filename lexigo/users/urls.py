# users/urls.py
from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('home/', home_view, name='home'),  # Pastikan URL home juga diatur
    path('view_profile/', view_profile_view, name = 'view_profile'),
    path('edit_profile/', edit_profile_view, name = 'edit_profile'),
    path('learn_read/', learn_read_view, name = 'learn_read'),
    path('learn_liste/', learn_listen_view, name = 'learn_listen'),
    path('index/', index_view, name='index'),
    path('delete_account/', delete_account, name='delete_account'),
]   
