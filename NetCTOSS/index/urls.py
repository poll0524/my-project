from django.conf.urls import url,include
from .views import *

urlpatterns = [
    url(r'^$',index_views, name='index'),
    url(r'^cost/',include('cost.urls')),
]