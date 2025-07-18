# urls.py
from django.urls import path
from .views import UserPortfolioView
from .views import PublicPortfolioView

urlpatterns = [
    path('portfolio/', UserPortfolioView.as_view(), name='user-portfolio'),
    path('portfolio/port/', PublicPortfolioView.as_view(), name='public-portfolio'),
]
