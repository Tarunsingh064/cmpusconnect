# urls.py
from django.urls import path
from .views import UserPortfolioView,CreateUserPortfolioView
from .views import AllUserPortfoliosView

urlpatterns = [
    path('portfolio/', UserPortfolioView.as_view(), name='user-portfolio'),
    path("portfolio/create/", CreateUserPortfolioView.as_view()),  # POST (create)
    path('portfolio/port/', AllUserPortfoliosView.as_view(), name='public-portfolio'),
]
