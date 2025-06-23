# serializer.py
from rest_framework import serializers
from django.contrib.auth.models import User
#from django.db import IntegrityError
#from .models import UserPhone
#from .utils import generate_otp, send_otp



class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User  # Fixed typo here
        fields = ('id', 'username', 'email',)



class RegisterSerializers(serializers.ModelSerializer):
    #phone_number = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value
    

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        return user


    '''def validate_phone_number(self, value):
        if UserPhone.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("Phone number already exists.")
        return value'''

    '''def create(self, validated_data):
        phone_number = validated_data.pop('phone_number')
        user = User.objects.create_user(**validated_data)

        otp = generate_otp()  # Generate OTP

    # Send OTP to the phone number using MSG91
        response = send_otp(phone_number, otp)

    # Check if the response contains a success message or something indicating failure
        if response.get('type') == 'error':
            raise serializers.ValidationError(f"Failed to send OTP: {response.get('message')}")

    # Save user phone and OTP
        UserPhone.objects.create(
            user=user,
            phone_number=phone_number,
            otp=otp
            )

        return user'''
    


    
class LoginSerializers(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True,write_only = True)

'''class VerifyPhoneSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    otp = serializers.CharField()

    def validate(self, attrs):
        phone_number = attrs.get('phone_number')
        otp = attrs.get('otp')

        try:
            user_phone = UserPhone.objects.get(phone_number=phone_number)
        except UserPhone.DoesNotExist:
            raise serializers.ValidationError("Phone number not found.")

        if user_phone.otp != otp:
            raise serializers.ValidationError("Invalid OTP.")

        # Optionally: Add expiry logic by checking if OTP was generated within a time limit.

        # Mark the phone number as verified
        user_phone.is_phone_verified = True
        user_phone.otp = None  # Clear OTP after verification
        user_phone.save()

        return {"message": "Phone number verified successfully."}'''