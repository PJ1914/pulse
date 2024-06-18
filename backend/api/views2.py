# api/views2.py
from django.shortcuts import redirect
from django.http import JsonResponse
from django.conf import settings
import os
from dotenv import load_dotenv

load_dotenv()


def index(request):
    return JsonResponse({'message': 'Hello, world! This is your Django app.'})


def gemini(request):
    if request.method == 'POST':
        try:
            prompt = request.POST.get('message')
            model = settings.GEMINI_MODEL  # Access the model from settings or environment
            response = model.generate_content(prompt)
            return JsonResponse({'response': response.candidates[0].content.parts[0].text}, status=200)
        except Exception as e:
            return JsonResponse({'error': f'Error: {e}'}, status=400)

def main(request):
    # Replace with your logic for handling main route
    return JsonResponse({'message': 'Main route'})

def login(request):
    # Replace with your logic for handling login route
    return JsonResponse({'message': 'Login route'})

def logout(request):
    # Replace with your logic for handling logout route
    return JsonResponse({'message': 'Logout route'})
