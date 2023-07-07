from django.urls import path
from .views import *

urlpatterns = [
    path('', get_all_bitcoin_prices, name='bitcoin'),
    path('prices/', bitcoin_prices_query, name='bitcoin_prices_query'),



]
