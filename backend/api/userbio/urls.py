# urls.py
from django.urls import path
from .views import UserPortfolioView

urlpatterns = [
    path('portfolio/', UserPortfolioView.as_view(), name='user-portfolio'),
]
