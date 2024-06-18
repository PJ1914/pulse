# api/views2.py
from django.shortcuts import redirect
from django.http import JsonResponse
from django.conf import settings
import os
from dotenv import load_dotenv
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.views import APIView

from rest_framework import status
from .serializers import GeminiSerializer
import google.generativeai as genai
load_dotenv()


def index(request):
    return Response({'message': 'Hello, world! This is your Django app.'})

class TestView(GenericViewSet):
    def post(self,request):
        return Response({"message":"hello world"})
genai.configure(api_key="AIzaSyBOWhn1GNAaSK4gB0gOseCAhCdbhuuDtyc")

class GeminiViewSet(APIView):
    def post(self, request):
        serializer = GeminiSerializer(data=request.data)
        if serializer.is_valid():
            prompt = serializer.validated_data['message']
            try:
                model = genai.GenerativeModel("gemini-pro")
                chat = model.start_chat()
                response = chat.send_message(prompt)
                return Response({'response': response.text}, status=status.HTTP_200_OK)
            except Exception as e:
                return JsonResponse({'error': f'Error: {e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def main(request):
    # Replace with your logic for handling main route
    return JsonResponse({'message': 'Main route'})

def login(request):
    # Replace with your logic for handling login route
    return JsonResponse({'message': 'Login route'})

def logout(request):
    # Replace with your logic for handling logout route
    return JsonResponse({'message': 'Logout route'})
