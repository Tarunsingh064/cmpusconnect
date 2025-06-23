# utlis.py
'''from twilio.rest import Client
import random

def generate_otp():
    return random.randint(100000, 999999)

def send_otp(phone_number, otp):
    # Replace these with your actual Twilio credentials
    account_sid = 'AC87bfb7ec633ea3560263131d0732d946'
    auth_token = '3a8a7e7b6c18fd1fed69bf3231ca7847'
    twilio_phone_number = '+16402234436'

    client = Client(account_sid, auth_token)

    try:
        message = client.messages.create(
            body=f'Your OTP is {otp}',
            from_=twilio_phone_number,
            to=phone_number  # Should be in E.164 format, e.g., +919876543210
        )
        return {"type": "success", "message": message.sid}
    except Exception as e:
        return {"type": "error", "message": str(e)}'''