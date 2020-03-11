"""test3 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.urls import path
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', views.index),
    path('recommend/', views.recommend),
    path('houseinfo/',views.houseinfo),
    path('compare/', views.compare),
    path('ranking/', views.ranking),
    path('predict/', views.predict),
    path('community/', views.community),
    path('profile/', views.profile),
    # path('datamanage/', views.datamanage),
    path('usermanage/', views.usermanage),
    path('community_m/', views.community_m),
    # path('switch/', views.switch),
    path('login/', views.login),
    path('register/', views.register),
    path('houseinfo_change/',views.houseinfo_change),
    path('recommend_show/',views.recommend_show),
    path('compare_show/',views.compare_show),
    path('compare_table/',views.compare_table),
    path('predict_show/',views.predict_show),
    path('ranking_show/',views.ranking_show),
    path('myid/', views.community_m),
    path('myid2/', views.usermanage),
    path('postid/', views.community),
    path('', views.login),
]
