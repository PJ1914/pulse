# Use the official Python image from the Docker Hub
FROM python:3.12-slim

# Set the working directory
WORKDIR /app

# Install system dependencies, including CMake and build tools
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    libboost-python-dev \
    libboost-thread-dev \
    libboost-system-dev \
    libboost-filesystem-dev \
    libboost-chrono-dev \
    libboost-regex-dev \
    libboost-date-time-dev \
    libboost-serialization-dev \
    libboost-program-options-dev \
    libboost-test-dev \
    libboost-locale-dev \
    libboost-iostreams-dev \
    libopenblas-dev \
    liblapack-dev \
    libx11-dev \
    libgtk-3-dev \
    libjpeg-dev \
    zlib1g-dev \
    libpq-dev \
    && apt-get clean

# Copy only the requirements file to leverage Docker cache
COPY requirements.txt /app/

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /app/

# Expose the port that the application will run on
EXPOSE 8000

# Set environment variables for production (if needed)
ENV PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=backend.settings

# Run the Django application with Gunicorn for better performance in production
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
