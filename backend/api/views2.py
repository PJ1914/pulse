# api/views2.py
from django.shortcuts import redirect
from django.http import HttpResponse
from django.conf import settings
import os
from dotenv import load_dotenv
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework import status
from .serializers import GeminiSerializer
import google.generativeai as genai
load_dotenv()


def index(request):
    return HttpResponse({'message': 'Hello, world! This is your Django app.'})

test_key ='AIzaSyDGwSA4vpgACT1DzT7LBsuXryx5U3zNmGY'
class TestView(GenericViewSet):
    def post(self,request):
        return Response({"message":"hello world"})
genai.configure(api_key=test_key)


class GeminiViewSet(APIView):
    def post(self, request):
        serializer = GeminiSerializer(data=request.data)
        if serializer.is_valid():
            prompt = serializer.validated_data['message']
            chat_history = serializer.validated_data.get('chatHistory', [])
            print(chat_history)
            try:
                model = genai.GenerativeModel("gemini-pro")
                
                # Start chat with history
                chat = model.start_chat(history=chat_history)
                response = chat.send_message(prompt)

                return Response({'response': response.text}, status=status.HTTP_200_OK)
            except Exception as e:
                print(f'Error at line {e.__traceback__.tb_lineno}: {str(e)}')
                return Response({'error': f'Error: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GeminiSerializer(serializers.Serializer):
    message = serializers.CharField()
    chatHistory = serializers.ListField(child=serializers.DictField(), required=False)
    print(chatHistory)

#should try to keep track of history




def main(request):
    # Replace with your logic for handling main route
    return HttpResponse({'message': 'Main route'})

def login(request):
    # Replace with your logic for handling login route
    return HttpResponse({'message': 'Login route'})

def logout(request):
    # Replace with your logic for handling logout route
    return HttpResponse({'message': 'Logout route'})

