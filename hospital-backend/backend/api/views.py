from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Appointment
from .models import User
from .serializers import AppointmentSerializer
from django.core.mail import send_mail
from django.conf import settings
from .models import Payment
import razorpay
import os
from django.contrib.auth.hashers import make_password
from dotenv import load_dotenv
from pathlib import Path
from django.shortcuts import render


# Exact path to .env file
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / '.env')

@api_view(['GET'])
def get_users(request):
    users = User.objects.all().values()
    return Response(users)


def data_dashboard(request):
    context = {
        "users": User.objects.all().order_by("-id"),
        "appointments": Appointment.objects.all().order_by("-id"),
        "payments": Payment.objects.select_related("appointment").all().order_by("-id"),
    }
    return render(request, "api/dashboard.html", context)


@api_view(['GET'])
def test_api(request):
    return Response({"message": "Backend is working successfully"})
@api_view(['POST'])
def save_appointment(request):
    data = request.data

    appointment = Appointment.objects.create(
        name=data.get('name'),
        phone=data.get('phone'),
        doctor=data.get('doctor'),
        date=data.get('date'),
        time=data.get('time')
    )

    try:
        import ssl
        import smtplib
        from email.mime.text import MIMEText
        from email.mime.multipart import MIMEMultipart

        sender = os.getenv("EMAIL_HOST_USER")
        receiver = os.getenv("EMAIL_HOST_USER")
        password = os.getenv("EMAIL_HOST_PASSWORD")
        
        print("DEBUG sender:", sender)

        print("DEBUG password:", password)  # check this in terminal

        msg = MIMEMultipart()
        msg['From'] = sender
        msg['To'] = receiver
        msg['Subject'] = 'New Appointment Booking'
        msg.attach(MIMEText(f"""
New appointment booked!

Name:   {appointment.name}
Phone:  {appointment.phone}
Doctor: {appointment.doctor}
Date:   {appointment.date}
Time:   {appointment.time}
        """, 'plain'))

        # Bypass SSL verification completely
        context = ssl.create_default_context()
        context.check_hostname = False
        context.verify_mode = ssl.CERT_NONE

        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as server:
            server.login(sender, password)
            server.sendmail(sender, receiver, msg.as_string())

        print("✅ Email sent!")

    except Exception as e:
        print("❌ Email Error:", e)

    return Response({"message": "Appointment saved successfully"})
@api_view(['GET'])
def get_appointments(request):
    appointments = Appointment.objects.all().values()
    return Response(appointments)

@api_view(['DELETE'])
def cancel_appointment(request, id):
    appointment = get_object_or_404(Appointment, id=id)
    appointment.delete()
    print("🔥 DELETED:", id)   # debug
    return Response({"message": "Deleted successfully"})
@api_view(['POST'])
def register_user(request):
    data = request.data

    if User.objects.filter(email=data.get('email')).exists():
        return Response({"error": "User already exists"}, status=400)

    User.objects.create(
        name=data.get('name'),
        email=data.get('email'),
        password = make_password(data.get('password'))
    )

    return Response({"message": "Registered successfully"})
from django.contrib.auth.hashers import check_password

@api_view(['POST'])
def login_user(request):
    data = request.data

    try:
        user = User.objects.get(email=data.get('email'))

        if check_password(data.get('password'), user.password):
            return Response({
                "message": "Login success",
                "user": user.email
            })
        else:
            return Response({"error": "Invalid password"}, status=400)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=400)
    
    
@api_view(['POST'])
def make_payment(request):
    data = request.data

    payment = Payment.objects.create(
        name=data.get('name'),
        email=data.get('email'),
        amount=data.get('amount'),
        method=data.get('method'),
        status="Success"
    )

    return Response({"message": "Payment successful"})

@api_view(['GET'])
def get_payments(request):
    payments = Payment.objects.all().values()
    return Response(payments)    
razorpay_client = razorpay.Client(auth=(
    os.getenv("RAZORPAY_KEY_ID"),
    os.getenv("RAZORPAY_SECRET")
))
@api_view(['POST'])
def create_order(request):
    amount = int(request.data.get('amount')) * 100

    order = razorpay_client.order.create({
        "amount": amount,
        "currency": "INR",
        "payment_capture": "1"
    })

    return Response(order)
@api_view(['GET'])
def test_razorpay(request):
    try:
        order = razorpay_client.order.create({
            "amount": 100,
            "currency": "INR",
            "payment_capture": "1"
        })
        return Response(order)
    except Exception as e:
        return Response({"error": str(e)})
@api_view(['POST'])
def verify_payment(request):
    data = request.data

    print("RECEIVED DATA:", data)  # 🔥 DEBUG

    #  DIRECT SAVE (skip verification for now)
    Payment.objects.create(
       
        name=data.get("name"),
        email=data.get("email"),
        amount=data.get("amount"),
        status="Success"
    )

    return Response({"message": "Payment Saved Successfully"})