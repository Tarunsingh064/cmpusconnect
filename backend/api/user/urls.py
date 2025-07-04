from rest_framework import routers
from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('dashboard/', views.DashboadView.as_view(), name='auth_register'),
    path('login/', views.LoginView.as_view(), name='auth_login'),
    path('logout/', views.LogoutView.as_view(), name='auth_register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('confirm-email/<uidb64>/<token>/', views.ConfirmEmailView.as_view(), name='confirm-email'),
    path('reset-password/', views.PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('reset-password/<uidb64>/<token>/', views.PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    #path('verify-phone/', views.VerifyPhoneView.as_view(), name='verify-phone'),

]