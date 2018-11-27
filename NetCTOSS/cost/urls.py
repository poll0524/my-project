from django.conf.urls import url,include
from .views import *

urlpatterns = [
    url(r'^$',cost_views,name='show_cost'),
]